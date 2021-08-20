//Se importan los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./connection')

//Modulo Presupuestos
const budgets=sequelize.define('presupuesto', {
    idpres:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    versiones: {
        type: DataTypes.FLOAT(50),
        allowNull: false
    },
})

module.exports = budgets