var express = require("express");
var router = express.Router();

const stoneRoutes = require("./stoneRoutes");
const symbolRoutes = require("./symbolRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const paymentRoutes = require("./paymentRoutes");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api", stoneRoutes);
router.use("/api", symbolRoutes);
router.use("/api", productRoutes);
router.use("/api", orderRoutes);
router.use("/api", adminRoutes);
router.use("/api", paymentRoutes);

module.exports = router;
