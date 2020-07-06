const mongoose = require("mongoose");

//*create schema
//chon tao Station truoc do khong anh huong j nhieu
const StationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
});
//*create model
const Station = mongoose.model("Station", StationSchema, "Station");

module.exports = {
  StationSchema,
  Station,
};
