const prisma = require('../config/db.js')
const { validationResult } = require('express-validator');
const { transporter } = require('../utils/emailService.js')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


// SIGN UP (For CUSTOMER)
exports.userSignUp = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { first_name, last_name, email, password } = req.body

        // Check for valid email
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            return res.status(400).json({ success, message: "Email already exists" });
        }

        // Generate Hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user (CUSTOMER)
        user = await prisma.user.create({
            data: { role: "Customer", first_name, last_name, email, password: hashPassword, status: "inactive" }
        })

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

// SIGN UP (For ADMIN)
exports.adminSignUp = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { first_name, last_name, email, password } = req.body

        // Check for valid email
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (user) {
            return res.status(400).json({ success, message: "Email already exists" });
        }

        // Generate Hashed Password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user (ADMIN)
        user = await prisma.user.create({
            data: { role: "Admin", first_name, last_name, email, password: hashPassword, status: "inactive" }
        })

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
        // Check for valid email
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ success, message: "Email does not exists !!!" });
        }

        // Check for valid Password
        const checkPass = await bcrypt.compare(password, user.password)
        if (!checkPass) {
            return res.status(400).json({ success, message: "Incorrect Password !!!" });
        }

        // Auth Token given
        const data = { "user": { id: user.id, role: user.role } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.status(200).json({ success, authToken })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}

// FORGOT PASSWORD
exports.forgotPassword = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false;
    try {
        const { email } = req.body;
        // Check for valid email
        let user = await prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(400).json({ success, message: "Email does not exists !!!" });
        }

        // Auth Token given
        const data = { "user": { id: user.id } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "5m" });
        let link = `http://localhost:5173/account/reset-password/${user.id}/${authToken}`

        // Send reset link through email
        await transporter.sendMail({
            from: {
                name: "VeloCity",
                address: process.env.EMAIL_USERNAME
            },
            to: email,
            subject: "Customer account password reset",
            html:
                `<h5>Click here to reset password <a href=${link}></a>CLICK</h5>`,
        });

        success = true;
        console.log("id : ", user.id, " , ", "token : ", authToken)
        res.status(200).json({ success, message: "Email Notification Sent..." })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ success, message: "Internal Server Error" });
    }
}

// RESET PASSWORD
exports.resetPassword = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    let success = false;
    try {
        const { id, token } = req.params;
        const { password } = req.body;

        // Verify the token
        let data;
        try {
            data = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ success, message: "Invalid Token" });
        }

        // Generate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Update the user's password
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { password: hashPassword }
        });

        success = true;
        return res.status(200).json({ success, message: "Password reset successful" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success, message: "Internal Server Error" });
    }
}

// GET USER DETAILS
exports.getUser = async function (req, res) {
    try {
        userId = req.user.id;
        // Search for mentioned user
        const userData = await prisma.user.findUnique({
            where: { id: userId },
            // Excluded password
            select: { id: true, first_name: true, last_name: true, email: true, status: true, role: true, updated_at: true }
        });
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ userData, message: "User Data Showed" });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// ADD ADDRESS
exports.addAddress = async function (req, res) {
    try {
        const user_id = req.user.id
        const { street_name, additional, zipcode, city, country } = req.body;
        // Check if Address already exists
        const checkAddress = await prisma.address.findFirst({
            where: { user_id: parseInt(user_id) }
        })
        if (checkAddress) {
            return res.status(400).json({ success: false, message: 'Address already present, you can update it' });
        }

        // Adding new address
        const address = await prisma.address.create({
            data: { user_id: parseInt(user_id), street_name, additional, zipcode, city, country }
        });
        res.status(200).json({ success: true, address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// UPDATE ADDRESS 
exports.updateAddress = async function (req, res) {
    try {
        const user_id = req.user.id
        const { street_name, additional, zipcode, city, country } = req.body;
        // Find the address associated with the user
        const address = await prisma.address.findFirst({
            where: { user_id: parseInt(user_id) }
        });
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found for this user' });
        }

        // Updating address
        const updatedAddress = await prisma.address.update({
            where: { id: address.id },
            data: { street_name, additional, zipcode, city, country }
        });
        res.status(200).json({ success: true, address: updatedAddress, message: "Address updated successfully" });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// GET ADDRESS
exports.getAddress = async function (req, res) {
    try {
        const user_id = req.user.id
        const address = await prisma.address.findMany({
            where: { user_id: parseInt(user_id) },
        });
        if (!address) {
            return res.status(404).json({ success: false, message: 'Address not found' });
        }
        console.log(address)
        res.status(200).json({ success: true, address });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

