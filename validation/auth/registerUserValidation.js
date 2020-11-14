const { check, validationResult } = require('express-validator');
const  User = require('../../models').User;

module.exports = [
    check('nombre').notEmpty().withMessage('El campo nombre es requerido').isLength({min:3,max:20}).withMessage('El nombre debe contener minimamente 3 caracteres'),
    check('apellido').notEmpty().withMessage('El campo apellido es requerido').isLength({min:3,max:20}).withMessage('El apellido debe contener minimamente 3 caracteres'),
    check('password').notEmpty().withMessage('El campo password es requerido').isLength({min:6}).withMessage('La contraseña debe contener mínimo 6 caracteres'),
    check('email').notEmpty().withMessage('El campo email es requerido').isEmail().withMessage('El campo correo debe ser válido').custom(value=>{
        return User.findOne({where:{ email: value }}).then(user=>{
            if (user){
                return Promise.reject('El correo ya se encuentra en uso');
            }
        })
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        else next();
    }
];