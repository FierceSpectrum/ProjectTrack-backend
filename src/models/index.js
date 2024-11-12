// Importaciones
import Assignment from "./assignmentModel.js";
import Permission from "./permissionModel.js";
import Member from "./memberModel.js";
import Role from "./roleModel.js";
import Participant from "./participantModel.js";
import User from "./userModel.js";
import Organization from "./organizationModel.js";
import Project from "./projectModel.js";
import State from "./stateModel.js";
import Task from "./taskModel.js";

// Configuración de relaciones Many-to-Many
Assignment.belongsToMany(Permission, {
  through: "assignment_permissions",
  foreignKey: "assignment_id",
  otherKey: "permission_id",
  as: "permissions"
});

Permission.belongsToMany(Assignment, {
  through: "assignment_permissions",
  foreignKey: "permission_id",
  otherKey: "assignment_id",
  as: "assignments"
});

Member.belongsToMany(Role, {
  through: "member_roles",
  foreignKey: "member_id",
  otherKey: "role_id",
  as: "roles"
});

Role.belongsToMany(Member, {
  through: "member_roles",
  foreignKey: "role_id",
  otherKey: "member_id",
  as: "members"
});

Participant.belongsToMany(Assignment, {
  through: "participant_assignments",
  foreignKey: "participant_id",
  otherKey: "assignment_id",
  as: "assignments"
});

Assignment.belongsToMany(Participant, {
  through: "participant_assignments",
  foreignKey: "assignment_id",
  otherKey: "participant_id",
  as: "participants"
});

Role.belongsToMany(Permission, {
  through: "role_permissions",
  foreignKey: "role_id",
  otherKey: "permission_id",
  as: "permissions"
});

Permission.belongsToMany(Role, {
  through: "role_permissions",
  foreignKey: "permission_id",
  otherKey: "role_id",
  as: "roles"
});

// Relaciones Many-to-Many entre User y Organization usando una tabla intermedia
Organization.belongsToMany(User, {
  through: "organization_users",  // Definir una tabla intermedia aquí
  foreignKey: "organization_id",
  otherKey: "user_id",
  as: "users"
});

User.belongsToMany(Organization, {
  through: "organization_users",
  foreignKey: "user_id",
  otherKey: "organization_id",
  as: "organizations"
});

// Relaciones Many-to-Many entre Member y Organization
Organization.belongsToMany(Member, {
  through: "organization_members",  // Definir una tabla intermedia aquí
  foreignKey: "organization_id",
  otherKey: "member_id",
  as: "members"
});

Member.belongsToMany(Organization, {
  through: "organization_members",
  foreignKey: "member_id",
  otherKey: "organization_id",
  as: "organizations"
});

// Relaciones Many-to-Many entre Organization y Project
Organization.belongsToMany(Project, {
  through: "organization_projects",  // Definir una tabla intermedia aquí
  foreignKey: "organization_id",
  otherKey: "project_id",
  as: "projects"
});

Project.belongsToMany(Organization, {
  through: "organization_projects",
  foreignKey: "project_id",
  otherKey: "organization_id",
  as: "organizations"
});

// Relaciones One-to-Many entre Project y State
Project.belongsTo(State, {
  foreignKey: "state_id",
  as: "state"
});

State.hasMany(Project, {
  foreignKey: "state_id",
  as: "projects"
});

// Relaciones One-to-Many entre Task y State
Task.belongsTo(State, {
  foreignKey: "state_id",
  as: "state"
});

State.hasMany(Task, {
  foreignKey: "state_id",
  as: "tasks"
});

// Relaciones One-to-Many entre Project y Task
Project.hasMany(Task, {
  foreignKey: "project_id",
  as: "tasks"
});

Task.belongsTo(Project, {
  foreignKey: "project_id",
  as: "project"
});

// Exportación de modelos
export {
  Assignment,
  Permission,
  Member,
  Role,
  Participant,
  User,
  Organization,
  Project,
  State,
  Task
};
