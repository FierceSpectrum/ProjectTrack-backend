import express from "express";

// Importación de Routes
import assignmentRoutes from "./assignmentRoutes.js";
import memberRoutes from "./memberRoutes.js";
import organizationRoutes from "./organizationRoutes.js";
import participantRoutes from "./participantRoutes.js";
import permissionRoutes from "./permissionRoutes.js";
import projectRoutes from "./projectRoutes.js";
import roleRoutes from "./roleRoutes.js";
import stateRoutes from "./stateRoutes.js";
import taskRoutes from "./taskRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Impotacion de Middlewares

// Use Routes
router.use("/assignments", assignmentRoutes);
router.use("/members", memberRoutes);
router.use("/organizations", organizationRoutes);
router.use("/participants", participantRoutes);
router.use("/permissions", permissionRoutes);
router.use("/projects", projectRoutes);
router.use("/roles", roleRoutes);
router.use("/states", stateRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

//
export default router;