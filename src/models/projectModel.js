const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Project = sequelize.define("project", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "state",
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
  repository_link: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  state_project: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

module.exports = Project;
