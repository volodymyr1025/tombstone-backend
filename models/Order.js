const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  subscriberInfo: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  deliveryInfo: {
    address: {
      type: String,
      required: true,
    },
    locationName: {
      type: String,
      required: false,
    },
    deliveryNumber: {
      type: String,
      required: false,
    },
    deliveryTime: {
      type: Date,
      required: false,
    },
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
