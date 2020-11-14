const express = require('express')
const router = express.Router();
const passport = require("passport");
const permissionsController = require('../controllers/permissionsController')

// ruta para mostrar el listado completo de los permisos que posee la app - middelware de autenticación
router.get('/',
    passport.authenticate('jwt',{session:false}),
    permissionsController.index)

module.exports = router;