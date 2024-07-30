const router = require("express").Router();

const AccountController = require("../controllers/AccountController");
const accountMiddleware = require("../middleware/accountMiddleware");
const checkToken = require("../middleware/checkToken");

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User-related operations
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID do usuário
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Nome do usuário
 *                     example: João
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                     example: exemplo@exemplo.com
 */

router.get("/users", checkToken, AccountController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a specific user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get(
  "/users/:id",
  checkToken,
  accountMiddleware.validateUserExist,
  AccountController.getOne
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Updates an existing user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Atualizado
 *               email:
 *                 type: string
 *                 example: exemplo@atualizado.com
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 */
router.put(
  "/users/:id",
  checkToken,
  accountMiddleware.validateFieldUser,
  accountMiddleware.validateUserExist,
  accountMiddleware.validateEmailExist,
  AccountController.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete(
  "/users/:id",
  checkToken,
  accountMiddleware.validateUserExist,
  AccountController.deleteUser
);

module.exports = router;
