const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Organization = sequelize.define(
  "Organization",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    baseField: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateOrganization: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Organization;