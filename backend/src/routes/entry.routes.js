const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entry.controller")

//importing middlewares
const authMiddleware = require("../middlewares/auth.middleware")

router.post("/create", authMiddleware, entryController.create)
router.post("/fetch", authMiddleware, entryController.fetch)
router.delete("/delete/:id", authMiddleware, entryController.remove)
router.delete("/delete/entries/all", authMiddleware, entryController.removeAll)
router.post("/fetch/:id", authMiddleware, entryController.fetchEntry)
router.post("/summary", authMiddleware, entryController.getSummary)

module.exports = router;