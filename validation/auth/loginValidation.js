const { check, validationResult } = require('express-validator');

module.exports = [
    check('password').notEmpty().isLength({min:6}).withMessage('La contraseña debe contener mínimo 6 caracteres'),
    check('email').notEmpty().isEmail().withMessage('El campo correo debe ser válido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];