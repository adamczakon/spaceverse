const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const FlightSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  departure: {
    type: Date,
    required: false
  },
  seats: {
    type: Number,
    required: false
  },
  arrival: {
    type: String,
    required: false
  },
  tourists: { type: Array, default: [] },
  price: {
    type: Number,
    required: false
  }
});

module.exports = Flight = mongoose.model("flight", FlightSchema);
