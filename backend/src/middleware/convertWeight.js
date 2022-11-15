const PaperType = require("../models/paperType");

const convertWeight = async function (req, res, next) {
  //make sure paper weight unit is valid
  if (
    req.body.weightUnit.toLowerCase() != "lb" &&
    req.body.weightUnit.toLowerCase() != "gsm"
  ) {
    res.status(404).send("Unknown paper weight unit!");
  }

  //get the paper type object associated with this new paper
  const paperType = await PaperType.findById(req.body.type);

  //calculate the weight - oz/sq in
  const basisSqInches = paperType.basis_height * paperType.basis_width;

  if (req.body.weightUnit.toLowerCase() === "lb") {
    //calculate oz/sq in based off of pounds
    //500 sheets of paper per basis weight, 16 oz per lb
    req.body.ozPerSqIn = ((req.body.weight / 500) * 16) / basisSqInches;
  } else {
    //calculate oz/sq in based off of gsm

    //conversion constants
    const OZ_PER_GRAM = 0.035274;
    const SQ_IN_PER_SQ_METER = 1550;

    req.body.ozPerSqIn = req.body.weight * (OZ_PER_GRAM / SQ_IN_PER_SQ_METER);
  }
  next();
};

module.exports = convertWeight;
