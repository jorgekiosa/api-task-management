const router = require("express").Router();

//AUTH ROUTES
const authRouter = require("./authenticationRouter");
router.use("/", authRouter);

//TASK ROUTES
const taskRouter = require("./taskRouter");
router.use("/", taskRouter);

//ACCOUNT ROUTES
const accountRouter = require("./accountRouter");
router.use("/", accountRouter);

module.exports = router;
