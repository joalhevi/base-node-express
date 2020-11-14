var compression = require('compression');
const  express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser')
const passport = require("passport");
const cors = require("cors");

const app = express();

// compress all responses
app.use(compression())

// inicialize passport
app.use(passport.initialize());
require('./middlewares/auth')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());

// control cors
const whitelist = process.env.WHITE_LIST
const corsOptions = {
    origin: function(origin, callback){
        if(!origin) return callback(null, true);
        if(whitelist.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}
app.use(cors(corsOptions));

/*imports*/
const home = require('./routes/homeRouter')
const auth = require('./routes/authRouter')
const permissions = require('./routes/permissionsRouter')
const roles = require('./routes/rolesRouter')
const users = require('./routes/usersRouter')

/* middleware*/
app.use('/',home);
app.use(auth);
app.use('/users',users);
app.use('/permissions',permissions);
app.use('/roles',roles);


app.listen(process.env.PORT,()=>{
    console.log('run app port '+process.env.PORT);
})