//Se importan los modulos necesarios

//Express
const express=require('express');
const app = express();
const sequelize = require('sequelize');
//Dotenv
require('dotenv').config();
//COR
const cors = require('cors');
//Middlewares
const midd = require('./midd/midd');
//Modelos de BD
const UsersDB = require('./db/db.modelo.usuarios')
const BudgetDB = require('./db/db.modelo.presupuesto')
//Vistas
const UsersView = require('./app/vista/vista.usuarios')
const Budgetview = require('./app/vista/vista.presupuesto')

//Middlewares globales
//Json
app.use(express.json())
//CORS
app.use(cors());
//Rate limit;
app.use(midd.activityLimit);

//Configuraciones globales
app.use(express.static(__dirname + '/public'))
app.set('view engine','ejs')
app.set('views', __dirname + '/views')

//Iniciamos el servidor
async function serverStart(){
    try{
        await UsersDB.sync({alter: true});
        await BudgetDB.sync({alter: true});
        await sequelize.authenticate();
        console.log("Conexión con la base de datos establecida correctamente");
        app.listen(process.env.PORT, function (){
            console.log(`Sistema iniciado en http://${process.env.HOST}:${process.env.PORT}`)
        })
    }catch(error){
        console.error('No se pudo conectar correctamente con la base de datos');
    }
}

serverStart();

// Implementamos nuestras vistas
UsersView(app)
Budgetview(app)