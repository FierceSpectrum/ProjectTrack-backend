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

User.belongsToMany(Organization, {
  through: "user_organizations",
  foreignKey: "user_id",
  otherKey: "organization_id",
  as: "organizations"
});

Organization.belongsToMany(User, {
  through: "user_organizations",
  foreignKey: "organization_id",
  otherKey: "user_id",
  as: "users"
});

// Relaciones Many-to-Many entre Task y Participant
Task.belongsToMany(Participant, {
  through: "task_participants",
  foreignKey: "task_id",
  otherKey: "participant_id",
  as: "participants"
});

Participant.belongsToMany(Task, {
  through: "task_participants",
  foreignKey: "participant_id",
  otherKey: "task_id",
  as: "tasks"
});

// Relaciones Many-to-Many entre Task y Assignment
Task.belongsToMany(Assignment, {
  through: "task_assignments",
  foreignKey: "task_id",
  otherKey: "assignment_id",
  as: "assignments"
});

Assignment.belongsToMany(Task, {
  through: "task_assignments",
  foreignKey: "assignment_id",
  otherKey: "task_id",
  as: "tasks"
});

// Relaciones One-to-Many entre Organization y Member
Organization.hasMany(Member, {
  foreignKey: "organization_id",
  as: "members"
});

Member.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization"
});

// Relaciones One-to-Many entre User y Member
User.hasMany(Member, {
  foreignKey: "user_id",
  as: "members"
});

Member.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

// Relaciones One-to-Many entre Organization y Project
Organization.hasMany(Project, {
  foreignKey: "organization_id",
  as: "projects"
});

Project.belongsTo(Organization, {
  foreignKey: "organization_id",
  as: "organization"
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

// Relaciones One-to-One entre Project y State
Project.belongsTo(State, {
  foreignKey: "state_id",
  as: "state"
});

State.hasOne(Project, {
  foreignKey: "state_id",
  as: "project"
});

// Relaciones One-to-One entre Task y State
Task.belongsTo(State, {
  foreignKey: "state_id",
  as: "state"
});

State.hasOne(Task, {
  foreignKey: "state_id",
  as: "task"
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
