const Location = require("../models/location");
const NestedLocation = require("../models/nestedLocation");

exports.create = (req, res) => {
  const name = req.body.name.trim().toLowerCase();
  req.body.name = name;
  Location.findOne({ name }, (error, location) => {
    if (error) return res.status(500).send({ error });
    if (location) {
      return res
        .status(400)
        .send({ message: "You have a location with this name already" });
    }
    Location.create(req.body, (err, newLocation) => {
      if (err) return res.status(500).send({ err });
      return res.status(201).send({ message: "Location saved", newLocation });
    });
  });
};

exports.getAll = (req, res) => {
  Location.find({ status: "active" })
    .populate("nestedLocations")
    .exec((err, locations) => {
      if (!locations.length) {
        return res.status(404).send({ message: "No location found" });
      }
      return res.status(200).send({
        locations
      });
    });
};

exports.getOne = (req, res) => {
  Location.findOne({ _id: req.params.id }).exec((err, location) => {
    if (!location) {
      return res.status(404).send({ message: "Location not found" });
    }
    if (err) return res.status(500).send({ err });
    return res.status(200).send({ message: "success", location });
  });
};

exports.update = (req, res) => {
  Location.findOneAndUpdate(
    { _id: req.params.id, status: "active" },
    { $set: req.body },
    { new: true },
    (err, response) => {
      if (!response) {
        return res.status(404).send({ message: "location not found" });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: "success", response });
    }
  );
};

exports.delete = (req, res) => {
  Location.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { status: "deleted" } },
    { new: true },
    (err, response) => {
      if (!response) {
        return res.status(404).send({ message: "location not found" });
      }
      if (err) return res.status(500).send({ err });
      return res
        .status(200)
        .send({ message: "Location deleted sucessfully", response });
    }
  );
};