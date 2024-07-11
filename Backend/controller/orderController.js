const prisma = require('../config/db.js')
const { v4: uuidv4 } = require('uuid');
const paypal = require('paypal-rest-sdk');

const dotenv = require('dotenv');
dotenv.config();

paypal.configure({
    'mode': 'sandbox',
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});


// ADD TO ORDERS (Move all data from cart to order)
exports.checkout = async function (req, res) {
    try {
        const user_id = req.user.id;
        const order_no = uuidv4();

        // Take all cart items
        const cartItems = await prisma.cart.findMany({
            where: { user_id }
        })
        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart was empty' });
        }

        // Entry made for order
        const searchAddress = await prisma.address.findFirst({
            where: { user_id }
        })

        if (!searchAddress) {
            return res.status(400).json({ success: false, message: 'Add address to checkout' });
        }


        let order = await prisma.order.create({
            data: { order_no, user_id, total_amount: 0, shipping_charges: 0, net_amount: 0, address_id: searchAddress.id }
        })

        // Adding in order item table
        let total_amount = 0;
        for (const item of cartItems) {
            let table;
            if (item.item_type === "Product") {
                table = "productDetail"
            }
            else {
                table = "accessory"
            }
            const searchItem = await prisma[table].findFirst({
                where: { url_slug: item.url_slug }
            })
            if (!searchItem) {
                return res.status(404).json({ success: false, message: `Item doesn't exists` });
            }
            if (searchItem.quantity < 1) {
                return res.status(404).json({ success: false, message: 'Few item out of stock' });  // which item out fo stock show them
            }

            total_amount += parseInt(item.price) * parseInt(item.quantity)

            await prisma.orderItem.create({
                data: { order_id: parseInt(order.id), item_type: item.item_type, url_slug: item.url_slug, quantity: parseInt(item.quantity), price: parseInt(item.price) }
            })
        };
        // add to order table
        const shipping_charges = Math.floor(Math.random() * 91) + 10;
        const net_amount = total_amount + shipping_charges

        await prisma.order.update({
            where: { id: order.id },
            data: { total_amount, shipping_charges, net_amount, status: "unpaid" }
        })

        // Clear the user's cart
        await prisma.cart.deleteMany({
            where: { user_id }
        });

        // For returning items of order item table
        const orderItem = await prisma.orderItem.findMany({
            where: { order_id: order.id }
        })
        return res.status(200).json({ success: true, order, orderItem, message: 'Items moved Order section from Cart' });

    } catch (error) {
        console.error(error, "------------------------", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// GET ORDERS (BEFORE PAYMENT)
exports.get = async function (req, res) {
    try {
        const user_id = req.user.id;
        const currentDate = new Date();
        const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

        // Find order
        const order = await prisma.order.findMany({
            where: { user_id: user_id, OR: [{ updated_at: { gte: sevenDaysAgo } }, { status: 'unpaid' }] },
            orderBy: { updated_at: 'desc' }
        });
        if (order.length < 1) {
            return res.status(404).json({ success: false, message: 'No order exists' });
        }

        // Find order items
        // const orderItems = await prisma.orderItem.findMany({
        //     where: { order_id: order.id }
        // })
        // res.status(200).json({ success: true, order, orderItems, message: 'Order found successfully' });
        res.status(200).json({ success: true, order, message: 'Order found successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// UPDATE ORDER
exports.update = async function (req, res) {
    try {
        const user_id = req.user.id;
        const { item_type, url_slug, quantityInc } = req.body;

        // Check for Un-paid order
        const customerOrder = await prisma.order.findFirst({
            where: { user_id, status: "unpaid" }
        });

        if (!customerOrder) {
            return res.status(404).json({ success: false, message: `No unpaid order found` });
        }

        // Check if orderItem exists
        const customerOrderItem = await prisma.orderItem.findFirst({
            where: { order_id: customerOrder.id, url_slug }
        });

        if (!customerOrderItem) {
            return res.status(404).json({ success: false, message: "No such order item exists" });
        }

        // Determine the table
        let table;
        if (item_type === "Product") {
            table = "productDetail";
        } else {
            table = "accessory";
        }

        const searchItem = await prisma[table].findFirst({
            where: { url_slug }
        });

        if (!searchItem) {
            return res.status(404).json({ success: false, message: "Item doesn't exist" });
        }

        let new_total_amount = customerOrder.total_amount;
        let updated_quantity = customerOrderItem.quantity;

        if (quantityInc) {
            // Check for stock and increase quantity
            if (customerOrderItem.quantity + 1 > searchItem.quantity) {
                return res.status(404).json({ success: false, message: "Out of Stock" });
            }
            updated_quantity += 1;
            new_total_amount += searchItem.price;
        } else {
            // Decrease quantity
            if (customerOrderItem.quantity > 1) {
                updated_quantity -= 1;
                new_total_amount -= searchItem.price;
            } else {
                return res.status(400).json({ success: false, message: "Cannot decrease quantity below 1" });
            }
        }

        // Update OrderItem
        const updatedOrderItem = await prisma.orderItem.update({
            where: { id: customerOrderItem.id },
            data: { quantity: updated_quantity }
        });

        // Update Order
        const new_net_amount = customerOrder.shipping_charges + new_total_amount;
        const updatedOrder = await prisma.order.update({
            where: { id: customerOrder.id },
            data: { total_amount: new_total_amount, net_amount: new_net_amount }
        });

        // res.status(200).json({ success: true, updatedOrder, updatedOrderItem, message: 'Order updated' });
        res.status(200).json({ success: true, message: 'Order updated' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// DELETE ORDER
exports.remove = async function (req, res) {
    try {
        const user_id = req.user.id;
        const order_id = parseInt(req.params.order_id);

        // Check for order
        const order = await prisma.order.findFirst({
            where: { user_id, id: order_id }
        });
        if (!order) {
            return res.status(404).json({ success: false, message: 'No such order exists' });
        }
        if (order.status === "paid") {
            return res.status(404).json({ success: false, message: `Can't delete paid order` });
        }

        // Delete order items
        await prisma.orderItem.deleteMany({
            where: { order_id }
        });

        // Delete the order
        await prisma.order.delete({
            where: { id: order_id }
        });
        res.status(200).json({ success: true, order_id, message: 'Order deleted successfully' });

    } catch (error) {
        console.error(error, "------------------------------------", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// Paypal Payment
exports.payment = async function (req, res) {
    let data
    try {
        const user_id = req.user.id;
        const { order_id } = req.body;

        // Check for order
        const order = await prisma.order.findFirst({
            where: { user_id, id: order_id }
        });
        if (!order) {
            return res.status(404).json({ success: false, message: 'No such order exists' });
        }
        if (order.status === "paid") {
            return res.status(404).json({ success: false, message: `Already paid` });
        }

        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/api/order/success",
                "cancel_url": "http://localhost:3000/api/order/failed"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": `Item Purchase ${order.order_no}`,
                        "sku": "item",
                        "price": order.net_amount,
                        "currency": "EUR",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "EUR",
                    "total": order.net_amount
                },
                "description": "Payment for purchase order from VeloCity"
            }]
        };

        await paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                console.log(error, error.message)
            } else {
                data = payment;

                // save payer id
                const addPaymentId = async () => {
                    await prisma.order.update({
                        where: { user_id, id: order_id },
                        data: { payment_id: data.id, status: "processing" }
                    });
                }
                addPaymentId()
                res.status(200).json({ success: true, data });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// PAYPAL PAYMENT SUCCESS, reduce quantity from stock
exports.success = async function (req, res) {
    try {

        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        // check payer id
        const order = await prisma.order.findFirst({
            where: { payment_id: paymentId }
        })
        if (!order.payment_id) {
            return res.redirect("http://localhost:5173/account/payment/failed");
        }

        // update payment status & reduce quantity
        const updatedPaymentId = async () => {
            // Get the order items for the order
            const orderItems = await prisma.orderItem.findMany({
                where: { order_id: order.id }
            })
            
            // Check finally stock in inventory before payment
            for (const item of orderItems) {
                let table;
                if (item.item_type === "Product") {
                    table = "productDetail"
                }
                else {
                    table = "accessory"
                }
                
                const inventoryItem = await prisma[table].findFirst({
                    where: { url_slug: item.url_slug },
                })
                if (inventoryItem.quantity < item.quantity) {
                    return res.redirect("http://localhost:5173/account/payment/failed");
                }
            }

            // Update the inventory for each order item
            for (const item of orderItems) {
                let table;
                if (item.item_type === "Product") {
                    table = "productDetail"
                }
                else {
                    table = "accessory"
                }

                await prisma[table].update({
                    where: { url_slug: item.url_slug },
                    data: { quantity: { decrement: item.quantity } }
                })
            }

            // update order status
            await prisma.order.update({
                where: { id: order.id },
                data: { payment_id: paymentId.replace("PAYID-", ""), status: "paid" }
            });
        }

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": order.net_amount
                }
            }]
        }

        await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error)
                return res.redirect("http://localhost:5173/account/payment/failed");
            } else {
                console.log("Execute Payment Response");
                const response = JSON.stringify(payment);
                const parsedResponse = JSON.parse(response);
                const transactions = parsedResponse.transactions[0];
                console.log("transactions", transactions);
                updatedPaymentId()
                return res.redirect("http://localhost:5173/account/payment/success");
            }
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// UPDATE ORDERS (AFTER PAYMENT), reduce quantity from stock
// exports.paid = async function (req, res) {
//     try {
//         const { payment_id, order_id } = req.body

//         // Check if the order exists
//         const order = await prisma.order.findFirst({
//             where: { id: order_id }
//         });

//         if (!order) {
//             return res.status(404).json({ success: false, message: 'No such order exists' });
//         }

//         // Get the order items for the order
//         const orderItems = await prisma.orderItem.findMany({
//             where: { order_id }
//         })
//         if (orderItems.length < 1) {
//             return res.status(404).json({ success: false, message: 'No such order exists' });
//         }

//         // Check finally stock in inventory before payment
//         for (const item of orderItems) {
//             let table;
//             if (item.item_type === "Product") {
//                 table = "productDetail"
//             }
//             else {
//                 table = "accessory"
//             }

//             const inventoryItem = await prisma[table].findFirst({
//                 where: { url_slug: item.url_slug },
//             })
//             if (inventoryItem.quantity < item.quantity) {
//                 return res.status(404).json({ success: false, message: 'Stock out, try when stock is available' });
//             }
//         }

//         // Update the inventory for each order item
//         for (const item of orderItems) {
//             let table;
//             if (item.item_type === "Product") {
//                 table = "productDetail"
//             }
//             else {
//                 table = "accessory"
//             }

//             await prisma[table].update({
//                 where: { url_slug: item.url_slug },
//                 data: { quantity: { decrement: item.quantity } }
//             })
//         }

//         // Update the order to mark it as paid
//         const updatedOrder = await prisma.order.update({
//             where: { id: parseInt(order_id) },
//             data: { payment_id, status: "paid" }
//         });

//         res.status(200).json({ success: true, order, message: 'Order filled successfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// }

// PAYPAL PAYMENT FAILED (if user cancels payment)
exports.failed = async function (req, res) {
    try {
        return res.redirect("http://localhost:5173/account/payment/failed");

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

