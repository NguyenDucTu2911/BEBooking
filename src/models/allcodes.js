"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Allcodes.hasMany(models.User, {
      //   foreignkey: "positoonld",
      //   as: "positionData",
      // });
      // Allcodes.hasMany(models.User, {
      //   foreignkey: "gender",
      //   as: "genderData",
      // });
    }
  }
  Allcodes.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      value_en: DataTypes.STRING,
      value_vi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );
  return Allcodes;
};
