const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TouristSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  gender: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  remarks: {
    type: String,
    required: false
  },
  birthDate: {
    type: String,
    required: false
  },
  flightId: {
    type: String,
    required: false
  }
});

module.exports = Tourist = mongoose.model("tourist", TouristSchema);
