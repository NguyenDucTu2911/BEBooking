"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcodes, {
        foreignKey: "positoonld",
        targetKey: "keyMap",
        as: "positionData",
      });
      User.belongsTo(models.Allcodes, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
      User.belongsTo(models.Allcodes, {
        foreignKey: "roleid",
        targetKey: "keyMap",
        as: "roleidData",
      });
      User.hasOne(models.markdown, {
        foreignKey: "DoctorId",
        targetKey: "DoctorId",
        as: "DoctorData",
      });
      User.hasOne(models.doctorInfo, {
        foreignKey: "doctorId",
        targetKey: "doctorId",
        as: "DoctorInfoData",
      });
      User.hasMany(models.Schedule, {
        foreignKey: "doctorid",
        as: "ScheduleData",
      });

      User.hasMany(models.Booking, {
        foreignKey: "patientid",
        as: "BookingData",
      });
      User.hasMany(models.Booking, {
        foreignKey: "doctorId",
        as: "BookingNameData",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
      gender: DataTypes.STRING,
      roleid: DataTypes.STRING,
      password: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      positoonld: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
