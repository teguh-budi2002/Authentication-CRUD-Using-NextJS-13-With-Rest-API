const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.USERNAME_DB,
  process.env.PASSWORD_DB,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default db;
