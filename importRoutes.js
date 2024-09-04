import fs, { link } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Obtener __dirname en un entorno de módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio a leer (puedes cambiarlo según tus necesidades)
const routesDir = path.join(__dirname, "src/routes");
const indexFile = path.join(__dirname, "src/routes/index.js");

// Función para leer los archivos de una carpeta
function readFilesFromDirectory(directory, extension = ".js") {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        return reject(`Error leyendo la carpeta: ${err.message}`);
      }
      const filteredFiles = files.filter((file) => file.endsWith(extension));
      resolve(filteredFiles);
    });
  });
}

// Función para generar las declaraciones de importación y uso
function generateStatements(files) {
  const imports = files.map((file) => {
    const routeName = path.basename(file, ".js");
    return `import ${routeName} from "./${file}";`;
  });

  const uses = files.map((file) => {
    const importName = path.basename(file, ".js");
    const routeName = path.basename(file, "Routes.js") + "s";
    return `router.use("/${routeName}", ${importName});`;
  });

  return { imports, uses };
}

// Función para actualizar una sección del archivo
function updateSection(tag, newStatements, fileContent) {
  const newTag = `${tag}\r`;
  const lines = fileContent.split("\n");
  const tagIndex = lines.indexOf(newTag);
  if (tagIndex === -1) {
    console.error(`No se encontró la etiqueta "${tag}" en el archivo.`);
    return fileContent;
  }

  let endTagIndex = tagIndex;
  const afterTagContent = lines.slice(tagIndex);
  const firstBlankLineIndex = afterTagContent.indexOf("\r");

  if (firstBlankLineIndex !== -1) {
    endTagIndex += firstBlankLineIndex;
  } else {
    endTagIndex = lines.length;
  }

  const beforeTag = lines.slice(0, tagIndex + 1).join("\n");
  const currentSection = lines.slice(tagIndex + 1, endTagIndex);
  const afterSection = lines.slice(endTagIndex).join("\n");

  const Statements = newStatements.map((lines) => `${lines}\r`);

  const currentLines = currentSection.map((line) => line.trim() + "\r");
  const uniqueStatements = currentLines.filter(
    (line) => !Statements.includes(line)
  );

  Statements.push(...uniqueStatements);

  const updatedSection = Statements.join("\n");

  return `${beforeTag}\n${updatedSection}\n${afterSection}`;
}

// Función principal para actualizar el archivo index.js
async function updateIndexFile() {
  try {
    const routeFiles = await readFilesFromDirectory(routesDir);
    const { imports, uses } = generateStatements(routeFiles);

    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err) {
        console.error(`Error leyendo el archivo: ${err.message}`);
        return;
      }

      let updatedContent = data;
      updatedContent = updateSection(
        "// Importación de Routes",
        imports,
        updatedContent
      );
      updatedContent = updateSection("// Use Routes", uses, updatedContent);

      fs.writeFile(indexFile, updatedContent, "utf8", (err) => {
        if (err) {
          console.error(`Error escribiendo el archivo: ${err.message}`);
          return;
        }
        console.log("index.js actualizado con éxito.");
      });
    });
  } catch (error) {
    console.error(error);
  }
}

// Ejecutar la función principal
updateIndexFile();