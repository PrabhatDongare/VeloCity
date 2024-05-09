const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');


router.use('/api/auth', userRoute);


module.exports = router;