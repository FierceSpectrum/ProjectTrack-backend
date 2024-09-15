### 1. Formato de Código

- Prettier: Utiliza Prettier como formateador de código. Instala la extensión de Prettier en Visual Studio Code. Prettier formateará automáticamente el código según la guía de estilo del proyecto.
- Comillas Dobles: Usa siempre comillas dobles (") para cadenas de texto. Usa comillas simples (') solo cuando las comillas dobles sean necesarias dentro de la cadena o usa backticks (`) para incrustar código o variables en las cadenas.
- Backticks: Usa backticks cuando incrustes código o variables en las cadenas para mejorar la legibilidad y funcionalidad.
- Formato Consistente: Mantén siempre un formato consistente con espacios, saltos de línea e indentación para asegurar la legibilidad. Prettier se encargará de esto automáticamente.

### 2. Linting

- Usa ESLint para garantizar la calidad y consistencia del código. Ayudará a detectar errores y a aplicar los estándares de codificación. La configuración de ESLint debe estar alineada con Prettier para evitar conflictos entre el linter y el formateador.
- Instala ESLint para proyectos de JavaScript y configúralo según las necesidades del proyecto. Se recomienda aplicar reglas como evitar variables no utilizadas, asegurar un espaciado correcto y un adecuado alcance de variables.

### 3. Convenciones de Nombres

- Variables y Constantes:
  - Usa camelCase para nombres de variables (ej.: `userName`, `postCount`).
  - Usa UPPER_SNAKE_CASE para constantes (ej.: `API_ENDPOINT`, `MAX_LIMIT`).
- Funciones:
  - Usa camelCase para nombres de funciones, asegurando que describan la acción que realizan (ej.: `getUserData`, `createPost`).
- Clases y Modelos:
  - Usa PascalCase para nombres de clases y modelos (ej.: `UserModel`, `PostController`).
- Rutas:
  - Sigue las convenciones RESTful:
  - GET para recuperar datos debe ser en plural (ej.: `/users`, `/posts`).
  - Usa "by" para filtrar (ej.: `getUserById`, `getPostByCategory`).
  - Las rutas POST deben ser descriptivas de la acción (ej.: /posts, `/users`).

### 4. Estructura de Carpetas

- Controladores: Almacena los controladores en una carpeta llamada `controllers`. Cada archivo debe nombrarse en minúsculas con la palabra "controller" al final (ej.: `userController.js`, `postController.js`).
- Modelos: Almacena los modelos en una carpeta llamada `models`, y nombra cada archivo en minúsculas con la palabra "model" al final (ej.: `userModel.js`, `postModel.js`).
- Rutas: Almacena las rutas en una carpeta llamada `routes`, nombrando los archivos en minúsculas con "routes" al final (ej.: `userRoutes.js`, `postRoutes.js`).
- Servicios: Las funciones de utilidad o servicios deben almacenarse en la carpeta `services`. Agrupa los servicios relacionados dentro de subcarpetas (ej.: `authService`, `emailService`).
- Utils: Coloca las funciones auxiliares en una carpeta `utils`, organizadas en subcarpetas si es necesario (ej.: `validate`, `helpers`).

### 5. Documentación

- Usa JSDoc para documentar funciones, métodos y clases. Cada función debe tener un comentario JSDoc explicando:
  - Qué hace la función.
  - Los parámetros y sus tipos.
  - Los valores de retorno y sus tipos.
- Ejemplo de JSDoc para una función:

  ```javascript
  /**
   * Recupera los datos del usuario por ID.
   * @param {number} userId - El ID del usuario a recuperar.
   * @returns {object} El objeto de datos del usuario.
   */
  function getUserById(userId) {
    // código...
  }
  ```

### 6. Buenas Prácticas para Controladores

- Mantén los controladores simples. Cada archivo de controlador solo debe incluir los métodos HTTP principales como GET, POST, PUT y DELETE que se están exportando.
- Las funciones complejas o reutilizables deben extraerse a las carpetas services o utils, dependiendo de la naturaleza de la función.
- Asegúrate de que cada método esté documentado usando JSDoc y siga las convenciones de nombres establecidas.

### 7. Módulos ESM (ECMAScript Modules)

- Usa la sintaxis import/export en todo el proyecto. Evita usar `require()` y `module.exports` ya que están desactualizados.
- Ejemplo:

  ```javascript
  import { getUserById } from "./services/userService.js";
  export const createUser = (req, res) => {
    /_..._/;
  };
  ```

### 8. Rutas

- Para solicitudes GET que devuelven colecciones, usa la forma plural (ej.: `/users`, `/posts`).
- Para solicitudes GET que filtran resultados, usa el formato `/recurso/by/filtro` (ej.: `/users/by/id`, `/posts/by/category`).
- Para recursos específicos, usa el ID directamente en la URL (ej.: `/user/:id`, `/post/:id`).
- Usa POST para crear nuevos recursos y PUT/PATCH para actualizaciones.

### 9. Nombres de Archivos y Organización

- Los nombres de los archivos deben estar en minúsculas y describir el contenido o propósito. El patrón de nombres es consistente con la carpeta en la que se encuentra el archivo (ej.: `userController.js` en `controllers`, `postModel.js` en `models`).
- Usa subcarpetas para agrupar funcionalidades relacionadas (ej.: una carpeta `validate` dentro de `utils` para almacenar múltiples funciones de validación).
- Los archivos de middleware deben residir en una carpeta `middlewares` y ser nombrados descriptivamente (ej.: `authMiddleware.js`).

### 10. Buenas Prácticas para la API

- Al crear nuevas rutas, asegúrate de que el método y la URL sean descriptivos de la acción (ej.: `/users` para una solicitud POST que crea un usuario, `/users/:id` para GET que recupera un usuario).
- Para acciones de eliminación y actualización, la ruta debe usar el ID específico del recurso (ej.: DELETE `/user/:id`, PUT `/user/:id`).
- Evita usar parámetros de consulta para IDs a menos que sea necesario; en su lugar, usa parámetros de ruta.

```

```
