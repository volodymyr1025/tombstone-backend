const mongoose = require("mongoose");

const symbolSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  alt: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Symbol = mongoose.model("Symbol", symbolSchema);

module.exports = Symbol;
