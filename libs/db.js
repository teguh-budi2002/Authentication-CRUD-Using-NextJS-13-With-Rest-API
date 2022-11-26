const { Sequelize } = require("sequelize");
const { DB_NAME, HOST_DB, DIALECT_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const db = new Sequelize(DB_NAME, USERNAME_DB, PASSWORD_DB, {
  host: HOST_DB,
  dialect: DIALECT_DB,
});

export default db;
