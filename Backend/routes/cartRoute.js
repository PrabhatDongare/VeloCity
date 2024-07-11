const express = require('express');
const router = express.Router();

const { get, add, remove, update  } = require('../controller/cartController')
const fetchuser = require('../middleware/fetchuser')

router.post("/get", fetchuser, get);
router.post("/add/:item_type/:url_slug/:quantity", fetchuser, add);
router.delete("/remove/:url_slug", fetchuser, remove);
router.put("/update", fetchuser, update);

module.exports = router

