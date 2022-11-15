const mongoose = require("mongoose");

const paperTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  basis_height: {
    type: Number,
    required: true,
  },
  basis_width: {
    type: Number,
    required: true,
  },
});

const PaperType = mongoose.model("PaperType", paperTypeSchema);

module.exports = PaperType;
