const sequelize = require('../../db/db')
const controladorUsuarios = require('../controllers/controller.usuarios')

module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login' , async (req,res)=>{
        res.render('login')
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
            res.status(400).json('Usuario o contrasena incorrecta')
        }
    })
}