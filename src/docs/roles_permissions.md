# Roles y Permisos: Organizaciones y Proyectos

Este documento explica la estructura de roles y permisos dentro de la organización y los proyectos. Se detalla cómo los miembros de una organización pueden gestionar la organización y los proyectos asociados, así como los permisos que se asignan a los participantes dentro de los proyectos.

## 1. Roles en la Organización

Los roles dentro de la organización definen qué acciones puede realizar un miembro dentro del contexto de la organización. Los miembros son usuarios asociados a una organización y sus roles determinan las capacidades sobre la organización, los demás miembros y los proyectos que gestionan. Los roles incluyen permisos de CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar aspectos clave de la organización.

### Roles comunes en la organización:

1. Administrador:

- Puede gestionar la organización en su totalidad, incluyendo la creación, edición o eliminación de proyectos.
- Tiene permisos CRUD sobre los miembros, roles, y puede crear o asignar roles a otros miembros.
  Puede modificar las propiedades de la organización, como el nombre y la descripción.
- Visualiza todos los proyectos y puede crear nuevos.

2. Gestor de Proyectos:

- Tiene permisos limitados para gestionar proyectos, pero no puede modificar la organización en sí.
- Puede crear y eliminar proyectos, así como ver todos los proyectos existentes en la organización.

3. Moderador:

- Puede gestionar roles y miembros dentro de la organización.
- Tiene permisos de lectura sobre todos los proyectos, pero no puede crear o eliminar proyectos.
- Administra los roles asignados a otros miembros.

### Permisos en la organización:

Los permisos dentro de la organización se centran en las siguientes áreas:

- CRUD de organización: Crear, leer, actualizar, y eliminar la organización (solo disponible para el Administrador).
- CRUD de miembros: Gestionar los miembros de la organización (agregar, eliminar, modificar roles).
- CRUD de roles: Crear, leer, modificar y eliminar roles.
- Gestión de proyectos: Crear y visualizar proyectos (para los que tienen permisos de "creación").

## 2. Roles en los Proyectos

Los roles de los proyectos son asignados a participantes, que son usuarios que participan en un proyecto específico dentro de la organización. Los roles de un participante determinan lo que pueden hacer dentro del proyecto.

### Roles comunes en los proyectos:

1. Jefe de Proyecto:

- Tiene control total sobre el proyecto.
- Puede editar o eliminar el proyecto, cambiar su nombre y gestionar tareas y participantes.
- Puede crear y asignar nuevas tareas, y modificar los estados de las mismas.
- Administra otros participantes, pudiendo añadir o eliminar personas al proyecto.

2. Desarrollador:

- Puede ver y modificar tareas asignadas a él mismo.
  No tiene permisos para modificar participantes ni el proyecto en general.
- Puede cambiar los estados de las tareas.

3. Tester:

- Tiene permisos para cambiar el estado de las tareas relacionadas con pruebas.
- Puede ver y actualizar las tareas asignadas.
- No puede gestionar participantes ni modificar las propiedades del proyecto.

### Permisos en los proyectos:

Los permisos dentro del contexto del proyecto son más específicos y se enfocan en las operaciones de CRUD sobre los componentes del proyecto:

- CRUD de tareas: Crear, leer, actualizar y eliminar tareas.
- CRUD de participantes: Administrar los participantes del proyecto (agregar o remover usuarios del proyecto).
- CRUD de estados: Modificar los estados de las tareas, como "en progreso", "completado", etc.
- Modificar el proyecto: Cambiar el nombre o detalles generales del proyecto.

## 3. Diferencia entre Miembros y Participantes

### Miembros:

Los miembros están asociados con la organización. Los roles asignados a los miembros controlan las capacidades que tienen dentro de la organización y sobre los proyectos en general, como la creación o eliminación de proyectos, y la gestión de otros miembros.

### Participantes:

Los participantes están asociados con proyectos individuales dentro de la organización. Los roles de los participantes determinan lo que pueden hacer dentro de un proyecto específico, como la creación de tareas, gestión de otros participantes, o actualización del proyecto.

La separación entre miembros y participantes permite que un usuario pueda estar en varios proyectos a la vez, con distintos roles en cada uno. Por ejemplo, un usuario podría ser Administrador de la organización, pero ser Desarrollador en un proyecto y Tester en otro.

## 4. Asignación de Permisos:

La asignación de roles y permisos se realiza mediante las siguientes tablas:

### Tabla de Roles (Roles)

- Contiene los roles que se pueden asignar a los miembros de la organización o a los participantes de los proyectos.

### Tabla de Permisos (Permissions)

- Define las acciones que un rol puede realizar, tanto dentro de la organización como dentro de los proyectos.

### Tabla de Asignaciones (Assignments)

- Relaciona a los participantes con un proyecto y sus roles específicos. Esta tabla es fundamental para saber qué acciones puede realizar un participante dentro de un proyecto.
