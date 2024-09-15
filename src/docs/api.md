# API REST y GraphQL

## Descripción General

### API REST

La API REST maneja las solicitudes a la base de datos y permite gestionar entidades como usuarios, organizaciones, miembros, proyectos, estados, tareas, asignaciones, roles, permisos y participantes. Los métodos principales para estas entidades son CRUD (Create, Read, Update, Delete), con dos tipos de operaciones de lectura: una que devuelve todos los registros y otra que devuelve un único registro por ID.

### API GraphQL

La API GraphQL será implementada en el futuro y permitirá solicitudes más flexibles, donde los clientes pueden especificar exactamente los datos que necesitan. Los modelos de GraphQL estarán basados en las mismas entidades que la API REST, pero permitirá consultas complejas, como filtrado avanzado y relaciones entre entidades, sin necesidad de múltiples llamadas como en REST.

## Estructura de Endpoints

Cada entidad (usuarios, organizaciones, proyectos, etc.) tiene su propio conjunto de endpoints. Los endpoints siguen una estructura RESTful, con diferentes métodos HTTP (GET, POST, PATCH, PUT, DELETE) que manejan las operaciones correspondientes.

### Usuarios

**Endpoints**

- **GET** `/api/users`: Retorna todos los usuarios.
- **GET** `/api/users/{id}`: Retorna un usuario específico por ID.
- **POST** `/api/users`: Crea un nuevo usuario.
- **PATCH** `/api/users/{id}`: Actualiza parcialmente un usuario específico.
- **PUT** `/api/users/{id}`: Actualiza un usuario específico.
- **DELETE** `/api/users/{id}`: Elimina un usuario específico.

**Parámetros de entrada (Body)**

- `first_name`: Nombre del usuario.
- `last_name`: Apellido del usuario.
- `email`: Email del usuario.
- `password`: Contraseña encriptada del usuario.
- `username`: Nombre de usuario.

**Respuesta esperada**

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "username": "johndoe"
}
```

### Organizaciones

**Endpoints**

- **GET** `/api/organizations`: Retorna todas las organizaciones.
- **GET** `/api/organizations/{id}`: Retorna una organización específica por ID.
- **POST** `/api/organizations`: Crea una nueva organización.
- **PATCH** `/api/organizations/{id}`: Actualiza parcialmente una organización específica.
- **PUT** `/api/organizations/{id}`: Actualiza una organización específica.
- **DELETE** `/api/organizations/{id}`: Elimina una organización específica.

**Parámetros de entrada (Body)**

- `name`: Nombre de la organización.
- `description`: Descripción de la organización.

**Respuesta esperada**

```json
{
  "id": 1,
  "name": "Tech Corp",
  "description": "A tech company"
}
```

### Proyectos

**Endpoints**

- **GET** /api/projects: Retorna todos los proyectos.
- **GET** /api/projects/{id}: Retorna un proyecto específico por ID.
- **POST** /api/projects: Crea un nuevo proyecto.
- **PATCH** /api/projects/{id}: Actualiza parcialmente un proyecto específico.
- **PUT** /api/projects/{id}: Actualiza un proyecto específico.
- **DELETE** /api/projects/{id}: Elimina un proyecto específico.

**Parámetros de entrada (Body)**

- name: Nombre del proyecto.
- description: Descripción del proyecto.
- organization_id: ID de la organización a la que pertenece.
- state_id: Estado del proyecto.

**Respuesta esperada**

```json
{
  "id": 1,
  "name": "Project A",
  "description": "A sample project",
  "organization_id": 1,
  "state_id": 2
}
```

### Tareas

**Endpoints**

- **GET** `/api/tasks`: Retorna todas las tareas.
- **GET** `/api/tasks/{id}`: Retorna una tarea específica por ID.
- **POST** `/api/tasks`: Crea una nueva tarea.
- **PATCH** `/api/tasks/{id}`: Actualiza parcialmente una tarea específica.
- **PUT** `/api/tasks/{id}`: Actualiza una tarea específica.
- **DELETE** `/api/tasks/{id}`: Elimina una tarea específica.

**Parámetros de entrada (Body)**

- `name`: Nombre de la tarea.
- `description`: Descripción de la tarea.
- `project_id`: ID del proyecto al que pertenece.
- `state_id`: Estado de la tarea.
- `participant_id`: ID del participante asignado.

**Respuesta esperada**

```json
{
  "id": 1,
  "name": "Task 1",
  "description": "Complete the backend",
  "project_id": 1,
  "state_id": 1,
  "participant_id": 5
}
```

### Roles

**Endpoints**

- **GET** `/api/roles`: Retorna todos los roles.
- **GET** `/api/roles/{id}`: Retorna un rol específico por ID.
- **POST** `/api/roles`: Crea un nuevo rol.
- **PATCH** `/api/roles/{id}`: Actualiza parcialmente un rol específico.
- **PUT** `/api/roles/{id}`: Actualiza un rol específico.
- **DELETE** `/api/roles/{id}`: Elimina un rol específico.

**Parámetros de entrada (Body)**

- `name`: Nombre del rol.
- `description`: Descripción del rol.

**Respuesta esperada**

```json
{
  "id": 1,
  "name": "Admin",
  "description": "Full access to the organization"
}
```

### Permisos

**Endpoints**

- **GET** `/api/permissions`: Retorna todos los permisos.
- **GET** `/api/permissions/{id}`: Retorna un permiso específico por ID.
- **POST** `/api/permissions`: Crea un nuevo permiso.
- **PATCH** `/api/permissions/{id}`: Actualiza parcialmente un permiso específico.
- **PUT** `/api/permissions/{id}`: Actualiza un permiso específico.
- **DELETE** `/api/permissions/{id}`: Elimina un permiso específico.

**Parámetros de entrada (Body)**

- `name`: Nombre del permiso.
- `description`: Descripción del permiso.

**Respuesta esperada**

```json
{
  "id": 1,
  "name": "Create Projects",
  "description": "Allows creating new projects"
}
```

## Respuesta de Errores

- **400 Bad Request:** El servidor no pudo procesar la solicitud debido a una entrada inválida.
- **404 Not Found:** No se encontró el recurso solicitado.
- **500 Internal Server Error:** Error en el servidor al procesar la solicitud.

## API GraphQL (Futura Implementación)

**Consulta Ejemplo**

```graphql
query {
  organization(id: 1) {
    name
    description
    members {
      first_name
      last_name
    }
    projects {
      name
      description
      tasks {
        name
        state {
          name
        }
      }
    }
  }
}
```

**Respuesta Ejemplo**

```json
{
  "data": {
    "organization": {
      "name": "Tech Corp",
      "description": "A tech company",
      "members": [
        {
          "first_name": "John",
          "last_name": "Doe"
        }
      ],
      "projects": [
        {
          "name": "Project A",
          "description": "A sample project",
          "tasks": [
            {
              "name": "Task 1",
              "state": {
                "name": "In Progress"
              }
            }
          ]
        }
      ]
    }
  }
}
```
