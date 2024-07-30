const router = require("express").Router();

const AuthenticationController = require("../controllers/AuthenticationController");
const accountMiddleware = require("../middleware/accountMiddleware");
const checkToken = require("../middleware/checkToken");

router.post(
  "/login",
  accountMiddleware.validateEmailAuthExist,
  AuthenticationController.login
);
router.post(
  "/register",
  checkToken,
  accountMiddleware.validateEmailExist,
  accountMiddleware.validateFieldUser,
  AuthenticationController.register
);

module.exports = router;
