import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { sequelize } from "./src/config/database.js";

dotenv.config();

// Impotacion de Routes

// Impotacion de Middlewares

// App
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("Ruta", fuction);

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
