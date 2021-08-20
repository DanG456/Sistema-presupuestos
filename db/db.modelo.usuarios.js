//Se importan los modulos necesarios
const {DataTypes, Model } = require('sequelize');
const sequelize = require('./connection')

//Modulo Usuarios
const users=sequelize.define('usuarios', {
    iduser:{
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    contrasena: {
        type: DataTypes.STRING(16),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        validate:{
            isEmail: true,
        },
        allowNull: false
    }
})

module.exports = users