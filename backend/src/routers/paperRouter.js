const express = require("express");
const router = express.Router();
const PaperType = require("../models/paperType");
const Paper = require("../models/paper");
const convertWeightMW = require("../middleware/convertWeight");

router.get("/papers", async (req, res) => {
  //send back all paper in the database
  try {
    const papers = await Paper.find();

    res.status(200).send(papers);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/papers/:id", async (req, res) => {
  //send back specific paper in the database by id
  try {
    const paper = await Paper.findById(req.params.id);

    res.status(200).send(paper);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/papers", convertWeightMW, async (req, res) => {
  try {
    const paper = new Paper({
      name: req.body.name,
      type: req.body.type,
      weight: req.body.weight,
      weightUnit: req.body.weightUnit,
      ozPerSqIn: req.body.ozPerSqIn,
      caliper: req.body.caliper,
    });

    //save the new paper record into the database
    await paper.save();

    res.status(201).send(paper);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.put("/papers/:id", convertWeightMW, async (req, res) => {
  try {
    const paperToEdit = await Paper.findById(req.params.id);

    paperToEdit.name = req.body.name;
    paperToEdit.type = req.body.type;
    paperToEdit.weight = req.body.weight;
    paperToEdit.weightUnit = req.body.weightUnit;
    paperToEdit.ozPerSqIn = req.body.ozPerSqIn;
    paperToEdit.caliper = req.body.caliper;

    await paperToEdit.save();

    res.status(200).send(paperToEdit);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/papers/:id", async (req, res) => {
  //delete a paper given an id
  try {
    const papers = await Paper.findByIdAndDelete(req.params.id);

    res.status(200).send(papers);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
``;
