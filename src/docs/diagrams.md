# Diagramas

Este documento contiene los siguientes diagramas: **Diagrama de Caso de Uso**, **Diagrama de Flujo**, y **Diagrama de Estado**, los cuales describen diferentes aspectos del funcionamiento de la aplicación.

### Diagrama de Caso de Uso

El **diagrama de caso de uso** muestra cómo interactúan los usuarios con el sistema. Aquí se detallan las funcionalidades principales como:

- **Crear una organización:** Al registrarse, el usuario crea automáticamente una organización. Luego, desde la sección de organizaciones, puede crear más organizaciones manualmente.
- **Asignar roles y permisos:** Desde la configuración de la organización, el administrador puede crear y editar roles y permisos, asignando responsabilidades a otros miembros.
- **Crear proyectos y asignar tareas:** Dentro de una organización, el usuario puede crear proyectos desde el menú de proyectos y asignar tareas a los miembros.
- **Invitar usuarios:** El administrador puede invitar miembros a la organización a través de correo electrónico o mediante un enlace de invitación.

### Diagrama de Flujo

El **diagrama de flujo** describe el proceso general de la aplicación desde el registro hasta la asignación de tareas:

- **Registro:** El usuario ingresa sus datos y recibe un correo para confirmar su cuenta.
- **Confirmación de correo:** Al confirmar su correo, se crea automáticamente una organización con el usuario como administrador.
- **Login:** El usuario inicia sesión, el sistema verifica sus credenciales y genera un token de autenticación.
- **Creación de Proyectos:** Dentro de la organización, el usuario crea proyectos y define los datos relevantes.
- **Asignación de tareas:** El usuario asigna tareas a los participantes del proyecto y gestiona el progreso.
- **Invitación de Miembros:** El administrador puede agregar nuevos miembros a la organización.

### Diagrama de Estado

El **diagrama de estado** describe cómo cambian los estados de las tareas:

- **Por Hacer:** Tarea pendiente de comenzar.
- **En Progreso:** La tarea ha sido asignada y está siendo trabajada.
- **Completada:** La tarea ha sido completada por el encargado.
- **Confirmada:** La tarea ha sido revisada y confirmada como completada por el gestor del proyecto.
