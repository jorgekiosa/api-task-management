const router = require("express").Router();

const TaskController = require("../controllers/TaskController");
const tasksMiddleware = require("../middleware/tasksMiddleware");
const checkToken = require("../middleware/checkToken");

/**
 * @swagger
 * tags:
 *   - name: Tasks
 *     description: Task-related operations
 */
/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: List all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID da tarefa
 *                     example: 1
 *                   task:
 *                     type: string
 *                     description: Título da tarefa
 *                     example: Estudar Node.js
 *                   description:
 *                     type: string
 *                     description: Descrição da tarefa
 *                     example: Revisar os conceitos de Express.
 *                   responsible:
 *                     type: string
 *                     description: Descrição da tarefa
 *                     example: Revisar os conceitos de Express.
 */

router.get("/tasks", checkToken, TaskController.getAll);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get details of a specific task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tarefa encontrada
 *       404:
 *         description: Tarefa não encontrada
 */
router.get(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.getOne
);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary:  Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: Estudar Swagger
 *               description:
 *                 type: string
 *                 example: Aprender a documentar APIs com Swagger.
 *               responsible:
 *                 type: string
 *                 example: Aprender a documentar APIs com Swagger.
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post(
  "/tasks",
  checkToken,
  tasksMiddleware.validateFieldTask,
  TaskController.createTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               task:
 *                 type: string
 *                 example: Estudar API com Node.js
 *               description:
 *                 type: string
 *                 example: Focar na documentação de APIs.
 *               responsible:
 *                 type: string
 *                 example: Focar na documentação de APIs.
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Tarefa não encontrada
 */
router.put(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.updateTask
);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete an existing task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da tarefa
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Tarefa deletada com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete(
  "/tasks/:id",
  checkToken,
  tasksMiddleware.validateTaskExist,
  TaskController.deleteTask
);

module.exports = router;
