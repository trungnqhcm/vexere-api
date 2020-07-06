const { Trip } = require("../../../../models/Trip");
const { Seat } = require("../../../../models/Seat");

// prettier-ignore
const codeArray = [
    "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12",
    "B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12",
]

const _ = require("lodash");

//* GET
const getTrips = (req, res, next) => {
  Trip.find()
    // hien thi them availableSeatNumber
    //.select('-seat')
    .then((trips) => {
      const _trips = trips.map((trip) => {
        // const modifiedTrips = {
        //     ...trip._doc,
        //     availableSeatNumber: trip.seats.filter(seat => !seat.isBooked).length
        // }
        // delete trip.seat;
        // return modifiedTrips;

        // return {
        //   ..._.omit(trip._doc, ["seat"]),
        //   availableSeatNumber: trip.seat.filter((seat) => !seat.isBooked)
        //     .length,
        // };

        // return _.assign(
        //     _.omit(trip._doc, ["seats"]), {
        //       availableSeatNumber: trip.seat.filter((seat) => !seat.isBooked.length
        //   ),
        // });

        return _.chain(trip)
          .get("_doc")
          .omit(["seats"])
          .assign({
            availableSeatNumber: trip.seats.filter((seat) => !seat.isBooked)
              .length,
          });
      });

      res.status(200).json(_trips);
    })

    .catch((err) => res.json(err));
};

//* POST
const postTrip = (req, res, next) => {
  const { fromStationId, toStationId, startTime, price } = req.body;
  const seats = codeArray.map((code) => {
    return new Seat({
      code,
    });
  });
  const newTrip = new Trip({
    fromStationId,
    toStationId,
    startTime,
    price,
    seats,
  });

  newTrip
    .save()
    .then((trip) => res.status(201).json(trip))
    .catch((err) => res.json(err));
};

//* GET by Id
const getTripById = (req, res, next) => {
  const { id } = req.params.id;
  Trip.findById(id)
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.json(err));
};

//* PATCH by Id
const patchTripById = (req, res, next) => {
  const { id } = req.params.id;
  Trip.findById(id)
    .then((trip) => {
      if (!trip)
        return Promise.reject({
          status: 404,
          message: "No trips",
        });

      Object.keys(req.body).forEach((key) => {
        trip[key] = req.body[key];
      });

      return trip.save();
    })
    .then((trips) => res.status(200).json(trips))
    .catch((err) => res.json(err));
};

//* delete
const deleteTripById = (req, res, next) => {
  const { id: _id } = req.params;
  let _trip;

  Trip.findById(_id)
    .then((trip) => {
      _trip = trip;
      if (!trip)
        return Promise.reject({
          status: 404,
          message: "No trip",
        });
      return Trip.deleteOne({
        _id,
      });
    })
    .then((result) => {
      res.status(200).json(_trip);
    })
    .catch((err) => res.json(err));
};

module.exports = {
  getTrips,
  postTrip,
  getTripById,
  patchTripById,
  deleteTripById,
};
