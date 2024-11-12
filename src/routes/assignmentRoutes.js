import express from "express";
import {
  postAssignment,
  getAssignments,
  getAssignmentByID,
  patchAssignment,
  deleteAssignment,
} from "../controllers/assignmentController.js";

const router = express.Router();

// Rutas
router.post("/post", postAssignment);
router.get("", getAssignments);
router.get("/:id", getAssignmentByID);
router.patch("/:id", patchAssignment);
router.put("/:id", patchAssignment);
router.delete("/:id", deleteAssignment);

export default router;

/* 
DROP TABLE IF EXISTS assignment_permissions CASCADE;
DROP TABLE IF EXISTS permissions CASCADE;
DROP TABLE IF EXISTS assignments CASCADE;

CREATE TABLE permissions(
    id SERIAL NOT NULL,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    state_permission varchar(255) NOT NULL DEFAULT 'Create'::character varying,
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

CREATE TABLE assignment_permissions(
    id SERIAL NOT NULL,
    assignment_id integer NOT NULL,
    permission_id integer NOT NULL,
    state_assignment_permissions varchar(255) NOT NULL DEFAULT 'Create'::character varying,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT assignment_permissions_assignment_id_fkey FOREIGN key(assignment_id) REFERENCES assignments(id),
    CONSTRAINT assignment_permissions_permission_id_fkey FOREIGN key(permission_id) REFERENCES permissions(id)
);
CREATE UNIQUE INDEX assignment_permissions_assignment_id_permission_id_key ON assignment_permissions USING btree ("assignment_id","permission_id");


*/