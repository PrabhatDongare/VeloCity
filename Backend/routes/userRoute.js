const express = require('express');
const router = express.Router();

const { userSignUp, userLogin, forgotPassword, resetPassword, getUser, adminSignUp, addAddress, updateAddress, getAddress } = require('../controller/userController')
const { createValidator, loginValidator, emailValidator, passwordValidator } = require('../utils/validation')
const fetchuser = require('../middleware/fetchuser')


router.post("/signup", createValidator, userSignUp);                              
router.post("/login", loginValidator, userLogin);
router.post("/forgot-password", emailValidator, forgotPassword); 
router.post("/reset-password", passwordValidator, resetPassword); 

router.post("/adminSignUp", createValidator, adminSignUp);

router.post("/getUser", fetchuser, getUser); 

router.post("/addAddress", fetchuser, addAddress);  
router.put("/updateAddress", fetchuser, updateAddress); 
router.post("/getAddress", fetchuser, getAddress); 

module.exports = router

