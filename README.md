# ProjectTrack

## Descripción del proyecto

**ProjectTrack** es una aplicación web diseñada para la gestión integral de proyectos, con un enfoque inicial en el desarrollo de software. La plataforma permite a las empresas y equipos de desarrollo organizar proyectos, gestionar tareas y almacenar documentación de forma eficiente. Los usuarios pueden registrar y monitorear el progreso de los proyectos en tiempo real, asignar roles dentro de organizaciones y vincular documentos, como archivos de código fuente y otros recursos esenciales para el desarrollo de software.

## Objetivo del proyecto

El objetivo principal de **ProjectTrack** es ofrecer una solución robusta y escalable para centralizar la gestión de proyectos, optimizando el flujo de trabajo y facilitando el acceso a la información clave. Está diseñada para ser una herramienta esencial para equipos de desarrollo de software, proporcionando funcionalidades como la organización de tareas, gestión de múltiples proyectos y asignación de roles y permisos.

## Tecnologías utilizadas

### Frontend

- React: Framework JavaScript para construir interfaces interactivas y eficientes.
  Sass: Preprocesador CSS que facilita la escritura de hojas de estilo modulares y reutilizables.
- Tailwind CSS: Framework de utilidades para acelerar el desarrollo de interfaces de usuario con estilos predefinidos y personalizables.

### Backend

- Node.js con Express: Servidor backend basado en JavaScript con Express para gestionar rutas y APIs.
- Sequelize: ORM para interactuar con la base de datos PostgreSQL, facilitando la manipulación de modelos y sus relaciones.

### Base de datos

- PostgreSQL: Base de datos relacional para almacenar datos estructurados como usuarios, proyectos, tareas y autenticaciones.

### Autenticación

- OAuth 2.0: Protocolo utilizado para la autenticación segura a través de APIs externas como Twitter, Mastodon y Reddit.
- JWT (JSON Web Tokens): Utilizado para gestionar la autenticación de usuarios y sesiones de forma segura y escalable.

## Estructura de carpetas

### Frontend

```bash
/src
  ├── /assets         # Recursos como imágenes y fuentes.
  ├── /components     # Estructura de componentes.
  │    └── /ComponentName
  │        ├── ComponentName.js  # Lógica del componente.
  │        └── ComponentName.scss  # Estilos del componente.
  ├── /languages      # Archivos JSON para la gestión de múltiples idiomas.
  ├── /styles         # Estilos generales de la aplicación.
  │    ├── /themes    # Temas personalizados (oscuro, claro, etc.).
  │    ├── /utils     # Funciones de utilidad y mixins.
  │    ├── _variables.scss  # Variables globales de estilos.
  │    └── main.scss  # Archivo principal que importa los demás estilos.
```

### Backend

```bash
/src
  ├── /models         # Modelos de datos para interactuar con la base de datos.
  ├── /controllers    # Controladores que gestionan la lógica de negocio.
  ├── /routes         # Definición de rutas y su integración en el sistema.
  ├── /middlewares    # Funciones intermedias para autenticación y validaciones.
  ├── /services       # Servicios que encapsulan la lógica compartida.
  ├── /utils          # Funciones de utilidad para reutilización.
  ├── /config         # Configuración del servidor, base de datos y entorno.
  ├── /docs           # Documentación técnica del proyecto en formato markdown.
  └── /tasks          # Definición de tareas y cron jobs.
```

## Instrucciones para ejecutar el proyecto

### BackEnd

Clonar el repositorio:

```bash
git clone https://github.com/usuario/projecttrack-backend.git
```

Instalar dependencias:

```bash
npm install
```

Iniciar el servidor:

```bash
npm start
```

### FrontEnd

Clonar el repositorio:

```bash
git clone https://github.com/usuario/projecttrack-frontend.git
```

Instalar dependencias:

```bash
npm install
```

Iniciar la aplicación:

```bash
npm start
```

## Contribuciones

Las contribuciones son bienvenidas. Puedes contribuir de las siguientes maneras:

- Proporcionar ideas o sugerencias.
- Crear pull requests con mejoras o nuevas características.
- Dar feedback constructivo para mejorar el proyecto.
