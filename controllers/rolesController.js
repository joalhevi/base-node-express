const Role = require('../models').Role

module.exports={
    /*
    module for index roles
     */
    index:(req, res)=>{
        let page =parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.size) || 5
        let offset = page * limit - limit || 0
        Role.findAndCountAll({
            offset: offset,
            limit:limit,
            order:[
                ['id','DESC']
                ]
        }).then(roles=>{
            const data={
                count:roles.count,
                currentPage:page,
                totalPages : Math.ceil(roles.count / limit),
                data: roles.rows,
            }
            return res.json(data)
        }).catch(e=>{
            console.log(e)
            return res.status(500).json({
                data:e
            })
        })
    },
    /*
    module for store new rol
     */
    store:(req,res)=>{
        Role.create({
            name:req.body.nombre,
            description: req.body.descripcion,
            permissions:req.body.permisos
        }).then(rol=>{
            return res.json({rol})
        }).catch(e=>{
            console.log(e)
            return res.status(500).json({
                data:e
            })
        })
    },
    /*
    module for show one role
     */
    show:(req, res)=>{
        Role.findOne({where:{id:req.params.id}}).then(rol=>{
            if (!rol){
                res.status(404).json({
                    message:'data not found'
                })
            }
            res.json(rol)
        }).catch(e=>{
            console.log(e)
            return res.status(500).json({
                data:e
            })
        })
    },

    /*
    module for update date
     */
    update:async (req, res)=>{
        const role =await Role.findByPk(req.params.id);
        if (!role){
            res.status(404)
            res.json({
                message:'data not found'
            })
        }

        role.name =req.body.nombre;
        role.description =req.body.descripcion;
        role.permissions =req.body.permisos;
        role.save().then(role=>{
            if (!role){
                res.status(404)
                res.json({
                    message:'data not found'
                })
            }
            res.json({role})
        }).catch(e=>{
            console.log(e)
            return res.status(500).json({
                data:e
            })
        })
    },
    /*
    * module for delete date
     */
    destroy:(req, res)=>{
        Role.destroy({where:{id:req.params.id}}).then(role=>{
            if (!role){
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