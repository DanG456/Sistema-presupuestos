const Sequelize = require("sequelize");
const modelBudget = require("../models/presupuestos.models");
const modelUsers = require("../models/users.model")

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: "localhost",
    dialect: "mssql",
  });

const Budget = modelBudget(sequelize, Sequelize);
const User = modelUsers(sequelize, Sequelize);
sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});
module.exports = {User, Budget};
