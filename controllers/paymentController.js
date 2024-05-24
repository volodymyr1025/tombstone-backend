const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const axios = require("axios");

const ACCOUNT = '375917';
const SECRET = 'SAIPPUAKAUPPIAS';
const ALGORITHM = 'sha256';

const calculateHmac = (secret, params, body) => {
  const hmacPayload = Object.keys(params)
    .sort()
    .map((key) => [key, params[key]].join(':'))
    .concat(body ? JSON.stringify(body) : '')
    .join('\n');

  return crypto.createHmac(ALGORITHM, secret).update(hmacPayload).digest('hex');
};

exports.createPayment = async (req, res) => {
  const price = req.body.price;
  const paymentData = {
    stamp: uuidv4(),
    reference: "order-" + uuidv4(),
    amount: price * 100,
    currency: "EUR",
    language: "FI",
    items: [
      {
        unitPrice: price * 100,
        units: 1,
        vatPercentage: 24,
        productCode: req.body.productId,
        description: "Product description",
      },
    ],
    customer: {
      email: req.body.email,
    },
    redirectUrls: {
      success: "http://localhost:5173/suunnittele/tilaa?status=success",
      cancel: "http://localhost:5173/suunnittele/tilaa?status=cancel",
    },
    // callbackUrls: {
    //   success: `https://dnd-test-app-backend.onrender.com/api/payment-callback?productId=${req.body.productId}`,
    //   cancel: `https://dnd-test-app-backend.onrender.com/api/payment-callback-cancel?productId=${req.body.productId}`,
    // },
  };

  const headers = {
    "checkout-account": ACCOUNT,
    "checkout-algorithm": ALGORITHM,
    "checkout-method": "POST",
    "checkout-nonce": uuidv4(), // Unique identifier for this request
    "checkout-timestamp": new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
  };

  headers.signature = calculateHmac(SECRET, headers, paymentData);

  try {
    const response = await axios.post(
      "https://services.paytrail.com/payments",
      paymentData,
      {
        headers: {
          "checkout-account": headers["checkout-account"],
          "checkout-algorithm": headers["checkout-algorithm"],
          "checkout-method": headers["checkout-method"],
          "checkout-nonce": headers["checkout-nonce"],
          "checkout-timestamp": headers["checkout-timestamp"],
          signature: headers.signature,
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error Response:", error.response?.data || error.message);
    res.status(500).send("Payment creation failed");
  }
};

exports.paymentCallbackSuccess = (req, res) => {
};

exports.paymentCallbackCancel = (req, res) => {
  const productId = req.query.productId;
  handleDeleteOrder(productId);
}