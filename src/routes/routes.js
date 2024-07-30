const router = require("express").Router();

//TASK ROUTES
const taskRouter = require("./taskRouter");
router.use("/", taskRouter);

//ACCOUNT ROUTES
const accountRouter = require("./accountRouter.js");
router.use("/", accountRouter);

module.exports = router;
