"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Position.init(
    {
      type: DataTypes.STRING,
      url: DataTypes.TEXT,
      company: DataTypes.STRING,
      company_url: DataTypes.TEXT,
      company_logo: DataTypes.TEXT,
      location: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      how_to_apply: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Position",
    }
  );
  return Position;
};
