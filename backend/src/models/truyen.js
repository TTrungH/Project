"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Truyens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Chapters, {
        foreignKey: "truyenId",
      });
    }
  }
  Truyens.init(
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      totalChapter: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Truyens",
    }
  );
  return Truyens;
};
