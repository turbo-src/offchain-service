import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";

const dbUrl = process.env.DB_URL || "postgres://localhost:5432/privatestore";

const db = new Sequelize(dbUrl, {
  logging: false,
});

export default db;
