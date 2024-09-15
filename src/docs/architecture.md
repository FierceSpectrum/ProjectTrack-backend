## Arquitectura general:

### 1. Arquitectura REST para la API:

La arquitectura REST (Representational State Transfer) es un estilo de arquitectura de software que se basa en los estándares de HTTP y define cómo las aplicaciones cliente-servidor deben interactuar. Los puntos principales son:

- **Endpoints REST**: En una API REST, las operaciones principales (CRUD: Crear, Leer, Actualizar, Eliminar) se realizan a través de endpoints que responden a verbos HTTP:

  - `GET` para leer datos.
  - `POST` para crear nuevos recursos.
  - `PUT` o `PATCH` para actualizar recursos.
  - `DELETE` para eliminar recursos.
    Por ejemplo:

  - `POST /api/organizaciones` -> Crea una nueva organización.
  - `GET /api/proyectos` -> Obtiene una lista de proyectos.
  - `PATCH /api/tareas/:id` -> Actualiza una tarea existente.

- **Stateless**: Las solicitudes al servidor son independientes. Cada solicitud contiene toda la información necesaria, y el servidor no retiene el estado entre ellas.

- **Formato de datos**: Las APIs REST suelen usar JSON para intercambiar datos, lo cual es ideal para aplicaciones web modernas.

### 2. Relación entre Backend (Node.js, Express) y Frontend (React):

La relación entre el backend y el frontend se basa en una arquitectura cliente-servidor desacoplada.

- **Frontend (React)**: React se encarga de la interacción con el usuario. La interfaz de usuario (UI) realiza solicitudes HTTP a la API REST del backend para obtener y enviar datos.

Ejemplo:

    - El usuario interactúa con un formulario de React para crear una tarea.
    - React realiza una solicitud POST a `http://api.proyecto.com/tareas` para enviar la tarea al backend.

- **Backend (Node.js, Express)**: Node.js maneja las solicitudes del frontend, procesa la lógica del servidor y gestiona la base de datos. Express define los endpoints REST para que el frontend interactúe con ellos.

El backend procesa las solicitudes, valida los datos, se comunica con la base de datos (PostgreSQL) y devuelve una respuesta JSON al frontend.

### 3. Uso de PostgreSQL para la base de datos:

PostgreSQL es una base de datos relacional que almacena los datos estructurados del sistema. En esta aplicación:

- **Relaciones**: PostgreSQL permite definir relaciones entre tablas (e.g., relaciones uno-a-muchos, muchos-a-muchos) mediante claves foráneas.

- **Consultas**: Node.js (a través de ORM como Sequelize o Knex.js) interactúa con PostgreSQL para realizar consultas. Cada consulta es ejecutada en un formato SQL y los resultados son retornados en formato JSON para ser enviados al frontend.

Ejemplo de interacción:

- El usuario solicita información sobre un proyecto desde el frontend.
- El backend usa Sequelize para consultar la tabla de `Proyectos` en PostgreSQL y devuelve los datos solicitados.

## Estructura de la Base de Datos:

A continuación, una descripción de las tablas principales y las relaciones entre ellas:

### Tablas Principales:

1. **Usuarios**:

- Almacena los datos personales y credenciales de cada usuario.
- **Relaciones**:
  - Un usuario puede pertenecer a varias organizaciones.
  - Un usuario puede tener múltiples roles.

2. **Organizaciones**:

- Representa las organizaciones creadas por los usuarios.
- **Relaciones**:
  - Una organización puede tener varios proyectos.
  - Una organización tiene muchos participantes (usuarios).

3. **Proyectos**:

- Almacena la información sobre los proyectos dentro de una organización.
- **Relaciones**:
  - Un proyecto pertenece a una organización.
  - Un proyecto tiene varias tareas asociadas.

4. **Tareas**:

- Almacena las tareas relacionadas con un proyecto.
- **Relaciones**:
  - Cada tarea pertenece a un proyecto.
  - Cada tarea puede ser asignada a un participante (usuario).

5. **Participantes**:

- Esta tabla representa la relación entre usuarios y organizaciones o proyectos.
- **Relaciones**:
  - Un participante pertenece a una organización.
  - Un participante puede tener uno o más roles dentro de un proyecto u organización.

6. **Roles**:

- Define los roles que los usuarios pueden desempeñar (e.g., Administrador, Miembro).
- **Relaciones**:
  - Un rol se asigna a un usuario dentro de una organización o proyecto.

7. **Permisos**:

- Define qué acciones puede realizar cada rol dentro del sistema.

8. **Asignaciones (Assignments)**:

- Relaciona las tareas con los participantes y roles, definiendo quién es responsable de cada tarea.

### Relaciones entre tablas:

- **Usuarios** y **Organizaciones**:
  Relación de muchos-a-muchos (un usuario puede pertenecer a varias organizaciones y una organización puede tener varios usuarios).
- **Organizaciones** y **Proyectos**:
  Relación de uno-a-muchos (una organización puede tener varios proyectos).
- **Proyectos** y **Tareas**:
  Relación de uno-a-muchos (un proyecto tiene varias tareas).
- **Tareas** y **Participantes**:
  Relación de muchos-a-uno (una tarea puede ser asignada a un participante).
- **Roles** y **Permisos**:
  Relación de muchos-a-muchos (un rol puede tener varios permisos, y un permiso puede aplicarse a varios roles).

## Diagramas:

### 1. Diagrama Entidad-Relación (ERD):

Este diagrama muestra las tablas de la base de datos y cómo se relacionan entre sí. Un ERD para este sistema incluiría entidades como `Usuarios`, `Organizaciones`, `Proyectos`, `Tareas`, `Participantes`, `Roles`, `Permisos`, y las relaciones mencionadas arriba.

### 2. Diagrama de Clases:

Un diagrama de clases representaría los objetos del sistema, como `Usuario`, `Organización`, `Proyecto`, y `Tarea`, junto con sus atributos y métodos. Este diagrama se usa para modelar la estructura de código orientado a objetos.

### 3. Diagrama de Secuencia:

Un diagrama de secuencia muestra la interacción entre el frontend y el backend a lo largo del tiempo. Por ejemplo:

- Usuario realiza login desde React.
- Solicitud HTTP a la API de Express.
- Verificación en la base de datos (PostgreSQL).
- Respuesta al frontend con un JWT.
