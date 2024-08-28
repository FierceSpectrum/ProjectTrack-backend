const fs = require("fs");
const path = require("path");
const execSync = require("child_process").execSync;

const PALABRAS_CLAVES = ["all", "res", "m", "r", "c"];

const toPascalCase = (str) => {
  return str
    .split(/[\s-]+/)
    .map((word) => word.toLowerCase())
    .join("");
};

// Extrae flags y nombres de componentes de los argumentos
function extraerFlagsAndComponentsName(args) {
  const flags = [];
  const componentNames = [];
  args.forEach((arg) => {
    if (arg.startsWith("-")) {
      let flag = arg.slice(1);
      if (PALABRAS_CLAVES.includes(flag)) {
        flags.push(flag.toUpperCase());
      } else {
        flags.push(
          ...flag
            .split("")
            .map((flag) => flag.toUpperCase())
            .filter((flag) =>
              PALABRAS_CLAVES.map((flag) => flag.toUpperCase()).includes(flag)
            )
        );
      }
    } else {
      componentNames.push(toPascalCase(arg));
    }
  });
  return { flags, componentNames };
}

// Verifica si un componente ya existe
function componenteYaExiste(componentName, folder) {
  const formattedFolder =
    folder.charAt(0).toUpperCase() +
    folder.slice(1, folder.length - 1).toLowerCase();
  const componentDir = path.join(
    srcPath,
    folder,
    `${componentName}${formattedFolder}.js`
  );
  return fs.existsSync(componentDir);
}

const formatName = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

function contentController(name) {
  return `const ${formatName(name)} = require("../models/${name}Model");

// Funciones básicas: create, update, post, delete
const post${formatName(name)} = async (req, res) => {
  try {
    res.status(201).json({ message: "${formatName(name)} create" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const get${formatName(name)} = async (req, res) => {
  try {
    res.status(200).json({ message: "${formatName(name)}s gets" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const get${formatName(name)}ByID = async (req, res) => {
  try {
    res.status(200).json({ message: "${formatName(name)} get" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const patch${formatName(name)} = async (req, res) => {
  try {
    res.status(200).json({ message: "${formatName(name)} update" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const delete${formatName(name)} = async (req, res) => {
  try {
    res.status(204).json({ message: "${name} delete" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  post${formatName(name)},
  get${formatName(name)},
  get${formatName(name)}ByID,
  patch${formatName(name)},
  delete${formatName(name)},
};`;
}

function contentModel(name) {
  return `const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const ${formatName(name)} = sequelize.define(
  "${formatName(name)}",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    baseField: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state${formatName(name)}: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Create",
    },
  }
);

module.exports = ${formatName(name)};`;
}

function contentRouter(name) {
  return `const express = require("express");
const router = express.Router();
const {
  post${formatName(name)},
  get${formatName(name)}s,
  get${formatName(name)}ByID,
  patch${formatName(name)},
  delete${formatName(name)},
} = require("../controllers/${name}Controller");

// Rutas
router.post("/post", post${formatName(name)});
router.get("", get${formatName(name)}s);
router.get("/:id", get${formatName(name)}ByID);
router.patch("/:id", patch${formatName(name)});
router.put("/:id", patch${formatName(name)});
router.delete("/:id", delete${formatName(name)});

module.exports = router;`;
}

// Obtener los argumentos de la línea de comandos
const args = process.argv.slice(2);

const { flags, componentNames } = extraerFlagsAndComponentsName(args);

// console.log(flags);
// process.exit(1);

const srcPath = path.join(__dirname, "src");

const folders = ["controllers", "models", "routes"];

// Verificar y crear la carpeta 'src'
if (!fs.existsSync(srcPath)) {
  fs.mkdirSync(srcPath);
}

// Crear las carpetas necesarias dentro de 'src'
folders.forEach((folder) => {
  const folderPath = path.join(srcPath, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
});

// Función para crear archivos
const createFile = (folder, fileName, content) => {
  const formattedFolder =
    folder.charAt(0).toUpperCase() +
    folder.slice(1, folder.length - 1).toLowerCase();

  const filePath = path.join(
    srcPath,
    folder,
    `${fileName}${formattedFolder}.js`
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

// Filtra las carpetas según las flags
const folderflags = flags.includes("ALL")
  ? folders
  : folders.filter((folder) => flags.includes(folder.charAt(0).toUpperCase()));

// Verificar si alguno de los componentes ya existe
const existingComponents = folderflags.reduce((acc, folder) => {
  const names = componentNames.filter((componentName) =>
    componenteYaExiste(componentName, folder)
  );
  const formattedFolder =
    folder.charAt(0).toUpperCase() +
    folder.slice(1, folder.length - 1).toLowerCase();
  const componentPaths = names.map((name) =>
    path.join(folder, `${name}${formattedFolder}.js`)
  );
  return acc.concat(componentPaths);
}, []);

// console.log(existingComponents);
// process.exit(1);

if (existingComponents.length > 0 && !flags.includes("RES")) {
  console.error(
    `Los siguientes componentes ya existen: ${existingComponents.join(
      ", "
    )}. Usa el flag '-res' para sobrescribir. No se creará ninguno de los componentes.`
  );
  process.exit(1); // Terminar si alguno ya existe y no tiene '-res'
}
// process.exit(1);

componentNames.forEach((name) => {
  flags.forEach((flag) => {
    switch (flag.toUpperCase()) {
      case "M":
        createFile("models", name, contentModel(name));
        break;
      case "R":
        createFile("routes", name, contentRouter(name));
        break;
      case "C":
        createFile("controllers", name, contentController(name));
        break;
      case "ALL":
        createFile("models", name, contentModel(name));
        createFile("routes", name, contentRouter(name));
        createFile("controllers", name, contentController(name));
        break;
      case "RES":
        break;
      default:
        console.log(`Flag no reconocida: ${flag}`);
        break;
    }
  });
});
