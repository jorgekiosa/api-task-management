const database = require("../database/connection");
const bcrypt = require("../helpers/bcrypt");
const Token = require("../helpers/jwt");
const apiResponse = require("../helpers/apiResponse");
const deleteClomunPassword = require("../helpers/deleteColumnPassword");
const encrypt = new bcrypt();
const jwt = new Token();
class AuthController {
  async auth(req, res) {
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

  getAll(req, res) {
    try {
      database
        .select("*")
        .table("users")
        .then((data) => {
          deleteClomunPassword(data);
          apiResponse.successResponseWithData(
            res,
            "Operation successfully completed",
            data
          );
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
  getOne(req, res) {
    try {
      const id = req.params.id;
      database
        .select("*")
        .table("users")
        .where({ id: id })
        .then((data) => {
          deleteClomunPassword(data);
          apiResponse.successResponseWithData(
            res,
            "Operation successfully completed",
            data
          );
        })
        .catch((error) => {
          apiResponse.ErrorResponse(res, "An error has occurred", error);
        });
    } catch (error) {
      apiResponse.ErrorResponse(res, "An error has occurred", error);
    }
  }
  async createUser(req, res) {
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
  updateUser(req, res) {
    const id = req.params.id;
    const { name, email, password } = req.body;
    try {
      database
        .where({ id: id })
        .update({ name: name, email: email, password: password })
        .table("users")
        .then((data) => {
          deleteClomunPassword(data);
          apiResponse.successResponse(res, "User updated successfully");
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
  deleteUser(req, res) {
    const id = req.params.id;
    try {
      database
        .where({ id: id })
        .del()
        .table("users")
        .then((data) => {
          apiResponse.successResponse(res, "User removed successfully");
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
