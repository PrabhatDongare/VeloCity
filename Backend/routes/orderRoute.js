const express = require('express');
const router = express.Router();

const { checkout, get, update, deleteItem } = require('../controller/orderController')
const fetchuser = require('../middleware/fetchuser')

router.post("/checkout", fetchuser, checkout);  
router.post("/get", fetchuser, get); 
router.put("/update", fetchuser, update); 
router.delete("/delete", fetchuser, deleteItem); 
router.put("/paid", fetchuser, paid); 

module.exports = router

