const router = require("express").Router();

const TaskController = require("../controllers/TaskController");
const tasksMiddleware = require("../middleware/tasksMiddleware");
const checkToken = require("../middleware/checkToken");

router.get("/tasks", checkToken, TaskController.getAll);
router.get(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.getOne
);
router.post(
  "/tasks",
  checkToken,
  tasksMiddleware.validateFieldTask,
  TaskController.createTask
);
router.put(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.updateTask
);
router.delete(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.deleteTask
);

module.exports = router;
