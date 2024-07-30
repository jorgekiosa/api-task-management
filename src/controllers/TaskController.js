const database = require("../database/connection");
const apiResponse = require("../helpers/apiResponse");

class TaskController {
  createTask(req, res) {
    try {
      const { task, description, responsible } = req.body;
      database
        .insert({ task, description, responsible })
        .table("tasks")
        .then((data) => {
          apiResponse.CreateSuccess(res, "Task created successfully");
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

  getAll(req, res) {
    try {
      database
        .select("*")
        .table("tasks")
        .then((data) => {
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

  async getOne(req, res) {
    try {
      const id = req.params.id;
      await database
        .select("*")
        .table("tasks")
        .where({ id: id })
        .then((data) => {
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

  updateTask(req, res) {
    try {
      const id = req.params.id;
      const { task, description, responsible } = req.body;

      database
        .where({ id: id })
        .update({
          description: description,
          task: task,
          responsible: responsible,
        })
        .table("tasks")
        .then((data) => {
          apiResponse.successResponse(res, "Task updated successfully");
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

  deleteTask(req, res) {
    try {
      const id = req.params.id;
      database
        .where({ id: id })
        .del()
        .table("tasks")
        .then((data) => {
          apiResponse.successResponse(res, "Task removed successfully");
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

module.exports = new TaskController();
