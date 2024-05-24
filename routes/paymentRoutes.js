const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/create-payment", paymentController.createPayment);
router.post("/payment-callback-success", paymentController.paymentCallbackSuccess);
router.post("/payment-callback-cancel", paymentController.paymentCallbackCancel);

module.exports = router;