const database = require("../database/connection");
const apiResponse = require("../helpers/apiResponse");

const validateFieldTask = (req, res, next) => {
  const { body } = req;

  const errors = [];
  const fields = [body];
  const requiredFields = Object.keys(fields[0]);

  if (requiredFields.length == 0) {
    return apiResponse.ErrorResponse(res, "All fields are required");
  }
  requiredFields.forEach((field) => {
    if (!body[field] || body[field].trim() === "") {
      errors.push(`${field} is required and cannot be empty`);
    }
  });

  if (errors.length > 0) {
    return apiResponse.validationErrorWithData(res, "Operation failed", errors);
  }
  next();
};
const validateTaskExist = async (req, res, next) => {
  const id = req.params.id;
  const taskExist = await database
    .select("*")
    .table("tasks")
    .where({ id: id })
    .first();

  if (!taskExist) {
    return apiResponse.notFoundResponse(res, "Task not found");
  }
  next();
};

module.exports = {
  validateFieldTask,
  validateTaskExist,
};
