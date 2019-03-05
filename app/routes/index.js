const location = require("../controller/location");
const nestedLocation = require("../controller/nestedLocation");
const Validator = require("express-joi-validation");
const dataValidators = require("../helpers/validators");

const validator = Validator({});

module.exports = app => {
  // location routes
  app.get("/api/locations", location.getAll);
  app.get("/api/locations/:id", location.getOne);
  app.put(
    "/api/locations/:id",
    validator.body(dataValidators.updateLocation),
    location.update
  );
  app.post(
    "/api/locations",
    validator.body(dataValidators.createLocation),
    location.create
  );
  app.delete("/api/locations/:id", location.delete);

  // nested locations route
  app.get("/api/nestedlocations/:locationId", nestedLocation.getOne);
  app.put("/api/nestedlocations/:locationId", nestedLocation.update);
  app.post(
    "/api/locations/:locationId",
    validator.body(dataValidators.createLocation),
    nestedLocation.create
  );
  app.delete(
    "/api/locations/:locationId/nestedlocations/:nestedLocationId",
    nestedLocation.delete
  );
};
