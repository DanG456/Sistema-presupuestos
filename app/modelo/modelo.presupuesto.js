//Se importan los modulos a utilizar
const { Model } = require('sequelize')
const sequelize = require('sequelize')
const dbmodelBudget = require('../../db/db.modelos.usuarios')

//Exportamos los modulos a utilizar

module.exports.delBudgetChk = async (name) =>{
    let budget=[name.nombre, name.versiones]
    try{
        let budgetconfirmation = await dbmodelBudget.findOne({where:{nombre: `${budget[0]}`}})
        if(budgetconfirmation != null){
            let check= await dbmodelBudget.findOne({where:{versiones: `${budget[1]}`}})
            if(check != null){
                await dbmodelBudget.destroy({where:{nombre: `${budget[0]}`,versiones: `${budget[1]}`}})
            }else{
                return false;
            }
        }else{
            return false;
        }
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}

module.exports.Budgetnew = async (bud)=> {
    console.log(bud)
    try {
        let resultado = await dbmodelBudget.findOne({where:{nombre: bud[1]}})
        console.log(resultado)
        if (resultado != null){
            let result = await dbmodelBudget.findOne({where:{versiones: bud[2]}})
            if(result != null){
                return false    
            }
        }else {
            await dbmodelBudget.create({fecha_creacion: bud[0], nombre: bud[1], versiones: bud[2]})
            return true
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }

}

module.exports.Update = async (newBud,currBud) => {
    try{
        let updateBud = await dbmodelBudget.update({nombre: [newBud]},{where: {nombre: [currBud]}})
        return updateBud
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}
