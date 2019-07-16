const express = require("express");
const router = express.Router();

//Item model
const Tourist = require("../../models/Tourist");

//@route GET api/items
//@description: Get All Items
//@access: Public
router.get("/", (req, res) => {
  Tourist.find()
    .sort({ lastName: 1 })
    .then(tourists => res.json(tourists));
});

router.get("/tourist-edit/:id", (req, res) => {
  Tourist.findById(req.params.id).then(tourists => res.json(tourists));
});

//delete
router.get("/in_flight/:id", (req, res) => {
  Tourist.find({ flightId: req.params.id }).then(tourists =>
    res.json(tourists)
  );
});

//make fligt ref
router.post("/", (req, res) => {
  const newTourist = new Tourist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    country: req.body.country,
    remarks: req.body.remarks,
    birthDate: req.body.birthDate,
    flightId: req.body.flightId
  });

  newTourist.save().then(tourist => res.json(tourist));
});

//@route DELETE api/items/:id
//@description: Delete an item
//@access: Public
router.delete("/:id", (req, res) => {
  Tourist.findById(req.params.id)
    .then(tourist => tourist.remove().then(() => res.json({ succes: true })))
    .catch(err => res.status(404).json({ succes: false }));
});

//route UPDATE api/tourists/:id
router.post("/update", (req, res) => {
  var myquery = { _id: req.body.touristId };
  var newvalues = { $set: { flightId: req.body.flightId } };
  Tourist.updateOne(myquery, newvalues).then(tourists => res.json(tourists));
});

router.post("/remove_flight", (req, res) => {
  var myquery = { flightId: req.body.flightId };
  var newvalues = { $set: { flightId: "" } };
  Tourist.updateOne(myquery, newvalues).then(tourists => res.json(tourists));
});

module.exports = router;
