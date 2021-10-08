
const express = require('express');
const router = express.Router();
const { addCategory, getCategories } = require('../../controller/admin/category');

router.post('/category/create', addCategory);
router.get('/category/getcategory', getCategories);

module.exports =router;