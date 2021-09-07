const {DataTypes} = require('sequelize');

module.exports =(sequelize, type) =>{
    return sequelize.define('presupuesto',{
        idPresupuesto:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        proyecto: DataTypes.STRING,
        version: DataTypes.STRING
    })
}
