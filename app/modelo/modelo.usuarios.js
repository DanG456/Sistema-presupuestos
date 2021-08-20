//Se importan los modulos a utilizar
const { Model } = require('sequelize')
const sequelize = require('sequelize')
const Usuarios = require('../../db/db.modelos.usuarios')

//Exportamos los modulos a utilizar

module.exports.Userexists = async (usr) =>{
    let user = [usr.mail , usr.pass]
    try {
        let resultado = await Usuarios.findOne({where: {name: `${user[0]}`}})
        console.log(resultado)
        if (resultado != null) {
            let check = await Usuarios.findOne({where: {pass: `${user[1]}`}})
            if (check != null) {
                return true
            }else {
                return false
            }
        }else {
            return false
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
}


