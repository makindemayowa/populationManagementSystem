const chai = require("chai");
const chaiHttp = require("chai-http");
const mockData = require("./mockData");
const server = require("../../server");

const Location = require("../models/location");
const NestedLocation = require("../models/nestedLocation");
const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

describe("Nested Location controller", () => {
  let token;
  let locationId;
  let nestedLocationId;
  before(done => {
    Location.remove({}, () => {});
    NestedLocation.remove({}, () => {});
    User.remove({}, () => {
      done();
    });
  });
  before(done => {
    chai
      .request(server)
      .post("/api/signup")
      .send(mockData.user1)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.message.should.be.a("string").eql("registration successful");
        token = res.body.token;
        done();
      });
  });
  before(done => {
    chai
      .request(server)
      .post("/api/locations")
      .set("Authorization", `Bearer ${token}`)
      .send(mockData.location2)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.message.should.be.a("string").eql("Location saved");
        locationId = res.body.newLocation._id;
        done();
      });
  });
  after(done => {
    Location.remove({}, () => {
      done();
    });
  });

  describe("/POST nested location", () => {
    it("should fail if no token was provided", done => {
      chai
        .request(server)
        .post(`/api/locations/${locationId}`)
        .send(mockData.nestedLocation1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("No token provided.");
          done();
        });
    });
    it("should fail if token provided is invalid", done => {
      chai
        .request(server)
        .post(`/api/locations/${locationId}`)
        .send(mockData.nestedLocation1)
        .set("Authorization", `Bearer sometoken`)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          res.body.message.should.be
            .a("string")
            .eql("Failed to authenticate token.");
          done();
        });
    });
    it("should create a new nested location", done => {
      chai
        .request(server)
        .post(`/api/locations/${locationId}`)
        .send(mockData.nestedLocation1)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("location saved");
          res.body.newLocation.nestedLocations.length.should.eql(1);
          done();
        });
    });
    it("should throw an error if nested location name already exist", done => {
      chai
        .request(server)
        .post(`/api/locations/${locationId}`)
        .send(mockData.nestedLocation1)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be
            .a("string")
            .eql("You have a nested location with this name already");
          done();
        });
    });
    it("should throw an error if location id supplied is not valid", done => {
      chai
        .request(server)
        .post(`/api/locations/5c7e6969dd10e9b464d77162`)
        .send(mockData.nestedLocation1)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.message.should.be.a("string").eql("location not found");
          done();
        });
    });
  });

  describe("/GET location by id", () => {
    before(done => {
      chai
        .request(server)
        .post(`/api/locations/${locationId}`)
        .send(mockData.nestedLocation2)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("location saved");
          nestedLocationId = res.body.savedNestedLocation._id;
          done();
        });
    });
    it("should return a nested location based on id supplied", done => {
      chai
        .request(server)
        .get(`/api/nestedlocations/${nestedLocationId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("success");
          res.body.nestedLocation._id.should.eql(nestedLocationId);
          done();
        });
    });
    it("should return an error if nested location id wasn't found", done => {
      chai
        .request(server)
        .get(`/api/nestedlocations/randomId`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be
            .a("string")
            .eql("Nested location not found");
          done();
        });
    });
  });

  describe("/PUT nested location by id", () => {
    it("should update specified location properties supplied", done => {
      chai
        .request(server)
        .put(`/api/nestedlocations/${nestedLocationId}`)
        .send(mockData.updatedNestedLocation)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.nestedLocation.name.should.eql(
            mockData.updatedNestedLocation.name
          );
          done();
        });
    });
    it("should return an error if location id wasn't found", done => {
      chai
        .request(server)
        .put(`/api/nestedlocations/invalidId`)
        .set("Authorization", `Bearer ${token}`)
        .send(mockData.updatedNestedLocation)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be
            .a("string")
            .eql("nested location not found");
          done();
        });
    });
  });

  describe("/DELETE nested location by id", () => {
    it("should delete specified location id specified", done => {
      chai
        .request(server)
        .delete(
          `/api/locations/${locationId}/nestedlocations/${nestedLocationId}`
        )
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.newLocation.nestedLocations.length.should.eql(1);
          res.body.message.should.be
            .a("string")
            .eql("nested location deleted successfully");
          done();
        });
    });
    it("should return an error if location id wasn't found", done => {
      chai
        .request(server)
        .delete(
          `/api/locations/5c7e6969dd10e9b464d77162/nestedlocations/${nestedLocationId}`
        )
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("location not found");
          done();
        });
    });
  });
});
// newLocation;
