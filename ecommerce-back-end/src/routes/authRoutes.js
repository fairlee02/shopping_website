const express = require('express');
const { signup, signin } = require('../controller/authControllers');

const router = express.Router();
const { validateSignupRequest, validateSigninRequest } = require('../validators/authValidator');
const { isRequestValidated } = require('../validators/authValidator');




router.post('/signup',validateSignupRequest, isRequestValidated, signup);


router.post('/signin', validateSigninRequest, isRequestValidated, signin); 


module.exports = router;