const router = require("express").Router();

const AccountController = require("../controllers/AccountController");
const accountMiddleware = require("../middleware/accountMiddleware");
const checkToken = require("../middleware/checkToken");

router.get("/users", checkToken, AccountController.getAll);
router.get(
  "/users/:id",
  checkToken,
  accountMiddleware.validateUserExist,
  AccountController.getOne
);
router.put(
  "/users/:id",
  checkToken,
  accountMiddleware.validateFieldUser,
  accountMiddleware.validateUserExist,
  accountMiddleware.validateEmailExist,
  AccountController.updateUser
);
router.delete(
  "/users/:id",
  checkToken,
  accountMiddleware.validateUserExist,
  AccountController.deleteUser
);

module.exports = router;
