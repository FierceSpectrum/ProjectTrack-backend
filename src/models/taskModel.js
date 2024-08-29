const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"project",
        key:"id"
      }
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"participant",
        key:"id"
      }
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"state",
        key:"id"
      }
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"assignment",
        key:"id"
      }
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    state_task: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Task;