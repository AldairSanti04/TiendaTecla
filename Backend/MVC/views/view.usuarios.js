const sequelize = require('../../db/db')
const controladorUsuarios = require('../controllers/controller.usuarios')
const middUser = require('../../middleware/middUsuarios')


module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })

    app.post('/login', middUser.chkDatosLogin, async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            if (resultado){
                let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: usuarioInfo })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message})
        }
    })

    // Ruta para usuario administrador
    app.get('/index',  async (req,res)=>{
        try{
            res.render('index');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })

        //ruta para enlistar
        app.get('/usuarios', async(req,res)=> {
            try {
                let resultado = await controladorUsuarios.listarUsuarios()
                res.send(200,resultado)
                res.render('listarUsu.ejs', {results:resultado});
            }catch (err){
                console.log(err)
                res.status(400).json('Error al dirigirse a la ruta vistas')
            }
        })
    
        //Rutas para agregar y guardar un nuevo producto
        app.get('/create',  async (req,res)=>{
            try{
                res.status(200).json('estas en la pagina crear');
                res.render('crearUsu.ejs')
            }catch (err){
                console.log(err)
                res.status(400).json('Error al dirigirse a la pagina CREAR')
            }
        })
    
        app.post('/save', middUser.verificacionUsuario, async (req,res)=>{
            try{
                let resultado = await controladorUsuarios.guardarUsuario(req.body)
                if(resultado) {
                    console.log('Usuario Agregado Correctamente');
                    res.send(200,resultado)
                    res.redirect('/usuarios');
                }
            }catch (err){
                res.status(400).json('No se puedo crear el usuarios')
            }
        })

        app.post('/nuevoUsuario', async (req,res)=>{
            let usuario = req.body
            try{
                let guardado = await controladorUsuarios.guardarNuevoUsuario(req.body)
                if(guardado) {
                    let resultado = await controladorUsuarios.chequearUsuario(usuario)
                    if (resultado){
                        let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                        let tokenResult = await controladorUsuarios.generaToken(usuario)
                        res.json({ token: tokenResult, user: usuarioInfo })
                    }else {
                        throw new Error ("Contraseña Incorrecta")
                    }
                    res.redirect('/usuarios');
                }
            }catch (err){
                res.status(400).json('No se puedo crear el usuarios')
            }
        })
    
        // ruta para modificar usuario
        app.get('/edit/:id', async (req,res)=>{
            let data = req.params.id;
            try {
                let resultado = await controladorUsuarios.buscarUsuario(data)
                res.render('editUsu.ejs', {result:resultado.dataValues })
                res.send(200,resultado[id]);
            }catch (err){
                res.status(400).json('Error al dirigirse a la pagina EDITAR')
            }
        })
    
        app.post('/update', middUser.verificacionUsuario, async (req, res)=>{
            try {
                let resultado = await controladorUsuarios.modificarUsuario(req.body);
                if(resultado){
                    res.redirect('/usuarios');
                    res.send(200,resultado);
                }
            } catch (error) {
                res.status(400).json('No se puedo modificar el usuarios')
            }
        });
    
        // ruta para eliminar usuario
        app.get('/delete/:id', middUser.verificacionUsuario, async (req,res)=>{
            let data = req.params.id;
            try {
                let resultado = await controladorUsuarios.eliminarUsuario(data)
                if(resultado){
                    res.redirect('/usuarios');
                    res.send(200,'Elemento eliminado');
                }      
            }catch (err){
                res.status(400).json('No se puedo eliminar el usuario')
            }
        })
}