const {DataTypes} = require('sequelize');

module.exports =(sequelize, type) =>{
    return sequelize.define('presupuesto',{
        idPresupuesto:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proyecto: type.STRING,
        version: type.STRING
    })
}