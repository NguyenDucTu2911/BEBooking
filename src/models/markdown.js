"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    static associate(models) {
      markdown.belongsTo(models.User, { foreignKey: "doctorId" ,as: "DoctorData"});
      // markdown.belongsTo(models.specialty, { foreignKey: "specialtyId" });
      // markdown.belongsTo(models.clinic, { foreignKey: "clinicId" });
    }
  }
  markdown.init(
    {
      contentHTML: DataTypes.TEXT("long"),
      contentMarkdown: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),

      doctorId: DataTypes.INTEGER,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "markdown",
    }
  );
  return markdown;
};
