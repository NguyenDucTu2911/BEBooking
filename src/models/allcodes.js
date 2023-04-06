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
      Allcodes.hasMany(models.User, {
        foreignKey: "positoonld",
        as: "positionData",
      });
      Allcodes.hasMany(models.User, {
        foreignKey: "roleid",
        as: "roleidData",
      });
      Allcodes.hasMany(models.User, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcodes.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeTypeData",
      });

      //dotor
      Allcodes.hasMany(models.doctorInfo, {
        foreignKey: "priceId",
        as: "timeTypePriceId",
      });
      Allcodes.hasMany(models.doctorInfo, {
        foreignKey: "provinceId",
        as: "timeTypeProvinceId",
      });
      Allcodes.hasMany(models.doctorInfo, {
        foreignKey: "paymentId",
        as: "timeTypePaymentId",
      });

      Allcodes.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeTypeBooking",
      });
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
