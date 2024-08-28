const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Participant = sequelize.define(
  "Participant",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    baseField: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stateParticipant: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = Participant;