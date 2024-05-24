const mongoose = require("mongoose");

const positionSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

module.exports = positionSchema;
