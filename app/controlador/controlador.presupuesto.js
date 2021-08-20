//Se importan los modulos a utilizar
const modelBudget = require('../modelo/modelo.usuarios')

//Exportamos nuestros modulos
module.exports.createBudget = async (budget)=> {
    let newBudget = [
        budget.fecha_creacion,
        budget.nombre,
        budget.versiones,
    ]
    try {
        let resultado = await modelBudget.Budgetnew(newBudget)
        if (resultado) {
            return 'Presupuesto creado correctamente'
        }else {
            
            throw new Error ('Error en la creacion del presupuesto o el presupuesto ya existe')
        }

    }catch (err) {
        console.log(err)
        throw new Error ('Error en la creacion del presupuesto')
    }
}

module.exports.deleteBudget = async(budget)=>{
    let delbud=req.params.nombre
    try{
        if(modelBudget.delBudgetChk(budget)){
            delete delbud
            return true
        }else{
            return false
        }
        
    }catch(err){
        console.log(err)
        throw new Error ('No se pudo borrar el presupuesto especificado')
    }
    
}

module.exports.updateBudget = async(newBud,currBud) => {
    try{
        const updateBudget = await modelBudget.Update(newBud,currBud)
        return updateBudget
    }catch(err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.showBudgets=async ()=>{
    try{
        let budgetShow = await sequelize.query('SELECT * FROM presupuestos')
      return budgetShow
    }catch(err){
        console.log(error)
      throw new Error ('Ocurrio un error en la consulta de presupuestos')
    }
}
