-- Active: 1726437336953@@127.0.0.1@5432@ProjectTrack

DROP TABLE IF EXISTS assignment_permissions CASCADE;
DROP TABLE IF EXISTS member_roles CASCADE;
DROP TABLE IF EXISTS organization_members CASCADE;
DROP TABLE IF EXISTS organization_projects CASCADE;
DROP TABLE IF EXISTS user_organizations CASCADE;
DROP TABLE IF EXISTS participant_assignments CASCADE;
DROP TABLE IF EXISTS role_permissions CASCADE;
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
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_role varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE assignments(
    id SERIAL NOT NULL,
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
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_organization varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE members(
    id SERIAL NOT NULL,
    user_id integer NOT NULL,
    state_member varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT members_user_id_fkey FOREIGN key(user_id) REFERENCES users(id)
);

CREATE TABLE projects(
    id SERIAL NOT NULL,
    state_id integer NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    repository_link varchar(255) NOT NULL,
    state_project varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT projects_state_id_fkey FOREIGN key(state_id) REFERENCES states(id)
);

CREATE TABLE participants(
    id SERIAL NOT NULL,
    project_id integer NOT NULL,
    member_id integer NOT NULL,
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

CREATE TABLE assignment_permissions(
    assignment_id integer NOT NULL,
    permission_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(assignment_id,permission_id),
    CONSTRAINT assignment_permissions_assignment_id_fkey FOREIGN key(assignment_id) REFERENCES assignments(id),
    CONSTRAINT assignment_permissions_permission_id_fkey FOREIGN key(permission_id) REFERENCES permissions(id)
);

CREATE TABLE member_roles(
    member_id integer NOT NULL,
    role_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(member_id,role_id),
    CONSTRAINT organization_members_member_id_fkey FOREIGN key(member_id) REFERENCES members(id),
    CONSTRAINT organization_members_role_id_fkey FOREIGN key(role_id) REFERENCES roles(id)
);

CREATE TABLE organization_members(
    organization_id integer NOT NULL,
    member_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(organization_id,member_id),
    CONSTRAINT organization_members_organization_id_fkey FOREIGN key(organization_id) REFERENCES organizations(id),
    CONSTRAINT organization_members_member_id_fkey FOREIGN key(member_id) REFERENCES members(id)
);

CREATE TABLE organization_projects(
    organization_id integer NOT NULL,
    project_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(organization_id,project_id),
    CONSTRAINT organization_projects_organization_id_fkey FOREIGN key(organization_id) REFERENCES organizations(id),
    CONSTRAINT organization_projects_project_id_fkey FOREIGN key(project_id) REFERENCES projects(id)
);

CREATE TABLE user_organizations(
    user_id integer NOT NULL,
    organization_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(organization_id,user_id),
    CONSTRAINT user_organizations_organization_id_fkey FOREIGN key(organization_id) REFERENCES organizations(id),
    CONSTRAINT user_organizations_user_id_fkey FOREIGN key(user_id) REFERENCES users(id)
);

CREATE TABLE participant_assignments(
    participant_id integer NOT NULL,
    assignment_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(participant_id,assignment_id),
    CONSTRAINT participant_assignments_participant_id_fkey FOREIGN key(participant_id) REFERENCES participants(id),
    CONSTRAINT participant_assignments_assignment_id_fkey FOREIGN key(assignment_id) REFERENCES assignments(id)
);

CREATE TABLE role_permissions(
    role_id integer NOT NULL,
    permission_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(role_id,permission_id),
    CONSTRAINT role_permissions_role_id_fkey FOREIGN key(role_id) REFERENCES roles(id),
    CONSTRAINT role_permissions_permission_id_fkey FOREIGN key(permission_id) REFERENCES permissions(id)
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

insert into roles (name, description, state_role, "createdAt", "updatedAt") VALUES
('Admin', 'Administrador con permisos completos para gestionar la organización y los proyectos', 'Create', now(), now()),
('Member', 'Miembro que solo puede ver la organización y los proyectos asignados, sin permisos de edición o creación', 'Create', now(), now()),
('Moderator', 'Moderador que puede gestionar proyectos y asignaciones, pero sin control sobre la organización o los roles de administradores', 'Create', now(), now());

insert into assignments (name, description, state_assignment, "createdAt", "updatedAt") VALUES
('ProjectManager', 'Administrador de projecto con permisos completos para gestionar el proyecto', 'Create', now(), now()),
('Collaborator', 'Colaborador solo puede ver el proyecto, ademas de poder partisipar en las tareas', 'Create', now(), now()),
('Spectator', 'Espectador solo puede ver el projecto nada mas', 'Create', now(), now());

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

insert into organizations (name, description, state_organization, "createdAt", "updatedAt") VALUES
('CodeMentoria', 'Una empresa que ayuda a las personas interesadas en programacion a ser buenos profecionales', 'Create', now(), now()),
('ProjectTrack', 'Una empresa que busca crear proyecto que ayuden a los demas.', 'Create', now(), now()),
('RoneyOrg', 'Organización de Roney.', 'Create', now(), now()),
('BenjamínOrg', 'Organización de Benjamín.', 'Create', now(), now()),
('JoseOrg', 'Organización de Jose.', 'Create', now(), now()),
('MariaOrg', 'Organización de Maria.', 'Create', now(), now());

insert into members (user_id, state_member, "createdAt", "updatedAt") VALUES
(2, 'Create', now(), now()),
(3, 'Create', now(), now()),
(3, 'Create', now(), now()),
(2, 'Create', now(), now()),
(4, 'Create', now(), now()),
(5, 'Create', now(), now()),
(3, 'Create', now(), now()),
(2, 'Create', now(), now()),
(5, 'Create', now(), now()),
(4, 'Create', now(), now()),
(4, 'Create', now(), now()),
(5, 'Create', now(), now());

insert into projects (state_id, name, description, repository_link, state_project, "createdAt", "updatedAt") VALUES
(2, 'Calculadora', 'Calculadora de proposiciones matetmaticas', 'Github/CodeMentoria/calculadora.com', 'Create', now(), now()),
(1, 'ProjectTrack', 'Aplicacion web para administrar proyectos', 'Github/ProjectTrack/projectTrack.com', 'Create', now(), now()),
(3, 'Cursos', 'Pagina web para cursos de programacion', 'Github/CodeMentoria/cursos.com', 'Create', now(), now()),
(4, 'Portafolio', 'Mi portafolio de desarrolador FullStack', 'Github/RoneyVal/portafolio.com', 'Create', now(), now()),
(5, 'Calculadora', 'Calculadora de proposiciones matetmaticas', 'Github/CodeMentoria/calculadora.com', 'Create', now(), now()),
(6, 'Migrador DB', 'Magrador de bases de datos', 'Github/FierceSpectrum/migrationDB.com', 'Create', now(), now());

insert into participants (project_id, member_id, state_participant, "createdAt", "updatedAt") VALUES
(1, 1, 'Create', now(), now()),
(1, 7, 'Create', now(), now()),
(1, 9, 'Create', now(), now()),
(2, 2, 'Create', now(), now()),
(2, 8, 'Create', now(), now()),
(2, 11, 'Create', now(), now()),
(4, 3, 'Create', now(), now()),
(3, 1, 'Create', now(), now()),
(5, 5, 'Create', now(), now()),
(6, 4, 'Create', now(), now()),
(4, 1, 'Create', now(), now()),
(3, 10, 'Create', now(), now()),
(2, 12, 'Create', now(), now());

insert into tasks (project_id, participant_id, state_id, assignment_id, name, description, start_date, end_date, state_task, "createdAt", "updatedAt") VALUES
(1, 1, 1, 1, 'Web', 'Realizar una pagina web', now(), now(), 'Create', now(), now()),
(1, 2, 1, 2, 'Api Rest', 'Realizar una Api Rest', now(), now(), 'Create', now(), now()),
(2, 4, 7, 1, 'Data Base', 'Realizar la base de datos', now(), now(), 'Create', now(), now()),
(3, 8, 4, 1, 'Curso', 'Realizar una curso de html', now(), now(), 'Create', now(), now());

insert into assignment_permissions (assignment_id, permission_id, "createdAt", "updatedAt") VALUES
(1, 7, now(), now()),
(1, 8, now(), now()),
(1, 9, now(), now()),
(1, 10, now(), now()),
(1, 11, now(), now()),
(1, 12, now(), now()),
(1, 17, now(), now()),
(1, 18, now(), now()),
(1, 19, now(), now()),
(1, 20, now(), now()),
(1, 29, now(), now()),
(1, 30, now(), now()),
(1, 31, now(), now()),
(1, 32, now(), now()),
(1, 33, now(), now()),
(1, 34, now(), now()),
(1, 35, now(), now()),
(1, 36, now(), now()),
(1, 37, now(), now()),
(1, 38, now(), now()),
(1, 39, now(), now()),
(1, 40, now(), now()),
(2, 10, now(), now()),
(2, 18, now(), now()),
(2, 34, now(), now()),
(2, 35, now(), now()),
(2, 38, now(), now()),
(3, 10, now(), now()),
(3, 18, now(), now()),
(3, 34, now(), now()),
(3, 38, now(), now());

insert into member_roles (member_id, role_id, "createdAt", "updatedAt") VALUES
(1, 1, now(), now()),
(2, 1, now(), now()),
(3, 1, now(), now()),
(4, 1, now(), now()),
(5, 1, now(), now()),
(6, 1, now(), now()),
(7, 3, now(), now()),
(8, 3, now(), now()),
(9, 2, now(), now()),
(10, 2, now(), now()),
(11, 2, now(), now()),
(12, 2, now(), now());

insert into organization_members (organization_id, member_id, "createdAt", "updatedAt") VALUES
(1, 1, now(), now()),
(2, 2, now(), now()),
(3, 3, now(), now()),
(4, 4, now(), now()),
(5, 5, now(), now()),
(6, 6, now(), now()),
(1, 7, now(), now()),
(2, 8, now(), now()),
(1, 9, now(), now()),
(1, 10, now(), now()),
(2, 11, now(), now()),
(2, 12, now(), now());

insert into organization_projects (organization_id, project_id, "createdAt", "updatedAt") VALUES
(1, 1, now(), now()),
(2, 2, now(), now()),
(1, 3, now(), now()),
(3, 4, now(), now()),
(5, 5, now(), now()),
(4, 6, now(), now());

insert into user_organizations (user_id, organization_id, "createdAt", "updatedAt") VALUES
(2, 1, now(), now()),
(3, 2, now(), now()),
(3, 3, now(), now()),
(2, 4, now(), now()),
(4, 5, now(), now()),
(5, 6, now(), now());

insert into participant_assignments (participant_id, assignment_id, "createdAt", "updatedAt") VALUES
(1, 1, now(), now()),
(2, 2, now(), now()),
(3, 3, now(), now()),
(4, 1, now(), now()),
(5, 1, now(), now()),
(6, 2, now(), now()),
(7, 1, now(), now()),
(8, 1, now(), now()),
(9, 1, now(), now()),
(10, 1, now(), now()),
(11, 1, now(), now()),
(12, 3, now(), now()),
(13, 3, now(), now()),
(13, 2, now(), now());

insert into role_permissions (role_id, permission_id, "createdAt", "updatedAt") VALUES
(1, 6, now(), now()),
(1, 7, now(), now()),
(1, 8, now(), now()),
(1, 9, now(), now()),
(1, 10, now(), now()),
(1, 11, now(), now()),
(1, 12, now(), now()),
(1, 13, now(), now()),
(1, 14, now(), now()),
(1, 15, now(), now()),
(1, 16, now(), now()),
(1, 17, now(), now()),
(1, 18, now(), now()),
(1, 19, now(), now()),
(1, 20, now(), now()),
(1, 21, now(), now()),
(1, 22, now(), now()),
(1, 23, now(), now()),
(1, 24, now(), now()),
(1, 29, now(), now()),
(1, 30, now(), now()),
(1, 31, now(), now()),
(1, 32, now(), now()),
(1, 33, now(), now()),
(1, 34, now(), now()),
(1, 35, now(), now()),
(1, 36, now(), now()),
(1, 37, now(), now()),
(1, 38, now(), now()),
(1, 39, now(), now()),
(1, 40, now(), now()),
(2, 6, now(), now()),
(2, 14, now(), now()),
(3, 6, now(), now()),
(3, 9, now(), now()),
(3, 10, now(), now()),
(3, 11, now(), now()),
(3, 12, now(), now()),
(3, 13, now(), now()),
(3, 14, now(), now()),
(3, 15, now(), now()),
(3, 16, now(), now()),
(3, 17, now(), now()),
(3, 18, now(), now()),
(3, 19, now(), now()),
(3, 20, now(), now()),
(3, 21, now(), now()),
(3, 22, now(), now()),
(3, 23, now(), now()),
(3, 24, now(), now()),
(3, 29, now(), now()),
(3, 30, now(), now()),
(3, 31, now(), now()),
(3, 32, now(), now()),
(3, 33, now(), now()),
(3, 34, now(), now()),
(3, 35, now(), now()),
(3, 36, now(), now()),
(3, 37, now(), now()),
(3, 38, now(), now()),
(3, 39, now(), now()),
(3, 40, now(), now());
