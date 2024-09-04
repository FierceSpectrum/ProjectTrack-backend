import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { sequelize } from "./src/config/database.js";

dotenv.config();

// Importación de Routes
import assignmentRoutes from "./src/routes/assignmentRoutes.js";
import memberRoutes from "./src/routes/memberRoutes.js";
import organizationRoutes from "./src/routes/organizationRoutes.js";
import participantRoutes from "./src/routes/participantRoutes.js";
import permissionRoutes from "./src/routes/permissionRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import roleRoutes from "./src/routes/roleRoutes.js";
import stateRoutes from "./src/routes/stateRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";

// Impotacion de Middlewares

// App
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Use Routes
app.use("/api/assignments", assignmentRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/participants", participantRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/states", stateRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Sincroniza los modelos con la base de datos
sequelize
  .sync({ alter: true }) // Usa `alter: true` para ajustar las tablas existentes
  .then(() => {
    console.log("Database synchronized");
    // Puedes iniciar el servidor aquí después de la sincronización
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}!`)
    );
    // Impot Scripts
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
