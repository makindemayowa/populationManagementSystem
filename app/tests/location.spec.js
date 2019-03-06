const chai = require("chai");
const chaiHttp = require("chai-http");
const mockData = require("./mockData");
const server = require("../../server");

const Location = require("../models/location");
const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

describe("Location controller", () => {
  let token;
  let locationId;
  before(done => {
    Location.remove({}, () => {});
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
  after(done => {
    Location.remove({}, () => {
      done();
    });
  });

  describe("/GET all locations", () => {
    it("should return a not found error of no location was found", done => {
      chai
        .request(server)
        .get("/api/locations")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("No location found");
          done();
        });
    });
  });

  describe("/POST location", () => {
    it("should create a new location", done => {
      chai
        .request(server)
        .post("/api/locations")
        .set("Authorization", `Bearer ${token}`)
        .send(mockData.location1)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("Location saved");
          done();
        });
    });
    it("should exit if the location already exist", done => {
      chai
        .request(server)
        .post("/api/locations")
        .set("Authorization", `Bearer ${token}`)
        .send(mockData.location1)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.message.should.be
            .a("string")
            .eql("You have a location with this name already");
          done();
        });
    });
  });

  describe("/GET all locations", () => {
    it("should return a list of all locations", done => {
      chai
        .request(server)
        .get("/api/locations")
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.locations.length.should.eql(1);
          done();
        });
    });
  });

  describe("/GET location by id", () => {
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
    it("should return a location based on id supplied", done => {
      chai
        .request(server)
        .get(`/api/locations/${locationId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.location._id.should.eql(locationId);
          done();
        });
    });
    it("should return an error if location id wasn't found", done => {
      chai
        .request(server)
        .get(`/api/locations/randomId`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("Location not found");
          done();
        });
    });
  });

  describe("/PUT location by id", () => {
    it("should update specified location properties supplied", done => {
      chai
        .request(server)
        .put(`/api/locations/${locationId}`)
        .send(mockData.updatedLocation)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.location.name.should.eql(mockData.updatedLocation.name);
          done();
        });
    });
    it("should return an error if location id wasn't found", done => {
      chai
        .request(server)
        .put(`/api/locations/invalidId`)
        .set("Authorization", `Bearer ${token}`)
        .send(mockData.updatedLocation)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("location not found");
          done();
        });
    });
  });

  describe("/DELETE location by id", () => {
    it("should delete specified location id specified", done => {
      chai
        .request(server)
        .delete(`/api/locations/${locationId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.be
            .a("string")
            .eql("Location deleted sucessfully");
          done();
        });
    });
    it("should return an error if location id wasn't found", done => {
      chai
        .request(server)
        .delete(`/api/locations/invalidId`)
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
