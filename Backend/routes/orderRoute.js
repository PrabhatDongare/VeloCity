const express = require('express');
const router = express.Router();

const { checkout, get, update, remove, paid, payment, success, failed } = require('../controller/orderController')
const fetchuser = require('../middleware/fetchuser')

router.post("/checkout", fetchuser, checkout);  
router.post("/get", fetchuser, get); 
router.put("/update", fetchuser, update); 
router.delete("/remove/:order_id", fetchuser, remove); 
// router.put("/paid", fetchuser, paid); 

router.post("/payment", fetchuser, payment); 
router.get("/success", success); 
router.get("/failed", failed); 

module.exports = router

