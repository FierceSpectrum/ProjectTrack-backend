import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Member = sequelize.define("member", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "organization",
      key: "id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "role",
      key: "id",
    },
  },
  state_member: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Member;