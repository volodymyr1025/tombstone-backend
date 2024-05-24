const express = require("express");
const router = express.Router();
const stoneController = require("../controllers/stoneController");
const stoneUpload = require("../middleware/stoneUpload");

router.get("/stones", stoneController.getStones);
router.get("/stone/:id", stoneController.getStone);
router.post("/stone", stoneUpload, stoneController.createStone);
router.put("/stone/:id", stoneUpload, stoneController.editStone);
router.delete("/stone/:id", stoneController.removeStone);

module.exports = router;
