const express = require("express");
const setupSwagger = require("../swagger");
const cors = require("cors");
const router = require("./routes/routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
setupSwagger(app);

module.exports = app;
