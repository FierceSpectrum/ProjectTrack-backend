import Assignment from "./assignmentModel.js";
import Permission from "./permissionModel.js";
import Assignment_permissions from "./assignment_permissionsModel.js";

// // Configuración de relación
// Assignment.belongsToMany(Permission, {
//   through: "assignment_permissions",
//   foreignKey: "assignment_id",
//   otherKey: "permission_id",
//   as: "permissions",
// });

// // Configuración de relación
// Permission.belongsToMany(Assignment, {
//   through: "assignment_permissions",
//   foreignKey: "permission_id",
//   otherKey: "assignment_id",
//   as: "assignments",
// });

// Configura relaciones
Assignment.belongsToMany(Permission, {
  through: Assignment_permissions,
  foreignKey: "assignment_id",
  otherKey: "permission_id",
  as: "permissions",
});

Permission.belongsToMany(Assignment, {
  through: Assignment_permissions,
  foreignKey: "permission_id",
  otherKey: "assignment_id",
  as: "assignments",
});

export { Assignment, Permission, Assignment_permissions };
