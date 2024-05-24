const mongoose = require("mongoose");
const positionSchema = require("./Position");
const Schema = mongoose.Schema;

const symbolReferenceSchema = new Schema({
  symbolId: {
    type: Schema.Types.ObjectId,
    ref: "Symbol",
    required: true,
  },
  position: positionSchema,
});

module.exports = symbolReferenceSchema;
