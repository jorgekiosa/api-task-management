const jwt = require("jsonwebtoken");
const apiResponse = require("../helpers/apiResponse");

const checkToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return apiResponse.unauthorizedResponse(res, "Access denied !");
  }
  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
  } catch (error) {
    apiResponse.ErrorResponse(res, "Invalid token", error.message);
  }
};

module.exports = checkToken;
