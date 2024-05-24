const express = require("express");
const router = express.Router();
const symbolController = require("../controllers/symbolController");
const symbolUpload = require("../middleware/symbolUpload");

router.get("/symbols", symbolController.getSymbols);
router.post("/symbol", symbolUpload, symbolController.createSymbol);
router.put("/symbol/:id", symbolUpload, symbolController.editSymbol);
router.delete("/symbol/:id", symbolController.removeSymbol);

module.exports = router;
