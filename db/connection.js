const Sequelize = require("sequelize");
const modelBudget = require("../models/presupuestos.models");
const modelUsers = require("../models/users.model")

const sequelize = new Sequelize(process.env.DB_NAME, null, null, {
    dialect: "mssql",
    server: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: {
        authentication: {
            type: 'default',
            options: {
                encrypt: true,
                userName: process.env.DB_USER,
                password: process.env.DB_PASS,
            }
        },
    }
  });

const Budget = modelBudget(sequelize, Sequelize);
const User = modelUsers(sequelize, Sequelize);
sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas");
});
module.exports = {User, Budget};
