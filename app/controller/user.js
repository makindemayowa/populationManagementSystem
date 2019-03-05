const User = require("../models/user"),
  jwt = require("jsonwebtoken");

const getToken = user => {
  const userDetails = {
    email: user.email,
    id: user._id
  };
  const jsonToken = jwt.sign({ userDetails }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h"
  });
  return jsonToken;
};

exports.create = (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(existingUser => {
    if (!existingUser) {
      const user = new User(req.body);
      user.save(err => {
        if (err) {
          return res.status(500).send({ err });
        }
        const token = getToken(user);
        return res
          .status(200)
          .send({ message: "registration successful", token });
      });
    } else {
      return res
        .status(200)
        .send({ message: "Please try again with another email" });
    }
  });
};

exports.login = (req, res) => {
  User.findOne(
    {
      email: req.body.email
    },
    (err, user) => {
      if (err) return res.status(500).send({ err });
      if (!user) {
        return res
          .status(404)
          .send({ message: "email or password is incorrect" });
      }
      if (!user.comparePassword(req.body.password)) {
        return res
          .status(400)
          .send({ message: "email or password is incorrect" });
      }
      const jsonToken = getToken(user);
      return res.status(200).send({ message: "login successful", jsonToken });
    }
  );
};
