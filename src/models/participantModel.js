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
      model: "projects",
      key: "id",
    },
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "members",
      key: "id",
    },
  },
  assignments_id: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  state_participant: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Participant;