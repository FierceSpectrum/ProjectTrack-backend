import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Participant = sequelize.define("participant", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "project",
      key: "id",
    },
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "member",
      key: "id",
    },
  },
  assignments_id: {
    type: DataTypes.ARRAY,
    allowNull: false,
    references: {
      model: "assignment",
      key: "id",
    },
  },
  state_participant: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Participant;