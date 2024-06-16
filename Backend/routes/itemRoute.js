const express = require('express');
const router = express.Router();

const { addProduct, deleteProduct, updateProduct } = require('../controller/itemController')
const { addProductDetail, deleteProductDetail, updateProductDetail } = require('../controller/itemController')
const { addAccessory, deleteAccessory, updateAccessory } = require('../controller/itemController')
// const { linkProductAccessory, unlinkProductAccessory } = require('../controller/itemController')

const fetchuser = require('../middleware/fetchuser')
const isAdmin = require('../middleware/isAdmin');

router.post("/addProduct", fetchuser, isAdmin, addProduct); 
router.delete("/deleteProduct", fetchuser, isAdmin, deleteProduct); 
router.put("/updateProduct", fetchuser, isAdmin, updateProduct);

router.post("/addProductDetail", fetchuser, isAdmin, addProductDetail); 
router.delete("/deleteProductDetail", fetchuser, isAdmin, deleteProductDetail); 
router.put("/updateProductDetail", fetchuser, isAdmin, updateProductDetail); 

router.post("/addAccessory", fetchuser, isAdmin, addAccessory); 
router.delete("/deleteAccessory", fetchuser, isAdmin, deleteAccessory); 
router.put("/updateAccessory", fetchuser, isAdmin, updateAccessory); 

// router.post("/linkProductAccessory", fetchuser, isAdmin, linkProductAccessory); 
// router.post("/unlinkProductAccessory", fetchuser, isAdmin, unlinkProductAccessory); 

module.exports = router

