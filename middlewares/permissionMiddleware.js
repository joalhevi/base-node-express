const Role = require('../models').Role
const permit = (...allowed) => {

    return async (req, res, next) => {
        const admin = req.user.role.permissions.find(permision => permision === "*")
        const access = req.user.role.permissions.find(permision => permision === allowed[0])

       Role.findByPk(req.user.role.id).then(rol=>{
           if (!rol){
               res.status(403).json({message: "Forbidden"});
           }
           if (access || admin) {
               if ( JSON.stringify(rol.permissions) === JSON.stringify(req.user.role.permissions)){
                   next();
               }else {
                   res.status(403).json({message: "Forbidden"});
               }
           } else {
               res.status(403).json({message: "Forbidden"});
           }
       }).catch(e=>{
           res.status(403).json({message: "Forbidden"});
       })


    }
}

module.exports = {permit}
