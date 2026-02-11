const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entry.controller")

router.post("/create", entryController.create)
router.post("/fetch", entryController.fetch)
router.delete("/delete/:id", entryController.remove)
router.post("/fetch/:id", entryController.fetchEntry)

module.exports = router;