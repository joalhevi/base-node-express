'use strict';
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const {
  Model
} = require('sequelize');
const PROTECTED_ATTRIBUTES = ['password']

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      User.belongsTo( models.Role,{
        as:'role'
      })
    }
    toJSON () {
      // hide protected fields
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }
  };

  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    roleId:DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    modelName: 'User',
  });
  //crear metodo para encriptar la contraseña
  User.encryptPassword= (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  };

  //crear metodo para validar la contraseña
  User.prototype.validPassword =  (password)=>{
       bcrypt.compareSync(password, this.password)
  }
   //metodo para generar token para reinicio de contraseña a usuario identificado
  User.prototype.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
  };

  //hook para guardar la contraseña encriptada
  User.beforeCreate(   (user, options) => {
    return  new Promise((res, rej)=>{
      if (user.password) {
        bcrypt.hash(user.password,10,(err, hash)=>{
          user.password = hash;
          res();
        })
      }
    })
  });

  return User;
};