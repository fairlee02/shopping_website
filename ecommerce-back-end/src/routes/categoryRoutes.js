
const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../controller/categoryControllers');
const { requireSignin, adminMiddleware } = require('../middlewares/indexMiddleware');

router.post('/category/create', requireSignin, adminMiddleware, addCategory);
router.get('/category/getcategory', getCategories);

module.exports =router;