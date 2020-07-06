const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const config = require("./config");

//* create server w express
const app = express();
app.use(express.json());

// /api + /stations
app.use("/api/stations", require("./routes/api/controllers/stations"));
app.use("/api/trips", require("./routes/api/controllers/trips"));
app.use("/api/users", require("./routes/api/controllers/users"));
app.use("/api/tickets", require("./routes/api/controllers/tickets"));

// UNIX: export NODE_ENV=staging && yarn start:watch
//* listen port
//const port = 5000;
const port = process.env.PORT || config.port;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

//* create database w mongoose
const mongoURI = config.mongoUri;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to ${mongoURI}`);
  })
  .catch(console.log);
