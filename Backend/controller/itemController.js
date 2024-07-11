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

// --------------------------------------------------------------------------------
// GET PRODUCT DETAILS
exports.getProductDetail = async (req, res) => {
    try {
        const { product_id } = req.body;
        const productDetail = await prisma.productDetail.findMany({
            where: { product_id: parseInt(product_id) }
        });
        res.status(200).json({ success: true, productDetail });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ADD PRODUCT DETAILS
exports.addProductDetail = async function (req, res) {
    try {
        const { product_id, url_slug, color, price, quantity, status } = req.body;
        const productDetail = await prisma.productDetail.create({
            data: { product_id, url_slug, color, price, quantity, status }
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
        const { id, product_id, url_slug, color, price, quantity, status } = req.body;
        const productDetail = await prisma.productDetail.update({
            where: { id: parseInt(id) },
            data: { product_id, url_slug, color, price, quantity, status }
        });
        res.status(200).json({ success: true, productDetail });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// --------------------------------------------------------
// GET ACCESSORY
exports.getAccessory = async (req, res) => {
    try {
        const accessory = await prisma.accessory.findMany();
        res.status(200).json({ success: true, accessory });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ADD ACCESSORY
exports.addAccessory = async function (req, res) {
    try {
        const { section, accessory_name, url_slug, price, quantity, description, status } = req.body;
        const accessory = await prisma.accessory.create({
            data: { section, accessory_name, url_slug, price, quantity, description, status }
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
        const { id, section, accessory_name, url_slug, price, quantity, description, status } = req.body;
        const accessory = await prisma.accessory.update({
            where: { id: parseInt(id) },
            data: { section, accessory_name, url_slug, price, quantity, description, status }
        });
        res.status(200).json({ success: true, accessory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
