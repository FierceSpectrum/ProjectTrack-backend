const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Assignment = sequelize.define(
  "Assignment",
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
    stateAssignment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Assignment;