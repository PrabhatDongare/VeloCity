const express = require('express');
const router = express.Router();

const { userSignUp, userLogin, forgotPassword, resetPassword, getUser, adminSignUp } = require('../controller/userController')
const { createValidator, loginValidator, emailValidator, passwordValidator } = require('../utils/validation')
const fetchuser = require('../middleware/fetchuser')


router.post("/signup", createValidator, userSignUp);
router.post("/login", loginValidator, userLogin);
router.post("/forgotPassword", emailValidator, forgotPassword); 
router.post("/resetPassword/:id/:token", passwordValidator, resetPassword); 
router.post("/getUser", fetchuser, getUser); 

router.post("/adminSignUp", createValidator, adminSignUp);


module.exports = router

