const router = require("express").Router();

const AuthenticationController = require("../controllers/AuthenticationController");
const accountMiddleware = require("../middleware/accountMiddleware");
const checkToken = require("../middleware/checkToken");

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication-related operations
 */
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticates a user and returns a token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: exemplo@exemplo.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token de autenticação
 *                   example: abc123xyz
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Credenciais inválidas
 */
router.post(
  "/login",
  accountMiddleware.validateEmailAuthExist,
  AuthenticationController.login
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João
 *               email:
 *                 type: string
 *                 example: exemplo@exemplo.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Email já está em uso
 */
router.post(
  "/register",
  checkToken,
  accountMiddleware.validateEmailExist,
  accountMiddleware.validateFieldUser,
  AuthenticationController.register
);

module.exports = router;
