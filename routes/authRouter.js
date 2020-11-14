const express = require('express')
const router = express.Router();
const passport = require("passport");
const registerController = require('../controllers/authController')
const validationRegister = require('../validation/auth/registerUserValidation')
const validationLogin = require('../validation/auth/loginValidation')
const validationRecoverPassword =require('../validation/auth/recoverPassword')

//ruta para registro - middleware de validacion de datos y autentifación
router.post('/register',
    validationRegister,
    passport.authenticate('signup',{session:false}),
    registerController.register);

//ruta para logueo - middleware de validacion de datos
router.post('/login',
    validationLogin,
    registerController.login);

//ruta para recuperar contraseña - middleware de validacion de datos
router.post('/recover',
    validationRecoverPassword,
    registerController.recover);

//ruta para verficiar token de cambio de contraseña y asignar nueva contraseña - middleware de validacion de datos
router.post('/reset/:token',
    registerController.reset);

module.exports = router;