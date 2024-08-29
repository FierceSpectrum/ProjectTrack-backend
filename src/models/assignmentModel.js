const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Assignment = sequelize.define("assignment", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  permission_id: {
    type: DataTypes.INTEGER,
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
  state_assignment: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

module.exports = Assignment;
