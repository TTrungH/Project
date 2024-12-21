"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chapters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Truyens);
    }
  }
  Chapters.init(
    {
      name: DataTypes.STRING,
      content: DataTypes.TEXT,
      orderNumber: DataTypes.INTEGER,
      truyenId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chapters",
    }
  );
  return Chapters;
};
