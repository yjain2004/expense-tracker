const express = require("express");
const router = express.Router();

// importing controllers 
const authController = require("../controllers/auth.controller")

// importing middlewared 
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/signup", authController.signup)
router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.post("/user", authMiddleware, authController.user)

module.exports = router;