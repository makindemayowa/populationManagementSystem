const location = require("../controller/location");
const nestedLocation = require("../controller/nestedLocation");
const user = require("../controller/user");
const Validator = require("express-joi-validation");
const dataValidators = require("../helpers/validators");
const auth = require("../helpers/authorisation");

const validator = Validator({});

module.exports = app => {
  // User routes
  app.post("/api/signup", validator.body(dataValidators.user), user.create);
  app.post("/api/login", validator.body(dataValidators.user), user.login);

  // Location routes
  app.get("/api/locations", auth.checkToken, location.getAll);
  app.get("/api/locations/:id", auth.checkToken, location.getOne);
  app.put(
    "/api/locations/:id",
    validator.body(dataValidators.updateLocation),
    auth.checkToken,
    location.update
  );
  app.post(
    "/api/locations",
    validator.body(dataValidators.createLocation),
    auth.checkToken,
    location.create
  );
  app.delete("/api/locations/:id", auth.checkToken, location.delete);

  // Nested locations route
  app.get(
    "/api/nestedlocations/:locationId",
    auth.checkToken,
    nestedLocation.getOne
  );
  app.put(
    "/api/nestedlocations/:locationId",
    auth.checkToken,
    nestedLocation.update
  );
  app.post(
    "/api/locations/:locationId",
    validator.body(dataValidators.createLocation),
    auth.checkToken,
    nestedLocation.create
  );
  app.delete(
    "/api/locations/:locationId/nestedlocations/:nestedLocationId",
    auth.checkToken,
    nestedLocation.delete
  );
};
