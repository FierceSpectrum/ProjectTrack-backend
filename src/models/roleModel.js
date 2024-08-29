const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  permissions_id: {
    type: DataTypes.ARRAY,
    allowNull: false,
    references: {
      model: "permission",
      key: "id",
    },
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state_role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

module.exports = Role;
