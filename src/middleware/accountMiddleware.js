const database = require("../database/connection");
const apiResponse = require("../helpers/apiResponse");
const validateFieldUser = (req, res, next) => {
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

const validateEmailAuthExist = async (req, res, next) => {
  const { email } = req.body;

  const emailExist = await database
    .select("*")
    .table("users")
    .where({ email: email })
    .first();
  if (!emailExist) {
    return apiResponse.notFoundResponse(res, "Email not found in database");
  }
  req.userExist = emailExist;
  next();
};

const validateEmailExist = async (req, res, next) => {
  const id = req.params.id;
  const { email } = req.body;

  try {
    if (id) {
      const user = await database
        .select("*")
        .table("users")
        .where({ id: id })
        .first();

      if (user && user.email === email) {
        return next();
      } else {
        const emailExist = await database
          .select("*")
          .table("users")
          .where({ email: email })
          .first();

        if (emailExist) {
          return apiResponse.validationExistData(
            res,
            "E-mail already registered",
            email
          );
        }
      }
    } else {
      const emailExist = await database
        .select("*")
        .table("users")
        .where({ email: email })
        .first();

      if (emailExist) {
        return apiResponse.validationExistData(
          res,
          "E-mail already registered",
          email
        );
      }
    }
    next();
  } catch (error) {
    console.error(error);
    return apiResponse.ErrorResponse(
      res,
      "Error while validating email",
      error
    );
  }
};

const validateUserExist = async (req, res, next) => {
  const id = req.params.id;
  const userExist = await database
    .select("*")
    .table("users")
    .where({ id: id })
    .first();

  if (!userExist) {
    return apiResponse.notFoundResponse(res, "User not found");
  }
  next();
};

module.exports = {
  validateFieldUser,
  validateUserExist,
  validateEmailExist,
  validateEmailAuthExist,
};
