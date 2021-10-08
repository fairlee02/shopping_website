const express = require('express');
const { signup, signin } = require('../controller/auth');

const router = express.Router();
const { validateSignupRequest, validateSigninRequest } = require('../validators/auth');
const { isRequestValidated } = require('../validators/auth');




router.post('/signup',validateSignupRequest, isRequestValidated, signup);


router.post('/signin', validateSigninRequest, isRequestValidated, signin); 


module.exports = router;