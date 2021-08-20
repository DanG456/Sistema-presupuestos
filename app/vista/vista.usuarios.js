//Se importan los modulos necesarios
const controllerUsers = require('../controlador/controlador.usuarios')
const midd = require('../../midd/midd');
const bcrypt = require("bcryptjs");
const Usuario = require("../../db/connection")

//Se exportan los modulos a ser utilizados
//Metodos GET
module.exports = async (app) => {
    //Se levanta el servidor
    app.listen(process.env.PORT, () => {
        console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
     });
    
    app.get('/usuarios', async(req,res)=>{
        try {
            let resultado = await controllerUsers.showUsers()
            res.status(200).json({ message: "Datos recuperados exitosamente", resultado})
        } catch (err) {
            console.log(err.message)
            res.status(500).json({ message: "Error en el servidor", error: err.message})
        }
    })
}

//Metodos POST
module.exports = async (app) =>{

    app.post("/register", midd.checkAccesData, async (req, res) => {
        try {
          req.body.password = bcrypt.hashSync(req.body.password, 10); // aqui nos pasa la contraseña ya encriptada
          const user = await Usuario.create(req.body);
          res.json(user);
        } catch (error) {
          res
            .status(400)
            .render("404", {
              msj: error.message,
              titulo: "Error al realizar su registro",
            });
        }
    });

    app.post("/login",  async (req, res) => {
        try {
          const user = await Usuario.findOne({ where: { email: req.body.email } });
          console.log(req.body.email)
          if (user) {
            Usuario
            const iguales = bcrypt.compareSync(req.body.password, user.password);
            if (iguales) {
              let token = await controllerUsers.generateToken(req.body);
              res.json({usuario:user,token:token});
            } else {
              res.json("Usuario o contraseña no coinciden");
            }
          } else {
              res.json("Usuario o contraseña no coinciden");
          }
          
        } catch (error) {
          res
            .status(400)
            .render("404", {
              msj: error.message,
              titulo: "Error al realizar su registro",
            });
        }
    });
}

  
 //Metodos UPDATE 

 module.exports = async(app) => {
    app.put("/changePass",  async (req, res) => {
        try {
          const user = await Usuario.findOne({ where: { email: req.body.email } });
          console.log(req.body.email)
          if (user) {
            user.password = bcrypt.hashSync(req.body.password, 10);
            await user.save();
            res.json(user);
          } else {
              res.json("Usuario no encontrado");
          }
          
        } catch (error) {
          res
            .status(400)
            .render("404", {
              msj: error.message,
              titulo: "Error al realizar su registro",
            });
        }
      });
 }
  
  