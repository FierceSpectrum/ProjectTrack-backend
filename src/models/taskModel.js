const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define(
  "Task",
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
    stateTask: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Task;