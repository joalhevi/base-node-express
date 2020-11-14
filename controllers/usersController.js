const User =require('../models').User;
const Role =require('../models').Role;
const bcrypt = require('bcrypt')


module.exports={
    /*
        module to show all data
     */
    index:(req, res)=>{
        let page =parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.size) || 5
        let offset = page * limit - limit || 0
        let query = req.query.q || null
        User.findAndCountAll({
            offset: offset,
            limit:limit,
            include: [
                {
                    model:Role,
                    as:'role'
                }
            ],
            order:[
                ['id','DESC']
            ]
        }).then(users=>{
                const data={
                    count:users.count,
                    currentPage:page,
                    totalPages : Math.ceil(users.count / limit),
                    data: users.rows,
                }
            return res.json(data)
        }).catch(e=>{
            console.log(e)
            res.status(500)
            return res.json({
                data:e
            })
        })
    },

    /*
        module to store new data
     */
    store:(req, res)=>{
        User.create({
            name: req.body.nombre.toLowerCase(),
            lastname: req.body.apellido.toLowerCase(),
            email: req.body.email.toLowerCase(),
            password: req.body.password,
            roleId: req.body.rol
        }).then(user=>{
            if (!user){
                res.status(500)
                return res.json({message:'server error'})
            }
            return res.json(user)
        }).catch(e=>{
            console.log(e)
            res.status(500)
            return res.json({message:'server error'})
        })
    },

    /*
       module to show all data
    */
    show:(req, res)=>{
        User.findByPk(req.params.id).then(user=>{
            if (!user){
                res.status(404).json({
                    message:'data not found'
                })
            }
            res.json(user)
        })
    },

    /*
        module to store new data
     */
    update: async (req, res)=>{

        const userSearch =await User.findByPk(req.params.id);
        if (!userSearch){
            res.status(404)
            res.json({
                message:'data not found'
            })
        }
        const data={};
        if (userSearch.name !== req.body.nombre.toLowerCase()){
            data['name'] =req.body.nombre.toLowerCase();
        }
        if (userSearch.lastname !== req.body.apellido.toLowerCase()){
            data['lastname'] =req.body.apellido.toLowerCase();
        }
        if (userSearch.roleId !== req.body.rol){
            data['roleId'] =req.body.rol;
        }
        if (userSearch.email !== req.body.email.toLowerCase()){
            const userEmail = await User.findOne({where:{email:req.body.email}});
            if (userEmail){
                res.status(422)
                res.json({errors:[
                        {
                            value: req.body.email,
                            msg: "El correo ya se encuentra en uso",
                            param: "email",
                            location: "body"
                        }
                    ]})
            }

            data['email'] =req.body.email.toLowerCase();
        }
        if (req.body.password){
            const passwordHash  = await bcrypt.hashSync(req.body.password,10)
            data['password'] =passwordHash
        }

        userSearch.update(data)
            .then(user=>{
                res.json(user)
            }).catch(e=>{
                console.log(e)
            res.json(e)
            })
    },

    /*
       module to store new data
    */
    destroy: async (req, res)=>{
       User.destroy({where:{id:req.params.id}}).then(user=>{
           if (!user){
               res.status(404)
               res.json({
                   message:'data not found'
               })
           }

            res.json({
                message:'data delete success'
            })

        }).catch(e=>{
            console.log(e)
            res.status(500)
            res.json({
                message:'error delete'
            })
        })
    }
}