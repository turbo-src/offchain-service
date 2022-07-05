import Sequelize from "/usr/local/node_modules/sequelize/lib/index.js";

const db = new Sequelize("postgres://localhost:5432/privateStore", {
  logging: false,
});

export default db;
