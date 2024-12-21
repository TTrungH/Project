"use strict";
const { Model } = require("sequelize");
const roles = require("./roles");
module.exports = (sequelize, DataTypes) => {
    class Groups extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            this.hasMany(models.Users, {
                foreignKey: "groupId",
            });
            this.belongsToMany(models.Roles, { through: "Group_Roles" });
        }
    }
    Groups.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Groups",
        }
    );
    return Groups;
};
