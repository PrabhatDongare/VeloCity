const prisma = require('../config/db.js')

// ADD PRODUCT
exports.addProduct = async function (req, res) {
    try {
        const { category, product_name } = req.body;
        const product = await prisma.product.create({
            data: { category, product_name }
        });
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
    try {
        const { id, category, product_name } = req.body;
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { category, product_name }
        });
        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --------------------------------------------------------
// ADD PRODUCT DETAILS
exports.addProductDetail = async function (req, res) {
    try {
        const { product_id, color, price, quantity, status } = req.body;
        const productDetail = await prisma.productDetail.create({
            data: { product_id, color, price, quantity, status }
        });
        res.status(200).json({ success: true, productDetail });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// DELETE PRODUCT DETAILS
exports.deleteProductDetail = async (req, res) => {
    try {
      const { id } = req.body;
      await prisma.productDetail.delete({
        where: { id: parseInt(id) }
      });
      res.status(200).json({ success: true, message: 'Product Detail deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

// UPDATE PRODUCT DETAILS
exports.updateProductDetail = async (req, res) => {
    try {
        const { id, color, price, quantity, status } = req.body;
        const productDetail = await prisma.productDetail.update({
            where: { id: parseInt(id) },
            data: { color, price, quantity, status }
        });
        res.status(200).json({ success: true, productDetail });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --------------------------------------------------------
// ADD ACCESSORY
exports.addAccessory = async function (req, res) {
    try {
        const { section, accessory_name, price, quantity, description, url_slug, status } = req.body;
        const accessory = await prisma.accessory.create({
            data: { section, accessory_name, price, quantity, description, url_slug, status }
        });
        res.status(200).json({ success: true, accessory });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// DELETE ACCESSORY
exports.deleteAccessory = async (req, res) => {
    try {
      const { id } = req.body;
      await prisma.accessory.delete({
        where: { id: parseInt(id) }
      });
      res.status(200).json({ success: true, message: 'Accessory deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

// UPDATE ACCESSORY
exports.updateAccessory = async (req, res) => {
    try {
        const { id, section, accessory_name, price, quantity, description, url_slug, status } = req.body;
        const accessory = await prisma.accessory.update({
            where: { id: parseInt(id) },
            data: { section, accessory_name, price, quantity, description, url_slug, status }
        });
        res.status(200).json({ success: true, accessory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --------------------------------------------------------
// LINK PRODUCT to ACCESSORY
exports.linkProductAccessory = async (req, res) => {
    try {
        const { productId, accessoryId } = req.body;
        const productAccessory = await prisma.productAccessory.create({
            data: { productId, accessoryId }
        });
        res.status(200).json({ success: true, productAccessory });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// UNLINK PRODUCT to ACCESSORY
exports.unlinkProductAccessory = async (req, res) => {
    try {
        const { productId, accessoryId } = req.body;
        await prisma.productAccessory.deleteMany({
            where: { productId: parseInt(productId), accessoryId: parseInt(accessoryId) }
        });
        res.status(200).json({ success: true, message: 'Product-Accessory link removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};