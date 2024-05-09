const express = require('express');
const router = express.Router();

const { userSignUp, userLogin, getUser } = require('../Controller/UserController')
const { createValidator, loginValidator } = require('../utils/validation')
const fetchuser = require('../middleware/fetchuser')


router.post("/signup", createValidator, userSignUp);
router.post("/login", loginValidator, userLogin);
router.post("/getUser", fetchuser, getUser); 


module.exports = router