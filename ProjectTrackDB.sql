-- Active: 1726437336953@@127.0.0.1@5432@ProjectTrack

DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;
DROP TABLE IF EXISTS states CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS organizations CASCADE;
DROP TABLE IF EXISTS members CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS participants CASCADE;
DROP TABLE IF EXISTS tasks CASCADE;

CREATE TABLE permissions(
    id SERIAL NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_permission varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles(
    id SERIAL NOT NULL,
    permissions_id integer[] NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_role varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE assignments(
    id SERIAL NOT NULL,
    permissions_id integer[] NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_assignment varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE states(
    id SERIAL NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_state varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id SERIAL NOT NULL,
    name varchar(100) NOT NULL,
    "last_Name" varchar(100) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    "user_Name" varchar(255) NOT NULL,
    state_user varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE organizations(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_organization varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT organizations_user_id_fkey FOREIGN key(user_id) REFERENCES users(id)
);

CREATE TABLE members(
    id SERIAL NOT NULL,
    organization_id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    state_member varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT members_organization_id_fkey FOREIGN key(organization_id) REFERENCES organizations(id),
    CONSTRAINT members_user_id_fkey FOREIGN key(user_id) REFERENCES users(id),
    CONSTRAINT members_role_id_fkey FOREIGN key(role_id) REFERENCES roles(id)
);

CREATE TABLE projects(
    id SERIAL NOT NULL,
    organization_id integer NOT NULL,
    state_id integer NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    repository_link varchar(255) NOT NULL,
    state_project varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT projects_organization_id_fkey FOREIGN key(organization_id) REFERENCES organizations(id),
    CONSTRAINT projects_state_id_fkey FOREIGN key(state_id) REFERENCES states(id)
);

CREATE TABLE participants(
    id SERIAL NOT NULL,
    project_id integer NOT NULL,
    member_id integer NOT NULL,
    assignments_id integer[] NOT NULL,
    state_participant varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT participants_project_id_fkey FOREIGN key(project_id) REFERENCES projects(id),
    CONSTRAINT participants_member_id_fkey FOREIGN key(member_id) REFERENCES members(id)
);

CREATE TABLE tasks(
    id SERIAL NOT NULL,
    project_id integer NOT NULL,
    participant_id integer NOT NULL,
    state_id integer NOT NULL,
    assignment_id integer NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone NOT NULL,
    state_task varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT tasks_project_id_fkey FOREIGN key(project_id) REFERENCES projects(id),
    CONSTRAINT tasks_participant_id_fkey FOREIGN key(participant_id) REFERENCES participants(id),
    CONSTRAINT tasks_state_id_fkey FOREIGN key(state_id) REFERENCES states(id),
    CONSTRAINT tasks_assignment_id_fkey FOREIGN key(assignment_id) REFERENCES assignments(id)
);


insert into permissions (name, description, state_permission, "createdAt", "updatedAt") VALUES
('Create_Users', 'Permiso para crear usuarios', 'Create', now(), now()),
('Read_Users', 'Permiso para leer usuarios', 'Create', now(), now()),
('Update_Users', 'Permiso para actualizar usuarios', 'Create', now(), now()),
('Delete_Users', 'Permiso para eliminar usuarios', 'Create', now(), now()),
('Create_Organizations', 'Permiso para crear organizaciones', 'Create', now(), now()),
('Read_Organizations', 'Permiso para leer organizaciones', 'Create', now(), now()),
('Update_Organizations', 'Permiso para actualizar organizaciones', 'Create', now(), now()),
('Delete_Organizations', 'Permiso para eliminar organizaciones', 'Create', now(), now()),
('Create_Projects', 'Permiso para crear proyectos', 'Create', now(), now()),
('Read_Projects', 'Permiso para leer proyectos', 'Create', now(), now()),
('Update_Projects', 'Permiso para actualizar proyectos', 'Create', now(), now()),
('Delete_Projects', 'Permiso para eliminar proyectos', 'Create', now(), now()),
('Create_Members', 'Permiso para agregar miembros', 'Create', now(), now()),
('Read_Members', 'Permiso para leer miembros', 'Create', now(), now()),
('Update_Members', 'Permiso para actualizar miembros', 'Create', now(), now()),
('Delete_Members', 'Permiso para eliminar miembros', 'Create', now(), now()),
('Create_Participants', 'Permiso para agregar participantes', 'Create', now(), now()),
('Read_Participants', 'Permiso para leer participantes', 'Create', now(), now()),
('Update_Participants', 'Permiso para actualizar participantes', 'Create', now(), now()),
('Delete_Participants', 'Permiso para eliminar participantes', 'Create', now(), now()),
('Create_Roles', 'Permiso para crear roles', 'Create', now(), now()),
('Read_Roles', 'Permiso para leer roles', 'Create', now(), now()),
('Update_Roles', 'Permiso para actualizar roles', 'Create', now(), now()),
('Delete_Roles', 'Permiso para eliminar roles', 'Create', now(), now()),
('Create_Permissions', 'Permiso para crear permisos', 'Create', now(), now()),
('Read_Permissions', 'Permiso para leer permisos', 'Create', now(), now()),
('Update_Permissions', 'Permiso para actualizar permisos', 'Create', now(), now()),
('Delete_Permissions', 'Permiso para eliminar permisos', 'Create', now(), now()),
('Create_Assignments', 'Permiso para crear asignaciones', 'Create', now(), now()),
('Read_Assignments', 'Permiso para leer asignaciones', 'Create', now(), now()),
('Update_Assignments', 'Permiso para actualizar asignaciones', 'Create', now(), now()),
('Delete_Assignments', 'Permiso para eliminar asignaciones', 'Create', now(), now()),
('Create_Tasks', 'Permiso para crear tareas', 'Create', now(), now()),
('Read_Tasks', 'Permiso para leer tareas', 'Create', now(), now()),
('Update_Tasks', 'Permiso para actualizar tareas', 'Create', now(), now()),
('Delete_Tasks', 'Permiso para eliminar tareas', 'Create', now(), now()),
('Create_States', 'Permiso para crear estados', 'Create', now(), now()),
('Read_States', 'Permiso para leer estados', 'Create', now(), now()),
('Update_States', 'Permiso para actualizar estados', 'Create', now(), now()),
('Delete_States', 'Permiso para eliminar estados', 'Create', now(), now());

insert into roles (permissions_id, name, description, state_role, "createdAt", "updatedAt") VALUES
('{6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,29,30,31,32,33,34,35,36,37,38,39,40}', 'Admin', 'Administrador con permisos completos para gestionar la organización y los proyectos', 'Create', now(), now()),
('{6,14}', 'Member', 'Miembro que solo puede ver la organización y los proyectos asignados, sin permisos de edición o creación', 'Create', now(), now()),
('{6,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,29,30,31,32,33,34,35,36,37,38,39,40}', 'Moderator', 'Moderador que puede gestionar proyectos y asignaciones, pero sin control sobre la organización o los roles de administradores', 'Create', now(), now());

insert into assignments (permissions_id, name, description, state_assignment, "createdAt", "updatedAt") VALUES
('{7,8,9,10,11,12,17,18,19,20,29,30,31,32,33,34,35,36,37,38,39,40}', 'ProjectManager', 'Administrador de projecto con permisos completos para gestionar el proyecto', 'Create', now(), now()),
('{10,18,34,35,38}', 'Collaborator', 'Colaborador solo puede ver el proyecto, ademas de poder partisipar en las tareas', 'Create', now(), now()),
('{10,18,34,38}', 'Spectator', 'Espectador solo puede ver el projecto nada mas', 'Create',	now(), now());

insert into states (name, description, state_state, "createdAt", "updatedAt") VALUES
('Pendiente', 'El proyecto o tarea está pendiente de inicio', 'Create', now(), now()),
('Activo', 'El proyecto o tarea está en curso', 'Create', now(), now()),
('En', 'Pausa El proyecto o tarea está pausado temporalmente', 'Create', now(), now()),
('Finalizado', 'El proyecto o tarea ha sido completado satisfactoriamente', 'Create', now(), now()),
('Cancelado', 'El proyecto o tarea ha sido cancelado', 'Create', now(), now()),
('Eliminado', 'El proyecto o tarea ha sido eliminado permanentemente', 'Create', now(), now()),
('Revisión', 'El proyecto o tarea está bajo revisión o en espera de aprobación', 'Create', now(), now()),
('Atrasado', 'El proyecto o tarea ha excedido su plazo estimado', 'Create', now(), now());

insert into users (name, "last_Name", email, password, "user_Name", state_user, "createdAt", "updatedAt") VALUES
('Benjamín', 'Sandí', 'benjaminsandi@hotmail.com', '123', 'benja', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum1@gmail.com', '$2a$10$n/xqPLRkzL5MKv66YlLBZO.7ci1Re3wV5wYJpFYToBmzQreWJlYCC', '1', 'Delete', now(), now()),
('Roney', 'Valdelomar', 'roneyvaldelomar@gmail.com', '321', 'rony', 'Create', now(), now()),
('Jose', 'Ramirez', 'JoseRamirez@gmail.com', '54321', 'JoseR', 'Create', now(), now()),
('Maria', 'Palma', 'MariPal@gmail.com', 'palmi', 'Marma', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum3@gmail.com', '$2a$10$ELbkkAksCfswmqdyQ0QDXePmK/dBJ4e2yMlJOQ7smRi1IIyCWpgkC', 'fiercespectrum', 'Delete', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$QAUlmhS172tGjt3Yj40Nlu0qNoktP6sP3M7qf8Duq8Km/OtgAzTjG', 'fierce', 'Delete', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$qBs1f1NzwlrK6.HJQBaBOOn3AkwDsVBwia94yWMkdKAzcQcj7KJiK', 'fierce', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$W8zcKh3epyleH7sziHM0FetHBuUjTLARww5hOuBK5NFIcoQaTSSna', 'fierce', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$8ilunQL5nVuj0pCZajZN8ePfgGOOH.wJyiP1ruG4aNvexd05QSNqu', 'fierce', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$ysptM7hOsl8nZDduUNkLcumZbY/Hhn8rxt26pif7FHTToE15kawMG', 'fierce', 'Create', now(), now()),
('Fierce', 'Spectrum', 'fiercespectrum@gmail.com', '$2a$10$TtJJwi9v8avfb3jX2XN7uebZoGsCXxyo9kgmp4WGGCoTwBnj/x9u.', 'fiercespectrum', 'Create', now(), now());

insert into organizations (user_id, name, description, state_organization, "createdAt", "updatedAt") VALUES
(2, 'CodeMentoria', 'Una empresa que ayuda a las personas interesadas en programacion a ser buenos profecionales', 'Create', now(), now()),
(3, 'ProjectTrack', 'Una empresa que busca crear proyecto que ayuden a los demas.', 'Create', now(), now()),
(3, 'RoneyOrg', 'Organización de Roney.', 'Create', now(), now()),
(2, 'BenjamínOrg', 'Organización de Benjamín.', 'Create', now(), now()),
(4, 'JoseOrg', 'Organización de Jose.', 'Create', now(), now()),
(5, 'MariaOrg', 'Organización de Maria.', 'Create', now(), now());

insert into members (organization_id, user_id, role_id, state_member, "createdAt", "updatedAt") VALUES
(1, 2, 1, 'Create', now(), now()),
(2, 3, 1, 'Create', now(), now()),
(3, 3, 1, 'Create', now(), now()),
(4, 2, 1, 'Create', now(), now()),
(5, 4, 1, 'Create', now(), now()),
(6, 5, 1, 'Create', now(), now()),
(1, 3, 3, 'Create', now(), now()),
(2, 2, 3, 'Create', now(), now()),
(1, 5, 2, 'Create', now(), now()),
(1, 4, 2, 'Create', now(), now()),
(2, 4, 2, 'Create', now(), now()),
(2, 5, 2, 'Create', now(), now());

insert into projects (organization_id, state_id, name, description, repository_link, state_project, "createdAt", "updatedAt") VALUES
(1, 2, 'Calculadora', 'Calculadora de proposiciones matetmaticas', 'Github/CodeMentoria/calculadora.com', 'Create', now(), now()),
(2, 1, 'ProjectTrack', 'Aplicacion web para administrar proyectos', 'Github/ProjectTrack/projectTrack.com', 'Create', now(), now()),
(1, 3, 'Cursos', 'Pagina web para cursos de programacion', 'Github/CodeMentoria/cursos.com', 'Create', now(), now()),
(3, 4, 'Portafolio', 'Mi portafolio de desarrolador FullStack', 'Github/RoneyVal/portafolio.com', 'Create', now(), now()),
(5, 5, 'Calculadora', 'Calculadora de proposiciones matetmaticas', 'Github/CodeMentoria/calculadora.com', 'Create', now(), now()),
(4, 6, 'Migrador DB', 'Magrador de bases de datos', 'Github/FierceSpectrum/migrationDB.com', 'Create', now(), now());

insert into participants (project_id, member_id, assignments_id, state_participant, "createdAt", "updatedAt") VALUES
(1, 1, '{1}', 'Create', now(), now()),
(1, 7, '{2}', 'Create', now(), now()),
(1, 9, '{3}', 'Create', now(), now()),
(2, 2, '{1}', 'Create', now(), now()),
(2, 8, '{1}', 'Create', now(), now()),
(2, 11, '{2}', 'Create', now(), now()),
(4, 3, '{1}', 'Create', now(), now()),
(3, 1, '{1}', 'Create', now(), now()),
(5, 5, '{1}', 'Create', now(), now()),
(6, 4, '{1}', 'Create', now(), now()),
(4, 1, '{1}', 'Create', now(), now()),
(3, 10, '{3}', 'Create', now(), now()),
(2, 12, '{3,2}', 'Create', now(), now());

insert into tasks (project_id, participant_id, state_id, assignment_id, name, description, start_date, end_date, state_task, "createdAt", "updatedAt") VALUES
(1, 1, 1, 1, 'Web', 'Realizar una pagina web', now(), now(), 'Create', now(), now()),
(1, 2, 1, 2, 'Api Rest', 'Realizar una Api Rest', now(), now(), 'Create', now(), now()),
(2, 4, 7, 1, 'Data Base', 'Realizar la base de datos', now(), now(), 'Create', now(), now()),
(3, 8, 4, 1, 'Curso', 'Realizar una curso de html', now(), now(), 'Create', now(), now());

