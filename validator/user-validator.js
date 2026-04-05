const { body } = require("express-validator");

exports.createUserValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Role must be viewer, analyst, or admin"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];

exports.updateUserValidation = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),

  body("role")
    .optional()
    .isIn(["viewer", "analyst", "admin"])
    .withMessage("Role must be viewer, analyst, or admin"),

  body("status")
    .optional()
    .isIn(["active", "inactive"])
    .withMessage("Status must be active or inactive")
];
