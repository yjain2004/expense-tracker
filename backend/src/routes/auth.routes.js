const express = require("express");
const router = express.Router();
const authRoutes = require("../controllers/auth.controller")

router.post("/signup", authRoutes.signup)
router.post("/login", authRoutes.login)
router.post("/logout", authRoutes.logout)
router.post("/user", authRoutes.user)

module.exports = router;