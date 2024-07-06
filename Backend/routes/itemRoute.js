const express = require('express');
const router = express.Router();

const { addProduct, deleteProduct, updateProduct } = require('../controller/itemController')
const { getProductDetail, addProductDetail, deleteProductDetail, updateProductDetail } = require('../controller/itemController')
const { getAccessory, addAccessory, deleteAccessory, updateAccessory } = require('../controller/itemController')

const fetchuser = require('../middleware/fetchuser')
const isAdmin = require('../middleware/isAdmin');

router.post("/addProduct", fetchuser, isAdmin, addProduct); 
router.delete("/deleteProduct", fetchuser, isAdmin, deleteProduct); 
router.put("/updateProduct", fetchuser, isAdmin, updateProduct);

router.post("/getProductDetail", getProductDetail);
router.post("/addProductDetail", fetchuser, isAdmin, addProductDetail); 
router.delete("/deleteProductDetail", fetchuser, isAdmin, deleteProductDetail); 
router.put("/updateProductDetail", fetchuser, isAdmin, updateProductDetail); 

router.post("/getAccessory", getAccessory);
router.post("/addAccessory", fetchuser, isAdmin, addAccessory); 
router.delete("/deleteAccessory", fetchuser, isAdmin, deleteAccessory); 
router.put("/updateAccessory", fetchuser, isAdmin, updateAccessory); 


module.exports = router
