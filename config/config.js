const { DB_NAME, HOST_DB, DIALECT_DB, USERNAME_DB, PASSWORD_DB } = process.env;

const config = {
  development: {
    username: USERNAME_DB,
    password: PASSWORD_DB,
    database: DB_NAME,
    host: HOST_DB,
    dialect: DIALECT_DB,
    operatorsAliases: false,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;
