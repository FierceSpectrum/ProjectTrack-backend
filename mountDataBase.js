import { pool } from "./src/config/database.js";
import fs from "fs/promises";

async function executeSQLFile(filePath) {
  try {
    // Conéctate a la base de datos
    // await pool.connect();
    console.log("Conectado a la base de datos");

    // Lee el archivo SQL
    const sql = await fs.readFile(filePath, { encoding: "utf8" });

    // Si quieres limpiar la base de datos antes de recrearla, puedes ejecutar una consulta para eliminar todas las tablas
    // await pool.query("DROP SCHEMA public CASCADE;");
    // await pool.query("CREATE SCHEMA public;");

    // Ejecuta las consultas del archivo SQL
    await pool.query(sql);
    console.log("Base de datos recreada y datos insertados");
  } catch (err) {
    console.error("Error ejecutando el archivo SQL", err);
  } finally {
    // Cierra la conexión
    await pool.end();
    console.log("Conexión cerrada");
  }
}

// Especifica la ruta del archivo SQL que deseas ejecutar
const sqlFilePath = "./ProjectTrackDB.sql";
executeSQLFile(sqlFilePath)
  .then(() => {
    return;
  })
  .catch((err) => {
    console.error("Error ejecutando el script", err);
  });
