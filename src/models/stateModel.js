const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const State = sequelize.define("state", {
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
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state_state: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

module.exports = State;
