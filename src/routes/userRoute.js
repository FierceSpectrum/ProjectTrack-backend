const express = require("express");
const router = express.Router();
const {
  postUser,
  getUsers,
  getUserByID,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

// Rutas
router.post("/post", postUser);
router.get("", getUsers);
router.get("/:id", getUserByID);
router.patch("/:id", patchUser);
router.put("/:id", patchUser);
router.delete("/:id", deleteUser);

module.exports = router;