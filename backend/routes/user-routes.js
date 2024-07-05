const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();
const verifyToken = require("../middleware/auth-middleware");

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/users", verifyToken, userController.getUsers);

module.exports = router;
