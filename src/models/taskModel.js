import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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
        model:"projects",
        key:"id"
      }
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"participants",
        key:"id"
      }
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"states",
        key:"id"
      }
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:{
        model:"assignments",
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

export default Task;