import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

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

export default State;