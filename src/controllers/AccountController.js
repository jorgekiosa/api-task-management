const database = require("../database/connection");
const bcrypt = require("../helpers/bcrypt");
const Token = require("../helpers/jwt");
const apiResponse = require("../helpers/apiResponse");
const deleteClomunPassword = require("../helpers/deleteColumnPassword");
const encrypt = new bcrypt();
const jwt = new Token();
class AccountController {
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

module.exports = new AccountController();
