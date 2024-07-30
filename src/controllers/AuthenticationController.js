const database = require("../database/connection");
const bcrypt = require("../helpers/bcrypt");
const Token = require("../helpers/jwt");
const apiResponse = require("../helpers/apiResponse");
const deleteClomunPassword = require("../helpers/deleteColumnPassword");
const encrypt = new bcrypt();
const jwt = new Token();
class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userExist = req.userExist;
      const checkPassword = await encrypt.comparePassword(
        password,
        userExist.password
      );
      if (!checkPassword) {
        return apiResponse.ErrorResponse(res, "Invalid password !");
      }

      database
        .select("*")
        .table("users")
        .where({ email: email })
        .then((data) => {
          deleteClomunPassword(data);
          const token = jwt.generateToken(userExist.id);
          const userDataWithToken = {
            data,
            token,
          };
          apiResponse.successResponseWithData(
            res,
            "Authentication successful",
            userDataWithToken
          );
        })
        .catch((error) => {
          console.log("Erro", error);
        });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const passwordHash = await encrypt.hashPassword(password);
      database
        .insert({ name, email, password: passwordHash })
        .table("users")
        .then((data) => {
          apiResponse.CreateSuccess(res, "User created successfully");
        })
        .catch((error) => {
          apiResponse.ErrorResponse(
            res,
            "An error has occurred",
            error.message
          );
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error.message);
    }
  }
}

module.exports = new AuthController();
