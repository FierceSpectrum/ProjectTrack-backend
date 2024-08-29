import { Pool } from "pg";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Cargar variables de entorno desde un archivo .env
dotenv.config();

// Configuración para el pool de conexiones con pg
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Configuración de Sequelize para PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres", // Dialecto de la base de datos
    // port: process.env.DB_PORT, // Puerto de la base de datos
    logging: false, // Puedes habilitar el registro de consultas SQL si es necesario
  }
);

export { pool, sequelize };