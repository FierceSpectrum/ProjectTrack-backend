import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Organization = sequelize.define("organization", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
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
  state_organization: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Organization;