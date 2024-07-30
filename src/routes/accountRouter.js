const router = require("express").Router();

const AccountController = require("../controllers/AccountController");
const accountMiddleware = require("../middleware/accountMiddleware");
const checkToken = require("../middleware/checkToken");

router.post(
  "/auth",
  accountMiddleware.validateEmailAuthExist,
  AccountController.auth
);
router.get("/users", checkToken, AccountController.getAll);
router.get(
  "/users/:id",
  checkToken,
  accountMiddleware.validateUserExist,
  AccountController.getOne
);
router.post(
  "/users",
  checkToken,
  accountMiddleware.validateEmailExist,
  accountMiddleware.validateFieldUser,
  AccountController.createUser
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
