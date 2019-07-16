const express = require("express");
const router = express.Router();

//Item model
const Flight = require("../../models/Flight");

//@route GET api/items
//@description: Get All Items
router.get("/", (req, res) => {
  Flight.find()
    .sort({ departure: 1 })
    .then(flights => res.json(flights));
});

router.get("/flight-edit/:id", (req, res) => {
  Flight.findById(req.params.id).then(flights => res.json(flights));
});

//@route POST api/flights
//@description: Create new flight
router.post("/", (req, res) => {
  const newFlight = new Flight({
    name: req.body.name,
    departure: req.body.departure,
    arrival: req.body.arrival,
    seats: req.body.seats,
    price: req.body.price
  });

  newFlight.save().then(flight => res.json(flight));
});

//@route DELETE api/flight/:id
//@description: Delete an item
router.delete("/:id", (req, res) => {
  Flight.findById(req.params.id)
    .then(flight => flight.remove().then(() => res.json({ succes: true })))
    .catch(err => res.status(404).json({ succes: false }));
});

//@route POST api/flight/update/add-tourist
//@description: Add tourist to flight
router.post("/update/add-tourist", (req, res) => {
  var myquery = { _id: req.body.flightId };
  var newvalues = { $push: { tourists: req.body.touristId } };
  Flight.updateOne(myquery, newvalues)
    .then(flights => res.json(flights))
    .catch(err => res.status(404).json({ succes: false }));
});

//@route POST api/flight/update/remove-tourist
//@description: Remove tourist from flight
router.post("/update/remove-tourist", (req, res) => {
  var myquery = { _id: req.body.flightId };
  var newvalues = {
    $pull: { tourists: req.body.touristId }
  };
  Flight.updateOne(myquery, newvalues)
    .then(flights => res.json(flights))
    .catch(err => res.status(404).send({ msg: err.message }));
});

module.exports = router;
