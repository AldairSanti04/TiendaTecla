const sequelize = require('../../db/db')
const controladorUsuarios = require('../controllers/controller.usuarios')
const middUser = require('../../middleware/middUsuarios')

module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            console.log(err)
            res.estatus(400).json('No se puede mostrar')
        }
    })

    app.post('/login', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            if (resultado){
                let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: usuarioInfo })
            }else {
                throw new Error (err)
            }
        }catch (err){
            console.log(err)
            res.status(400).json('Usuario o contraseña incorrecta')
        }
    })

    // Ruta para usuario administrador
    app.get('/index', async (req,res)=>{
        try{
            res.render('index');
        }catch (err){
            console.log(err)
            res.estatus(400).json('No se puede mostrar')
        }
    })
}