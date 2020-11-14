const User = require('../models').User;
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const {Op} = require('sequelize')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


module.exports = {

    /*
    module for register new user
     */
    register: (req, res) => {
        res.json({
            message: 'Register Successful',
            user: {
                id: req.user.id,
                name: req.user.name,
                lastname: req.user.lastname,
                email: req.user.email,
            }
        })
    },

    /*
    module for login
     */
    login: (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err || !user) {
                    return res.status(422).json({
                        message: 'User or password failed',
                        user: user
                    });
                }
                req.login(user, {session: false}, async (err) => {
                    if (err) return next(err)
                    const body = {
                        id: user.id,
                        name: user.name,
                        fullname: user.name + ' ' + user.lastname,
                        email: user.email,
                        role:user.role
                    };
                    const token = jwt.sign({user: body}, process.env.APP_SECRET, {expiresIn: '90m'})
                    return res.json({token})
                })
            } catch (e) {
                return next(e)
            }
        })(req, res, next)
    },

    /*
    module for recovery password
     */
    recover: async (req, res, next) => {
        console.log(req.body.email)

        User.findOne({where: {email: req.body.email}}).then(user => {
            if (!user) {
                return res.json({
                    message: 'Datos no encontrados'
                })
            }
            user.generatePasswordReset();

            user.save().then(data => {

                let link = process.env.APP_URL_FRONT+ "/reset/" + data.resetPasswordToken;
                const mailOptions = {
                    to: user.email,
                    from: process.env.FROM_EMAIL,
                    subject: "Cambio de contraseña",
                    text: `Hola ${user.name} \n 
                    Por favor haz click en el siguiente link ${link} para poder resturar tu contraseña \n\n 
                    Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios
                    .\n`,
                };
                sgMail.send(mailOptions, (error, result) => {
                    if (error) return res.status(500).json({message: error});
                    res.status(200).json({message: 'Email de resturación de contraseña fue enviado a ' + user.email + '.'});
                });

            }).catch(e => {
                console.log(e)
                next(e)
            })
        }).catch(e => {
            console.log(e)
            res.status(500).json({error: e})
        })
    },

    /*
    module for change password
   */
    reset: (req, res) => {
        User.findOne({
            where: {
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {[Op.gt]: Date.now()}
            }
        }).then(user => {
            if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

            user.password = bcrypt.hashSync(req.body.password, 10);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;

            user.save();
            res.json({message: 'success change password'})
        }).catch(err => res.status(500).json({message: err.message}));
    }
}