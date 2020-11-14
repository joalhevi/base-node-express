const { check,body, validationResult } = require('express-validator');

module.exports = [
    check('nombre').notEmpty().withMessage('El campo nombre es requerido').withMessage('El campo no puede estar vacio').isLength({min:3,max:20}).withMessage('El campo nombre debe contener minimamente 3 caracteres'),
    check('apellido').notEmpty().withMessage('El campo apellido es requerido').isLength({min:3,max:20}).withMessage('El apellido debe contener minimamente 3 caracteres'),
    check('email').isEmail().withMessage('El campo correo debe ser válido'),
    check('password').optional().custom(value=>{
        if (value.length>0){
            if (value.length<=5){
                return Promise.reject('El campo password debe ser de minimamente 6 caracteres');
            }else{
                return value;
            }
        }else{
            return Promise.reject('El campo password es requerido');
        }
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];