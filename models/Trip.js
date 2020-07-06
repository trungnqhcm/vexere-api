const mongoose = require("mongoose");
const { SeatSchema } = require("./Seat");

//*create schema
const TripSchema = new mongoose.Schema({
  fromStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  toStationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  seats: [SeatSchema],
  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

//*create model
const Trip = mongoose.model("Trip", TripSchema, "Trip");

module.exports = {
  TripSchema,
  Trip,
};
