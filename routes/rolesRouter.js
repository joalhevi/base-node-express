const express = require('express')
const router = express.Router();
const passport = require("passport");
const rolesController = require('../controllers/rolesController.js')
const validationStore = require('../validation/roles/storeValidation')
const {permit} = require('../middlewares/permissionMiddleware')

// ruta para listar todos los roles registrados - middleware de autenticación  - middleware de permiso
router.get('/',
    passport.authenticate('jwt', {session: false}),
    permit("index-roles"),
    rolesController.index);

// ruta para almacenar un nuevo rol - - middleware de autenticación  - middleware de permiso - validacion de datos
router.post('/',
    passport.authenticate('jwt', {session: false}),
    permit("create-roles"),
    validationStore,
    rolesController.store);

// ruta para mostrar un solo rol en base a su id - middleware de autenticación  - middleware de permiso
router.get('/:id',
    passport.authenticate('jwt', {session: false}),
    permit("show-roles"),
    rolesController.show);

// ruta para mostrar actualizar un rol en base a su id  - middleware de autenticación  - middleware de permiso - validación de datos
router.put('/:id',
    passport.authenticate('jwt', {session: false}),
    permit("update-roles"),
    rolesController.update);

// ruta para eliminar un rol  - middleware de autenticación  - middleware de permiso
router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    permit("delete-roles"),
    rolesController.destroy);

module.exports = router;