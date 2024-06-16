const prisma = require('../config/db.js')


// GET GET CART ITEMS
exports.get = async function (req, res) {
    try {
        const user_id = req.user.id;
        const cart = await prisma.cart.findMany({
            where: { user_id: parseInt(user_id) },
            select: {id: true, item_type: true, url_slug: true, quantity: true, price: true, total_amount: true }
        });
        if (cart.length === 0) {
            return res.status(404).json({ success: false, message: 'Cart is Empty' });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ADD CART ITEMS
exports.add = async function (req, res) {
    try {
        const user_id = req.user.id;
        const { item_type, url_slug, quantity } = req.params;
                
        // Select table (productDetails or accessory)
        let table;
        if (item_type === "Product"){
            table = "productDetail"
        }
        else if(item_type === "Accessory"){
            table = "accessory"
        }
        else{
            return res.status(404).json({ success: false, message: 'Invalid item type' });
        }

        // Find that item
        const searchItem = await prisma[table].findFirst({
            where: { url_slug }
        })
        if (!searchItem){
            return res.status(404).json({ success: false, message: `Item doesn't exists` });
        }
        if (searchItem.quantity < 1){
            return res.status(404).json({ success: false, message: 'Few item out of stock' });  // which item out o stock show them
        }
        let total_amount = parseInt(searchItem.price) * parseInt(quantity)

        // add new item in cart
        const newCartItem = await prisma.cart.create({
            data: { user_id: parseInt(user_id), item_type, url_slug, quantity: parseInt(quantity), price : searchItem.price, total_amount}
        });
        // res.status(200).json({ success: true, message: 'Item added to Cart' });
        res.status(200).json({ success: true, newCartItem, message: 'Item added to Cart' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// REMOVE CART ITEMS
exports.remove = async function (req, res) {
    try {
        const user_id = req.user.id
        const { url_slug } = req.body;
        
        const deletedCartItem = await prisma.cart.delete({
            where: { user_id, url_slug }
        });
        
        if (deletedCartItem.count === 0) {
            return res.status(404).json({ success: false, message: 'Cart is empty' });
        }
        
        res.status(200).json({ success: true, message: 'Item removed from cart' });
        // res.status(200).json({ success: true, removedItem: deletedCartItem, message: 'Item removed from cart' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// UPDATE CART ITEMS (Added item quantity manipulation)
exports.update = async function (req, res) {
    try {
        const user_id = req.user.id;
        const { url_slug, quantity } = req.body;

        // Search for that item
        const searchItem = await prisma.cart.findFirst({
            where: { user_id: parseInt(user_id), url_slug }
        });
        if (!searchItem){
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
        if (searchItem.quantity < 1){
            return res.status(404).json({ success: false, message: 'Item out of stock' });
        }

        let updatedCartItem;
        if (parseInt(quantity) === 0) {
            await prisma.cart.delete({
                where: { id: searchItem.id }
            })
            return res.status(200).json({ success: true, message: 'Item removed from cart' });
        }
        else{
            updatedCartItem = await prisma.cart.update({
                where: { id: searchItem.id },
                data: { quantity: parseInt(quantity) }
            });
        }

        res.status(200).json({ success: true, updatedCartItem, message: 'Cart updated' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
