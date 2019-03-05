const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next, token) => {
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(403).json({
        message: "Failed to authenticate token."
      });
    }
    req.user = decoded.userDetails;
    next();
  });
};
exports.checkToken = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["authorization"];
  if (token) {
    strippedToken = token.replace("Bearer ", "");
    return verifyToken(req, res, next, strippedToken);
  }
  return res.status(400).json({
    message: "No token provided."
  });
};
