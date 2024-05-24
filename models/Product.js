const mongoose = require("mongoose");
const symbolReferenceSchema = require("./SymbolReference");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  stone: {
    type: Schema.Types.ObjectId,
    ref: "Stone",
    required: true,
  },
  symbols: [symbolReferenceSchema],
  textOnPlate: {
    type: String,
  },
  dateOnPlate: {
    type: String,
  },
  birthdayOnPlate: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
