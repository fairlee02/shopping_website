const express = require('express');
const { signup, signin } = require('../../controller/admin/authAdminControllers');
const { validateSignupRequest, isRequestValidated, validateSigninRequest } = require('../../validators/authValidator');
const router = express.Router();



router.post('/admin/signup',validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin',validateSigninRequest, isRequestValidated, signin); 


module.exports =router;