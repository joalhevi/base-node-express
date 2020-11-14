const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../models').User;
const Role = require('../models').Role;

const bcrypt = require('bcrypt')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        //const passwordHash = await bcrypt.hashSync(password,10);
        const user = await User.create({
            name: req.body.nombre,
            lastname: req.body.apellido,
            email: email,
            password: password,
            roleId:2,
        })
        done(null, user)
    } catch (e) {
        done(e)
    }
}))

passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  async (email, password, done) => {
    const userLogin = await User.findOne({where:{email: email},include:[{model:Role, as:'role'}]});

    if (!userLogin){
        return done(null, false, { message: 'User not found' })
    }

    const validate =  bcrypt.compareSync(password, userLogin.password)

    if (!validate) {
        return done(null, false, { message: 'Wrong password' })
    }

    return done(null, userLogin, { message: 'Login successfull' })

}))

passport.use(new JWTStrategy({
    secretOrKey:process.env.APP_SECRET,
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(process.env.APP_SECRET)
},async (token, done)=>{
    try {
        return done(null, token.user)
    }catch (e) {
       done.error
    }
}))
