//Se importan los modulos a utilizar
const modelUsers = require('../modelo/modelo.usuarios')
const jwt = require('jsonwebtoken')
const Joi = require('joi');
//Exportamos nuestros modulos

module.exports.generateToken = async (data)=> {
    const token = jwt.sign({
        data} , process.env.SECRET_KEY 
    ) //Tiempo maximo 15 minutos de validez
    return token
}

module.exports.verifyUser = async (token)=> {
    const resultado = jwt.verify(token, process.env.SECRET_KEY)

    if(resultado){
        return resultado
    }else {
        throw new Error ('Token no valido!')
    }
}

module.exports.checkUser = async(usr)=>{
    try {
        let resultado = await modelUsers.Userexist (usr)
        console.log(resultado)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No existe el Usuario')
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}

module.exports.loginDTO = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).with('nombre', 'password'); //Si viene con usuario tambien debe existir la contraseña

module.exports.altaUserDTO = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});