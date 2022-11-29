const mongoose = require("mongoose");

const envelopeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  caliper: {
    type: Number,
    required: true,
  },
});

const Envelope = mongoose.model("Envelope", envelopeSchema);

module.exports = Envelope;
