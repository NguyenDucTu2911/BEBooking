"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "patientid",
        targetKey: "id",
        as: "BookingData",
      });
      Booking.belongsTo(models.User, {
        foreignKey: "doctorId",
        targetKey: "id",
        as: "BookingNameData",
      });

      Booking.belongsTo(models.Allcodes, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeTypeBooking",
      });
    }
  }
  Booking.init(
    {
      statusId: DataTypes.STRING,
      doctorId: DataTypes.INTEGER,
      patientid: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
      freezeTableName: true,
    }
  );
  return Booking;
};
