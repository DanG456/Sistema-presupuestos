// Importamos los modulos necesarios
const Presupuesto = require('../controlador/controlador.presupuesto')
const midd = require('../../midd/midd')

//Exportamos nuestros modulos
module.exports = async (app) =>{
    app.get('/', async (req,res)=>{
        try {
            const presupuesto= await Presupuesto.findAll();// recupera todos los registros de la tabla, regresa una promesa
            res.json(presupuesto) 
        } catch (error) {
            res.status(400).render('404', {msj: error.message , titulo: 'Error en la consulta'})
        }
    });
    app.post('/', async (req,res)=>{
        try {
            const presupuesto= await Presupuesto.create(req.body);
            res.json(presupuesto); 
        } catch (error) {
            res.status(400).render('404', {msj: error.message , titulo: 'Error al agregar el presupuesto'})
        }
    });
    app.put('/:presupuestoId', async (req,res)=>{
        try { 
            await Presupuesto.update(req.body,{
                where:{idPresupuesto: req.params.productoId }
            });
            res.json ({ success: 'Se ha modificado con éxito' })
        } catch (error) {
            res.status(400).render('404', {msj: error.message , titulo: 'Error al modificar los datos'})
        }
    });
        
    app.delete('/:presupuestoId', async (req,res)=>{
        try {
            await Presupuesto.destroy({
                where:{idPresupuesto: req.params.presupuestoId }
            });
            res.json ({ success: 'Se ha eliminado el registro con éxito' })
        } catch (error) {
            res.status(400).render('404', {msj: error.message , titulo: 'No se ha podido eliminar'})
        }
    });
        
    
}