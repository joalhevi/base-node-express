const express = require('express')
const router = express.Router();
const passport = require("passport");
const usersController = require('../controllers/usersController.js')
const validationStore =require('../validation/users/storeValidation')
const validationUpdate =require('../validation/users/updateValidation')
const {permit} =require('../middlewares/permissionMiddleware')

// ruta para listar los usuarios registrados - middleware de autenticación  - middleware de permiso
router.get('/',
    passport.authenticate('jwt',{session:false}),
    permit("index-users"),
    usersController.index);

// ruta para almacenar un nuevo usuario  - middleware de autenticación  - middleware de permiso - validación de datos
router.post('/',
    passport.authenticate('jwt',{session:false}),
    permit("create-users"),
    validationStore,
    usersController.store);

// ruta para mostrar un usaurio en base a su id - middleware de autenticación  - middleware de permiso
router.get('/:id',
    passport.authenticate('jwt',{session:false}),
    permit("show-users"),
    usersController.show);

//ruta para actualizar un usuario en base a su id - middleware de autenticación  - middleware de permiso - validacion de datos
router.put('/:id',
    passport.authenticate('jwt',{session:false}),
    permit("update-users"),
    validationUpdate,
    usersController.update);

//ruta para eliminar un usuario en base a su id - middleware de autenticación  - middleware de permiso
router.delete('/:id',
    passport.authenticate('jwt',{session:false}),
    permit("delete-users"),
    usersController.destroy);

module.exports = router;