const express = require("express");
const router = express.Router();
const Envelope = require("../models/envelope");

router.get("/envelopes", async (req, res) => {
  //send back all envelopes in the database
  try {
    const envelopes = await Envelope.find();

    res.status(200).send(envelopes);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/envelopes/:id", async (req, res) => {
  //send back specific paper in the database by id
  try {
    const envelope = await Envelope.findById(req.params.id);

    res.status(200).send(envelope);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/envelopes", async (req, res) => {
  try {
    const envelope = new Envelope({
      name: req.body.name,
      weight: req.body.weight,
      caliper: req.body.caliper,
    });

    //save the new paper record into the database
    await envelope.save();

    res.status(201).send(envelope);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.put("/envelopes/:id", async (req, res) => {
  try {
    const envelopeToEdit = await Envelope.findById(req.params.id);

    envelopeToEdit.name = req.body.name;
    envelopeToEdit.weight = req.body.weight;
    envelopeToEdit.caliper = req.body.caliper;

    await envelopeToEdit.save();

    res.status(200).send(envelopeToEdit);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/envelopes/:id", async (req, res) => {
  //delete a paper given an id
  try {
    const envelope = await Envelope.findByIdAndDelete(req.params.id);

    res.status(200).send(envelope);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
