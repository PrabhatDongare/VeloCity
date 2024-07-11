const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const itemRoute = require('./itemRoute');
const cartRoute = require('./cartRoute');
const orderRoute = require('./orderRoute');

router.use('/api/auth', userRoute);
router.use('/api/item', itemRoute);
router.use('/api/cart', cartRoute);
router.use('/api/order', orderRoute);

module.exports = router;



// cart & order api not checked