import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Participant_assignments = sequelize.define("participant_assignments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  participant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "participant",
      key: "id",
    },
  },
  assignment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "assignment",
      key: "id",
    },
  },
  state_participant_assignments: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default Participant_assignments;