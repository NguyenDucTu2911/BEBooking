"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class doctorInfo extends Model {
    static associate(models) {
      doctorInfo.belongsTo(models.User, {
        foreignKey: "doctorId",
        as: "DoctorInfoData",
      });
      doctorInfo.belongsTo(models.Allcodes, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "timeTypePriceId",
      });
      doctorInfo.belongsTo(models.Allcodes, {
        foreignKey: "provinceId",
        targetKey: "keyMap",
        as: "timeTypeProvinceId",
      });
      doctorInfo.belongsTo(models.Allcodes, {
        foreignKey: "paymentId",
        targetKey: "keyMap",
        as: "timeTypePaymentId",
      });
    }
  }
  doctorInfo.init(
    {
      doctorId: DataTypes.INTEGER,
      priceId: DataTypes.STRING,
      provinceId: DataTypes.STRING,
      paymentId: DataTypes.STRING,
      addressClinic: DataTypes.TEXT,
      nameClinic: DataTypes.STRING,
      note: DataTypes.TEXT,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "doctorInfo",
      freezeTableName: true,
    }
  );
  return doctorInfo;
};
