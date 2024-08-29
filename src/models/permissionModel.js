const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Permission = sequelize.define(
  "permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state_permission: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Permission;