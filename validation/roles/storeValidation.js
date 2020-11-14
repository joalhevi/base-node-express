const { body, validationResult } = require('express-validator');

module.exports = [
    body('nombre').notEmpty().withMessage('El campo nombre es requerido').isLength({min:3,max:20}).withMessage('El nombre debe contener minimamente 3 caracteres'),
    body('descripcion').notEmpty().withMessage('El campo descripcion es requerido').isLength({min:3,max:20}).withMessage('El campo descripcion debe contener minimamente 3 caracteres'),
    body('permisos').notEmpty().withMessage('El campo permisos es requerido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];