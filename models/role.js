'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Role.hasMany(models.User, {
                as: 'users'
            });
        }
    }
    Role.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        permissions: {
            type: DataTypes.TEXT,
            get() {
                let rawValue = this.getDataValue('permissions');
                const abilitiesNecesaries = ["perfil", "dashboard", "404", "500", "403", "reset"]
                Object.assign(abilitiesNecesaries, JSON.parse(rawValue));
                rawValue = abilitiesNecesaries;
                return rawValue
            },
        }
    }, {
        sequelize,
        modelName: 'Role',
    });
    Role.beforeCreate((role, options) => {
        return role.permissions.toString();
    });
    return Role;
};