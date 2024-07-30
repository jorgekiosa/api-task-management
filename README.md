# 🚀 API - Task and User Management

```bash
This project is a basic API for task and user management, with integrated authentication, using Node.js, MySQL, Express, and Knex. 
The API allows creating, reading, updating, and deleting tasks and users, as well as providing endpoints for user authentication and authorization.

```

## Technologies Used
```bash
Node.js: A JavaScript runtime environment for server-side programming.
Express: A web framework for Node.js, used to build the API.
MySQL: A relational database management system where tasks and users data are stored.
Knex: A SQL query builder for Node.js, used to interact with the MySQL database.
```

## Features
```bash
User Management: Create, read, update, and delete users.
Task Management: Create, read, update, and delete tasks.
Authentication: User registration and login with password encryption.
Authorization: JWT-based access control to protect API endpoints.
```

## Database Schema
The database ##task_management includes the following tables:

## Users Table 

```bash
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

## Tasks Table

```bash
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(120) NOT NULL,
  `description` varchar(500) NOT NULL,
  `responsible` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

```

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the API with the command below
```bash
npm start
```

## Available Endpoints
```bash
## Authentication
POST /login: Authenticates a user and returns a JWT token.
POST /register: Registers a new user.

## Users
GET /users: List all users (requires authentication).
GET /users/:id: Get details of a specific user (requires authentication).
PUT /users/:id: Update user information (requires authentication).
DELETE /users/:id: Delete a user (requires authentication).

## Tasks
POST /tasks: Create a new task (requires authentication).
GET /tasks: List all tasks (requires authentication).
GET /tasks/:id: Get details of a specific task (requires authentication).
PUT /tasks/:id: Update a task (requires authentication).
DELETE /tasks/:id: Delete a task (requires authentication).

```
