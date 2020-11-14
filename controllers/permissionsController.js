const permissions = require(__dirname + '/../helpers/permissions.js');

module.exports ={

    /*
    * module index all permissions
     */
    index:(req,res)=>{
        res.json(permissions.abilities)
    }
}