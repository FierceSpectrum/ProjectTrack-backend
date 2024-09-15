# Requerimientos Funcionales

## Manejo de Usuarios:

El sistema debe permitir el registro de usuarios a través de un formulario que capture información esencial como nombre, correo electrónico y contraseña.
Debe habilitar el inicio de sesión para usuarios con credenciales válidas (correo electrónico y contraseña).
Implementar un sistema de autenticación de doble factor (2FA) utilizando Google Authenticator, que los usuarios puedan activar o desactivar desde su perfil.
Al iniciar sesión por primera vez, el sistema debe crear automáticamente una organización para el usuario, asignándole el rol de administrador.

## Gestión de Organizaciones:

El sistema debe permitir la creación de organizaciones. Un usuario podrá gestionar múltiples organizaciones.
Cada organización debe permitir la creación, edición y eliminación de proyectos asociados.
Implementar una gestión de roles dentro de la organización, que incluya los siguientes: administrador, moderador y miembro. El administrador podrá asignar y gestionar estos roles.

## Gestión de Proyectos:

Los proyectos deben estar vinculados a una organización específica.
El sistema debe ofrecer funcionalidades para crear, editar y eliminar proyectos dentro de una organización.
Los proyectos deben permitir la inclusión de documentos relacionados, como archivos PDF, reportes técnicos, y enlaces a repositorios de código (GitHub, GitLab, etc.).
Implementar un sistema de visualización del estado del proyecto (e.g., en progreso, finalizado, pendiente).

## Roles y Permisos en Proyectos:

Dentro de los proyectos, deben gestionarse roles específicos como gestor de proyectos, desarrollador, QA, tester, entre otros.
Los roles asignados en los proyectos deben ser independientes de los roles a nivel organizacional.
El sistema debe permitir la asignación de tareas y responsabilidades a los usuarios en función del rol que desempeñan dentro de un proyecto.

## Gestión de Tareas:

Cada tarea debe estar asociada a un proyecto específico.
Debe ser posible crear, editar, eliminar y visualizar tareas dentro de un proyecto.
Las tareas deben tener un estado definido (e.g., pendiente, en progreso, completada).
Debe existir una asignación clara de responsables para cada tarea, y un historial de cambios en los estados de las tareas para el seguimiento del progreso.

## Gestión de Participantes:

El sistema debe permitir agregar, editar y eliminar participantes dentro de las organizaciones y proyectos.
Los usuarios deben poder invitar a otros a unirse a una organización o proyecto específico mediante una invitación.
La asignación de roles para cada participante debe ser gestionada tanto a nivel de organización como de proyecto.

## Documentación de Proyectos:

El sistema debe permitir la subida y gestión de documentación en formatos digitales como PDF, Word, entre otros.
Cada proyecto debe incluir un apartado para agregar una descripción general y un resumen del progreso actual.
Se debe permitir la gestión de documentación técnica y enlaces a repositorios externos desde un espacio dedicado dentro del proyecto.

## Notificaciones:

El sistema debe notificar a los usuarios sobre eventos importantes, como la asignación de tareas, cambios en el estado de un proyecto, o la incorporación de nuevos participantes en proyectos y organizaciones.
Las notificaciones deben ser visibles desde la interfaz de usuario y enviadas por correo electrónico si el usuario lo tiene configurado.

# Requerimientos No Funcionales

## Interfaces de Usuario:

- La interfaz debe ser responsiva, accesible desde navegadores de escritorio y dispositivos móviles, asegurando una experiencia de usuario óptima en ambos entornos.
- La usabilidad debe ser una prioridad, proporcionando una navegación intuitiva y clara entre organizaciones, proyectos y tareas, con un diseño simple pero funcional.
- Se debe permitir a los usuarios personalizar su experiencia en términos de visualización, por ejemplo, cambiando entre modos de visualización oscuro y claro.

## Interfaces de Hardware:

- El sistema debe ser accesible desde cualquier dispositivo que cuente con un navegador web moderno compatible con los estándares actuales.
- La ejecución de la aplicación en el frontend debe ser eficiente, de modo que funcione sin problemas incluso en dispositivos con capacidades de procesamiento limitadas.

## Interfaces de Software:

- El sistema debe contar con una API RESTful bien documentada que permita la integración con otras plataformas, como sistemas de gestión de proyectos externos o aplicaciones colaborativas.
- La API debe cumplir con los estándares de seguridad, utilizando OAuth 2.0 para la autenticación de usuarios externos y terceros.
- Integración con repositorios de código, como GitHub o GitLab, para la gestión de repositorios y tareas vinculadas a estos servicios.

## Rendimiento y Escalabilidad:

- La plataforma debe ser escalable, capaz de soportar múltiples organizaciones, proyectos y usuarios simultáneos sin comprometer el rendimiento.
- El tiempo de respuesta para operaciones críticas, como inicio de sesión, creación de proyectos y carga de tareas, no debe exceder los 3 segundos.
- Se debe implementar un sistema de caché adecuado para optimizar la carga de datos repetitivos y mejorar la experiencia del usuario.

## Seguridad:

- Implementar autenticación segura utilizando JWT (JSON Web Tokens) para la protección de las sesiones de los usuarios.
- Los datos sensibles, como contraseñas y tokens de autenticación, deben ser cifrados tanto en tránsito como en reposo.
- El sistema debe cumplir con las normativas de protección de datos (e.g., GDPR) para asegurar la privacidad de la información de los usuarios.

## Mantenibilidad y Actualizaciones:

- El código debe estar estructurado de manera modular, siguiendo las mejores prácticas de desarrollo para facilitar su mantenibilidad y escalabilidad.
- Se deben implementar mecanismos para realizar actualizaciones sin afectar el rendimiento ni la disponibilidad del sistema.
  E+ l sistema debe permitir la integración de nuevas funcionalidades mediante un enfoque de microservicios o similar, asegurando que los cambios no impacten otras áreas del sistema.

## Disponibilidad y Confiabilidad:

- El sistema debe garantizar una disponibilidad mínima del 99.9%, utilizando técnicas de redundancia y recuperación ante fallos para asegurar el servicio.
- Deben implementarse backups automáticos para proteger contra la pérdida de datos en caso de caídas del sistema.

## Compatibilidad:

- El sistema debe ser compatible con bases de datos SQL, preferiblemente PostgreSQL, y debe estar diseñado para ser compatible con plataformas de hosting en la nube.
- El frontend debe funcionar correctamente en las versiones más recientes de los principales navegadores, como Chrome, Firefox, Safari y Edge.
