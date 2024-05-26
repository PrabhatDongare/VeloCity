const prisma = require('../config/db.js')
const { v4: uuidv4 } = require('uuid');


// ADD TO ORDERS (Move all data from cart to order)
exports.checkout = async function (req, res) {
    try {
        const user_id = req.user.id;
        const order_id = uuidv4();

        // Take all cart items
        const cartItems = await prisma.cart.findMany({
            where: { user_id }
        })
        if (cartItems.length === 0) {
            return res.status(404).json({ success: false, message: 'Cart was empty' });
        }

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

            // add to order item
            await prisma.orderItem.create({
                data: { order_id, item_type: item.item_type, url_slug: item.url_slug, quantity: parseInt(item.quantity), price: parseInt(item.price) }
            })
        };

        // add to order table
        const shipping_charges = Math.floor(Math.random() * 91) + 10;
        const net_amount = total_amount + shipping_charges

        const searchAddress = await prisma.address.findFirst({
            where: { user_id }
        })

        if (!searchAddress) {
            return res.status(404).json({ success: false, message: 'Add address first' });
        }

        const order = await prisma.order.create({
            data: { order_no, user_id, total_amount, shipping_charges, net_amount, address_id: searchAddress.id }
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
        if(!order){
            return res.status(404).json({ success: false, message: 'No such order exists' });
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

// UPDATE ORDERS (AFTER PAYMENT)
exports.paid = async function (req, res) {
    try {
        const user_id = req.user.id;
        const { payment_id } = req.body
        const order = await prisma.order.update({
            where: { user_id },
            data: {payment_id , status: "Paid"}
        })
        if(!order){
            return res.status(404).json({ success: false, message: 'No such order exists' });
        }
        res.status(200).json({ success: true, order, message: 'Order found successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// UPDATE ORDER
exports.update = async function (req, res) {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// DELETE ORDER
exports.deleteItem = async function (req, res) {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}