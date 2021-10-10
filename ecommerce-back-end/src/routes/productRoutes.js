const express = require('express');
const { createProducts } = require('../controller/productControllers');
const router = express.Router();
// const { } = require('../../controller/admin/category');
const { requireSignin, adminMiddleware } = require('../middlewares/indexMiddleware');
const multer = require('multer');
const shortid = require('shortid'); //this will generate a random id
const path = require('path')


//storage for uploaded pictures (multer npm documentation)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads')) //path will generate a relative path
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

  const upload = multer({storage});

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProducts );


// router.get('/product/getcategory', getCategories);

module.exports =router;