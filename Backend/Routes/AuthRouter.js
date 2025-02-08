
const router = require('express').Router();

const { signup, login } = require('../Controllers/AuthController');
const { SignupValidation, loginValidation } = require('../Middlewares/AuthValidation');



router.post('/login' , loginValidation , login);
router.post('/signup' , SignupValidation , signup);

module.exports = router;