const express = require('express')
const router = express.Router();
const passport = require("passport");

//ruta de inicio - middleware de autenticacion
router.get('/',
    passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({message: 'home'})
    });

//ruta de perfil de usuario logueado - middleare de autenticacion
router.get('/profile',
    passport.authenticate('jwt', {session: false}),
    function (req, res) {
        res.json({
            message: 'your profile',
            user: req.user,
        })
    });

module.exports = router;