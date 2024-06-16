const prisma = require('../config/db.js')
const { v4: uuidv4 } = require('uuid');


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
            return res.status(404).json({ success: false, message: 'Cart was empty' });
        }

        // Entry made for order
        const searchAddress = await prisma.address.findFirst({
            where: { user_id }
        })

        if (!searchAddress) {
            return res.status(404).json({ success: false, message: 'Add address first' });
        }

        let order = await prisma.order.create({
            data: { order_no, user_id, total_amount: 0, shipping_charges: 0, net_amount: 0, address_id: searchAddress.id }
        })

        // Adding to order item table
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
                return res.status(404).json({ success: false, message: 'Few item out of stock' });  // which item out o stock show them
            }

            total_amount += parseInt(item.price) * parseInt(item.quantity)

            await prisma.orderItem.create({
                data: { order_id: parseInt(order.id), item_type: item.item_type, url_slug: item.url_slug, quantity: parseInt(item.quantity), price: parseInt(item.price) }
            })
        };

        // add to order table
        const shipping_charges = Math.floor(Math.random() * 91) + 10;
        console.log(shipping_charges)
        const net_amount = total_amount + shipping_charges

        await prisma.order.update({
            where: { id: order.id },
            data: { total_amount, shipping_charges, net_amount, status: "unpaid" }
        })

        // Clear the user's cart
        await prisma.cart.deleteMany({
            where: { user_id }
        });

        // orderItem = prisma.orderItem
        // res.status(200).json({ success: true, order, orderItem, message: 'Checkout successful' });
        res.status(200).json({ success: true, order, message: 'Checkout successful' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// GET ORDERS (BEFORE PAYMENT)
exports.get = async function (req, res) {
    try {
        const user_id = req.user.id;

        // Find order
        const order = await prisma.order.findFirst({
            where: { user_id }
        })
        if (!order) {
            return res.status(404).json({ success: false, message: 'No order exists' });
        }

        // Find order items
        const orderItems = await prisma.orderItem.findMany({
            where: { order_id: order.id }
        })
        res.status(200).json({ success: true, order, orderItems, message: 'Order found successfully' });

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

// UPDATE ORDERS (AFTER PAYMENT), reduce quantity from stock
exports.paid = async function (req, res) {
    try {
        const { payment_id, order_id } = req.body

        // Check if the order exists
        const order = await prisma.order.findFirst({
            where: { id: order_id }
        });

        if (!order) {
            return res.status(404).json({ success: false, message: 'No such order exists' });
        }

        // Get the order items for the order
        const orderItems = await prisma.orderItem.findMany({
            where: { order_id }
        })
        if (orderItems.length < 1) {
            return res.status(404).json({ success: false, message: 'No such order exists' });
        }

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
                return res.status(404).json({ success: false, message: 'Stock out, try when stock is available' });
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

        // Update the order to mark it as paid
        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(order_id) },
            data: { payment_id, status: "paid" }
        });

        res.status(200).json({ success: true, order, message: 'Order filled successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// DELETE ORDER
exports.remove = async function (req, res) {
    try {
        const { order_id } = req.body;

        // Check for order
        const order = await prisma.order.findFirst({
            where: { id: order_id }
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
        res.status(200).json({ success: true, message: 'Order deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

