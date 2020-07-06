const {
    Station
} = require("../../../../models/Station");

// Chuan Middleware
//*GET /station
const getStations = (req, res, next) => {
    Station.find()
        .then((station) => {
            res.status(200).json(station);
        })
        .catch((err) => res.json(err));
};

//*GET /station by ID
const getStationsById = (req, res, next) => {
    const {
        id
    } = req.params;
    Station.findById(id)
        .then((station) => {
            res.status(201).json(station);
        })
        .catch((err) => res.json(err));
};

//*POST /station
const postStations = (req, res, next) => {
    //// const name = req.body.name;
    //// const address = req.body.address;
    //// const province = req.body.province;
    const {
        name,
        address,
        province
    } = req.body;

    const newStation = new Station(req.body);
    newStation
        .save()
        .then((station) => {
            res.status(200).json(station);
        })
        .catch((err) => res.json(err));
};

//* PUT (replace)
const putStationsById = (req, res, next) => {
    const {
        id
    } = req.params;
    Station.findById(id)
        .then((station) => {
            if (!station)
                return Promise.reject({
                    status: 404,
                    message: "No station",
                });

            const keys = ["name", "address", "province"];
            keys.forEach((key) => {
                station[key] = req.body[key];
            });

            return station.save();
        })
        .then((station) => {
            res.status(200).json(station);
        })
        .catch((err) => res.json(err));
};

//* PATCH (update station)
const patchStationsById = (req, res, next) => {
    const {
        id
    } = req.params;
    Station.findById(id)
        .then((station) => {
            if (!station)
                return Promise.reject({
                    status: 404,
                    message: "No station",
                });

            // const {
            //     name,
            //     address,
            //     province
            // } = req.body;

            // station.name = name ? name : station.name;
            // if (address) station.address = address;
            // if (province) station.province = province;

            // const keys = ["name", "address", "province"];
            // keys.forEach((keys) => {
            //     if (station[keys]) station[keys] = req.body[keys];   
            // });

            Object.keys(req.body).forEach((key) => {
                station[key] = req.body[key];
            })

            return station.save();
        })
        .then((station) => {
            res.status(200).json(station);
        })
        .catch((err) => res.json(err));
};



//* DELETE (delete station)
const deleteStationsById = (req, res, next) => {
    const {
        id
    } = req.params;

    Station.findById(id)
        .then((station) => {
            if (!station)
                return Promise.reject({
                    status: 404,
                    message: "No station",
                });
            return Promise.all([
                Station.deleteOne({
                    _id: id
                }),
                station
            ])
        })
        .then(result => {
            res.status(200).json(result[1]);
        })
        .catch((err) => res.json(err));

};


//* Export
module.exports = {
    getStations,
    postStations,
    getStationsById,
    putStationsById,
    patchStationsById,
    deleteStationsById
};