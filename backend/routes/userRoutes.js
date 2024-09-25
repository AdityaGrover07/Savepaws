const express = require("express");
const { body } = require("express-validator");
const {
  Register,
  Login,
  Info,
  userInfo,
  Logout,
} = require("../controllers/userRegister");
const multer = require("multer");
const { profileImageUpload } = require("../controllers/fileUpload");
const auth = require("../middleware/auth");

const routes = express.Router();

// upload images to memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Register & Login
routes.post(
  "/login",
  body("email").isString().not().isEmpty(),
  body("password").isString().not().isEmpty(),
  Login
);
routes.post(
  "/register",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("password").isString().not().isEmpty(),
  Register
);
routes.get("/logout", Logout);
routes.post("/userInfo", userInfo);
routes.post(
  "/profileimg/:userId",
  upload.single("profileimg"),
  profileImageUpload
);
routes.get("/info", Info);
routes.get("/:email/forgetpassword");

module.exports = routes;
