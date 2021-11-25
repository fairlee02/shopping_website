const express = require('express');
const router = express.Router();
const {requireSignin, userMiddleware} = require('../middlewares/indexMiddleware');
const {addItemToCart} = require ('../controller/cartControllers');

router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);

module.exports = router;