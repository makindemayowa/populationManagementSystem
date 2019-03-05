const Location = require("../models/location");
const NestedLocation = require("../models/nestedLocation");

exports.create = (req, res) => {
  const name = req.body.name.trim().toLowerCase();
  req.body.name = name;
  Location.findOne({ _id: req.params.locationId }, (error, location) => {
    if (error) return res.status(500).send({ error });
    if (location) {
      NestedLocation.findOne({ name }, (err, response) => {
        if (err) return res.status(500).send({ err });
        if (response) {
          return res.status(400).send({
            message: "You have a nested location with this name already"
          });
        }
        NestedLocation.create(req.body, (err, savedNestedLocation) => {
          if (err) return res.status(500).send({ err });
          location.nestedLocations.push(savedNestedLocation._id);
          location.save((err, newLocation) => {
            return res
              .status(201)
              .send({ message: "location saved", newLocation });
          });
        });
      });
    } else {
      return res.status(404).send({ message: "location not found" });
    }
  });
};

exports.getOne = (req, res) => {
  NestedLocation.findOne({ _id: req.params.locationId }).exec(
    (err, nestedLocation) => {
      if (!nestedLocation) {
        return res.status(404).send({ message: "Nested location not found" });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: "success", nestedLocation });
    }
  );
};

exports.update = (req, res) => {
  NestedLocation.findOneAndUpdate(
    { _id: req.params.locationId },
    { $set: req.body },
    { new: true },
    (err, response) => {
      if (!response) {
        return res.status(404).send({ message: "nested location not found" });
      }
      if (err) return res.status(500).send({ err });
      return res.status(200).send({ message: "success", response });
    }
  );
};

exports.delete = (req, res) => {
  Location.findOne({ _id: req.params.locationId }, (error, location) => {
    if (error) return res.status(500).send({ error });
    if (location) {
      const nestedLocationId = req.params.nestedLocationId;
      NestedLocation.deleteOne({ _id: nestedLocationId }, err => {
        if (err) return res.status(500).send({ err });
        const index = location.nestedLocations.indexOf(nestedLocationId);
        location.nestedLocations.splice(index, 1);
        location.save((error, newLocation) => {
          if (error) return res.status(500).send({ error });
          return res.status(200).send({ newLocation });
        });
      });
    } else {
      return res.status(404).send({ message: "location not found" });
    }
  });
};
