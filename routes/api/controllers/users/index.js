const express = require("express");
const userController = require("./user.controller");
const { authenticate, authorize } = require("../../../../middlewares/auth");
const { uploadImage } = require("../../../../middlewares/uploadImages");

const router = express.Router();

router.post("/", userController.createUser);
router.post("/login", userController.login);
router.get(
  "/private",
  authenticate,
  authorize(["client"]),
  userController.testPrivate
);
router.put(
  "/upload-avatar",
  authenticate,
  authorize(["admin", "client"]),
  uploadImage("avatar"),
  userController.uploadAvatar
);

module.exports = router;
