const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "PaperType",
  },
  weight: {
    type: Number,
    required: true,
  },
  weightUnit: {
    type: String,
    required: true,
  },
  ozPerSqIn: {
    type: Number,
    required: true,
  },
  caliper: {
    type: Number,
    required: true,
  },
});

const Paper = mongoose.model("Paper", paperSchema);

module.exports = Paper;
