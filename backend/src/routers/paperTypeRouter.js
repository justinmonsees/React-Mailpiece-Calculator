const express = require("express");
const router = new express.Router();
const PaperType = require("../models/paperType");

router.get("/paperTypes", async (req, res) => {
  //send back all paper in the database
  try {
    const paperTypes = await PaperType.find();

    res.status(200).send(paperTypes);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/paperTypes", async (req, res) => {
  try {
    const paperType = await PaperType.insertMany(req.body);

    res.status(201).send(paperType);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
