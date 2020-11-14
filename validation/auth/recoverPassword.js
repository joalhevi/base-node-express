const { body, validationResult } = require('express-validator');

module.exports = [
    body('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El campo correo debe ser válido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];