const mongoose = require("mongoose");

//*create schema
const SeatSchema = new mongoose.Schema({
  code: { type: String, required: true },
  isbooked: { type: Boolean, default: false },
});
//*create model
const Seat = mongoose.model("Seat", SeatSchema, "Seat");

module.exports = {
  Seat,
  SeatSchema,
};
