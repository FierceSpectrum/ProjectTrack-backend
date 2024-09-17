import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Role_permissions = sequelize.define("role_permissions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "role",
      key: "id",
    },
  },
  permission_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "permission",
      key: "id",
    },
  },
  state_role_permissions: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Role_permissions;