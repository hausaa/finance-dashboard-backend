const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const checkRole = require("../middlewares/roleMiddleware");
const {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const { createUserValidation, updateUserValidation } = require("../validator/user-validator");
const { validate } = require("../middlewares/validate");

router.get("/", auth, checkRole("admin"), listUsers);
router.get("/:id", auth, checkRole("admin"), getUser);
router.post("/", auth, checkRole("admin"), createUserValidation, validate, createUser);
router.put("/:id", auth, checkRole("admin"), updateUserValidation, validate, updateUser);
router.delete("/:id", auth, checkRole("admin"), deleteUser);

module.exports = router;
