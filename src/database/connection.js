var connectToDatabase = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
module.exports = connectToDatabase;
