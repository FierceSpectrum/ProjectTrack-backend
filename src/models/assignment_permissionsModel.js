import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Assignment_permissions = sequelize.define("assignment_permissions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  state_assignment_permissions: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Assignment_permissions;