//Importo los modulos necesarios
const jwt = require('jsonwebtoken')


//Exporto los modulos de trabajo

module.exports.generaToken = async (data)=> {
    const resultado = jwt.sign({
        data} , process.env.SECRET_KEY 
    ) //Tiempo maximo 15 minutos de validez
    return resultado
}
