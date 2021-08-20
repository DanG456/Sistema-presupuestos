//Se importan los modulos necesarios
const rateLimit = require('express-rate-limit')
const userController = require('../app/controlador/controlador.usuarios')

module.exports.activityLimit = rateLimit({
    windowMs = 30 * 60 * 1000, //30 minutos de uso
    max: 100, //10 peticiones por ventana
    message: "Se ha excedido el numero de accesos a la API"
})

module.exports.validUser = async (req,res,next)=>{
    try {
        if (req.headers.authorization != undefined){
            const token = req.headers.authorization.split(' ')[1]
            let verificado = await userController.verifyUser(token)
            console.log(verificado)
            req.params.usuario = verificado.data
            return next()
        }else{
            throw new Error ('Este es un sistema seguro y requiere autorización')
        }
    }catch (err){
        console.log(err.message)
        res.status(500).json({error: err.message})
    }
}

module.exports.checkLoginData = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, loginDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports.checkAccesData = async(req, res, next) => {
    try {
        await Joi.attempt(req.body, altaUserDTO, "Los datos enviados no son correctos");
        return next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}