const chai = require("chai");
const chaiHttp = require("chai-http");
const mockData = require("./mockData");
const server = require("../../server");

const User = require("../models/user");

chai.should();
chai.use(chaiHttp);

describe("User controller", () => {
  before(done => {
    User.remove({}, () => {
      done();
    });
  });
  after(done => {
    User.remove({}, () => {
      done();
    });
  });

  describe("/POST users signup", () => {
    it("should create a new user when details are valid", done => {
      chai
        .request(server)
        .post("/api/signup")
        .send(mockData.user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.message.should.be.a("string").eql("registration successful");
          done();
        });
    });
    it("should fail if the email entered is invalid ", done => {
      chai
        .request(server)
        .post("/api/signup")
        .send(mockData.invalidEmail)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.eql(
            `Error validating request body. "email" must be a valid email.`
          );
          done();
        });
    });
    it("should fail if the user details entered are incomplete", done => {
      chai
        .request(server)
        .post("/api/signup")
        .send(mockData.incompleteUserData)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.eql(
            'Error validating request body. "email" is required.'
          );
          done();
        });
    });
    it("should exit if the user details already exist", done => {
      chai
        .request(server)
        .post("/api/signup")
        .send(mockData.user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.be
            .a("string")
            .eql("Please try again with another email");
          done();
        });
    });
  });

  describe("/POST users login", () => {
    before(done => {
      chai
        .request(server)
        .post("/api/signup")
        .send(mockData.user1)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    after(done => {
      User.remove({}, () => {
        done();
      });
    });
    it("should return an error if an invalid route is entered", done => {
      chai
        .request(server)
        .post("/api/logi")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("message").eql("route not found");
          done();
        });
    });
    it("should log in a previously registered user successfully", done => {
      chai
        .request(server)
        .post("/api/login")
        .send(mockData.user1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("jsonToken");
          res.body.jsonToken.should.be.a("string");
          res.body.should.have.property("message").eql("login successful");
          done();
        });
    });
    it("should fail if email does not exists", done => {
      chai
        .request(server)
        .post("/api/login")
        .send(mockData.LoginEmailMismatch)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .eql("email or password is incorrect");
          done();
        });
    });
    it("should fail if password does not match saved password", done => {
      chai
        .request(server)
        .post("/api/login")
        .send(mockData.LoginPasswordMismatch)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("email or password is incorrect");
          done();
        });
    });
  });
});
