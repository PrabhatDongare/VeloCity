const User = require('../models/UserModel');
const { validationResult } = require('express-validator');
// const otpGenerator = require('otp-generator')
// const { transporter } = require('../utils/emailService.js')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// SIGN UP 
exports.userSignUp = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { name, email, password } = req.body
        // Check Email for Login
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success, message: "Email already exists" });
        }
        // Generate Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: hashPassword })

        // Auth Token given
        const data = { "user": { id: user.id } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true
        return res.status(200).json({ success, authToken })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}

// LOGIN
exports.userLogin = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { email, password } = req.body;
        // Check Email for Login
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success, message: "Email does not exists !!!" });
        }

        // Check Password for Login
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.status(400).json({ success, message: "Incorrect Password !!!" });
        }

        // Auth Token given
        const data = { "user": { id: user.id } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        return res.status(200).json({ success, authToken })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}

// GET USER
exports.getUser = async function (req, res) {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } 
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}