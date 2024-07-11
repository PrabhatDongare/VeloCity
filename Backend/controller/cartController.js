const prisma = require('../config/db.js')


// GET GET CART ITEMS
exports.get = async function (req, res) {
    try {
        const user_id = req.user.id;
        const cart = await prisma.cart.findMany({
            where: { user_id: parseInt(user_id) },
            select: {id: true, item_type: true, url_slug: true, quantity: true, price: true, total_amount: true }
        });
        
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
        if (searchItem.quantity < quantity){
            return res.status(404).json({ success: false, message: 'Out of stock' });  // which item out of stock show them
        }

        // check if already exists
        const checkCartItem = await prisma.cart.findFirst({
            where: { url_slug }
        })
        let total_amount;

        if(checkCartItem){
            total_amount = parseInt(searchItem.price) * (parseInt(quantity) + checkCartItem.quantity )
            // update item in cart
            const updatedcartItem = await prisma.cart.update({
                where: { id: checkCartItem.id },
                data: { quantity: (parseInt(quantity) + checkCartItem.quantity ), price : searchItem.price, total_amount}
            });
            res.status(200).json({ success: true, updatedcartItem, message: 'Item added to Cart' });
        }
        else{
            total_amount = parseInt(searchItem.price) * parseInt(quantity)
            // add new item in cart
            const updatedcartItem = await prisma.cart.create({
                data: { user_id: parseInt(user_id), item_type, url_slug, quantity: parseInt(quantity), price : searchItem.price, total_amount}
            });
            res.status(200).json({ success: true, updatedcartItem, message: 'Item added to Cart' });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// REMOVE CART ITEMS
exports.remove = async function (req, res) {
    try {
        const user_id = req.user.id
        const url_slug = req.params.url_slug;
        
        const itemFindToDelete = await prisma.cart.findFirst({
            where: { user_id, url_slug }
        });
        if(!itemFindToDelete){
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        const deletedCartItem = await prisma.cart.delete({
            where: { id: itemFindToDelete.id }
        });
        
        if (deletedCartItem.count === 0) {
            return res.status(404).json({ success: false, message: 'Cart is empty' });
        }
        
        res.status(200).json({ success: true, url_slug, message: 'Item removed from cart' });
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
        const { item_type, url_slug, inc } = req.body;

        // Search for that item
        const searchItem = await prisma.cart.findFirst({
            where: { user_id: parseInt(user_id), url_slug }
        });
        if (!searchItem){
            return res.status(404).json({ success: false, message: 'Item not in cart' });
        }

        const newQuantity = inc ? searchItem.quantity + 1 : searchItem.quantity - 1;
        const newTotalAmount = inc ? searchItem.total_amount + searchItem.price : searchItem.total_amount - searchItem.price;

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
        const checkItem = await prisma[table].findFirst({
            where: { url_slug }
        })
        if (!checkItem){
            return res.status(404).json({ success: false, message: `Item doesn't exists` });
        }
        if (checkItem.quantity < newQuantity){
            return res.status(404).json({ success: false, message: 'Out of stock' }); 
        }
        
        // update values
        await prisma.cart.update({
            where: { id: searchItem.id },
            data: { quantity: newQuantity, total_amount: newTotalAmount }
        })

        res.status(200).json({ success: true, newTotalAmount, url_slug, inc});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
