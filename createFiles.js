import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const KEYWORDS = ["all", "res", "m", "r", "c"];
const SRC_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), "src");
const FOLDERS = ["controllers", "models", "routes"];

// Formatear las cadenas
const formattedStr = (str) => {
  return str
    .split(/[\s-]+/)
    .map((word) => word.toLowerCase())
    .join("");
};

// Formatear nombres de carpetas
const formattedFolder = (folder) =>
  folder.charAt(0).toUpperCase() +
  folder
    .slice(1, folder !== "routes" ? folder.length - 1 : folder.length)
    .toLowerCase();

// Extrae flags y nombres de componentes de los argumentos
function extraerFlagsAndComponentsName(args) {
  const flags = [];
  const componentNames = [];
  args.forEach((arg) => {
    if (arg.startsWith("-")) {
      let flag = arg.slice(1);
      if (KEYWORDS.includes(flag)) {
        flags.push(flag.toUpperCase());
      } else {
        flags.push(
          ...flag
            .split("")
            .map((flag) => flag.toUpperCase())
            .filter((flag) =>
              KEYWORDS.map((flag) => flag.toUpperCase()).includes(flag)
            )
        );
      }
    } else {
      componentNames.push(formattedStr(arg));
    }
  });
  return { flags, componentNames };
}

// Verifica si un componente ya existe
function componentExists(componentName, folder) {
  const componentDir = path.join(
    SRC_PATH,
    folder,
    `${componentName}${formattedFolder(folder)}.js`
  );
  return fs.existsSync(componentDir);
}

const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

// Crea contenido para controladores
function createControllerContent(name) {
  const capitalized = formatName(name);
  return `import ${capitalized} from "../models/${name}Model.js";

// Funciones básicas: create, update, post, delete
const post${capitalized} = async (req, res) => {
  try {
    const nueva${capitalized} = await ${capitalized}.create(req.body);
    res.status(201).json(nueva${capitalized});
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const get${capitalized}s = async (req, res) => {
  try {
    const ${name}s = await ${capitalized}.findAll();
    res.status(200).json(${name}s);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const get${capitalized}ByID = async (req, res) => {
  try {
    const ${name} = await ${capitalized}.findByPk(req.params.id);
    if (${name}) {
      res.status(200).json(${name});
    } else {
      res.status(404).json({ message: "${capitalized} not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const patch${capitalized} = async (req, res) => {
  try {
    const ${name} = await ${capitalized}.findByPk(req.params.id);
    if (${name}) {
      const updated${capitalized} = await ${name}.update(req.body);
      res.status(200).json(updated${capitalized});
    } else {
      res.status(404).json({ message: "${capitalized} not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const delete${capitalized} = async (req, res) => {
  try {
    const ${name} = await ${capitalized}.findByPk(req.params.id);
    if (${name}) {
      await ${name}.destroy();
      res.status(204).json({ message: "${capitalized} deleted" });
    } else {
      res.status(404).json({ message: "${capitalized} not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  post${capitalized},
  get${capitalized},
  get${capitalized}ByID,
  patch${capitalized},
  delete${capitalized},
};`;
}

// Crea contenido para modelos
function createModelContent(name) {
  const capitalized = formatName(name);
  return `import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const ${capitalized} = sequelize.define("${name}", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state_${name}: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Create",
  },
});

export default ${capitalized};`;
}

// Crea contenido para rutas
function createRouterContent(name) {
  const capitalized = formatName(name);
  return `import express from "express";
import ${name}Fuctions from "../controllers/${name}Controller.js";
const {
  post${capitalized},
  get${capitalized},
  get${capitalized}ByID,
  patch${capitalized},
  delete${capitalized},
} = ${name}Fuctions;

const router = express.Router();

// Rutas
router.post("/post", post${capitalized});
router.get("", get${capitalized});
router.get("/:id", get${capitalized}ByID);
router.patch("/:id", patch${capitalized});
router.put("/:id", patch${capitalized});
router.delete("/:id", delete${capitalized});

export default router;`;
}

// Crea un archivo si no existe o se usa la bandera -res
const createFile = (folder, fileName, content) => {
  const filePath = path.join(
    SRC_PATH,
    folder,
    `${fileName}${formattedFolder(folder)}.js`
  );

  if (fs.existsSync(filePath) && flags.includes("RES")) {
    fs.rmSync(filePath, {
      recursive: true,
      force: true,
    });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Archivo creado: ${filePath}`);
  } else {
    console.log(`Archivo ya existe: ${filePath}`);
  }
};

// Main
const args = process.argv.slice(2);
const { flags, componentNames } = extraerFlagsAndComponentsName(args);

// Verificar y crear la carpeta 'src' si no existe
if (!fs.existsSync(SRC_PATH)) {
  fs.mkdirSync(SRC_PATH);
}

// Crear las carpetas necesarias dentro de 'src'
FOLDERS.forEach((folder) => {
  const folderPath = path.join(SRC_PATH, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
});

// Filtrar carpetas según las flags
const selectedFolders = flags.includes("ALL")
  ? FOLDERS
  : FOLDERS.filter((folder) => flags.includes(folder.charAt(0).toUpperCase()));

// Verificar si alguno de los componentes ya existe
const existingComponents = selectedFolders.reduce((acc, folder) => {
  const existing = componentNames.filter((componentName) =>
    componentExists(componentName, folder)
  );
  return acc.concat(
    existing.map((name) =>
      path.join(folder, `${name}${formattedFolder(folder)}.js`)
    )
  );
}, []);

if (existingComponents.length > 0 && !flags.includes("RES")) {
  console.error(
    `Los siguientes componentes ya existen: ${existingComponents.join(
      ", "
    )}. Usa el flag '-res' para sobrescribir. No se creará ninguno de los componentes.`
  );
  process.exit(1);
}

// Crear archivos para cada componente
componentNames.forEach((name) => {
  selectedFolders.forEach((folder) => {
    switch (folder) {
      case "models":
        createFile("models", name, createModelContent(name));
        break;
      case "routes":
        createFile("routes", name, createRouterContent(name));
        break;
      case "controllers":
        createFile("controllers", name, createControllerContent(name));
        break;
    }
  });
});
