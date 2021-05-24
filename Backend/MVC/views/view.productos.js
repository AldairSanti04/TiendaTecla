const sequelize = require('../../db/db')
const controladorProductos = require('../controllers/controller.productos')
const middUser = require('../../middleware/middUsuarios')

module.exports = async (app)=> {
    
    //ruta para enlistar productos
    app.get('/listado', async (req,res)=>{
        let data = req.params.metodo
        try{
            let resultado = await controladorProductos.listarDatos(data)
            res.render('listar', {results:resultado})
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta')
        }
    })

    //Rutas para agregar y guardar un nuevo producto
    app.get('/agregar', async (req,res)=>{
        res.render('agregar');
    })

    app.post('/guardar', middUser.verificacionUsuario, async (req, res)=>{
        let resultado = await controladorProductos.guardar(req.body);
        if(resultado){
            console.log('Producto Agregado Correctamente');
            res.redirect('/agregar');
        }
    });

    // ruta para modificar producto
    app.get('/modificar/:id' , async (req,res)=>{
        let data = req.params.id
        try{
            let resultado = await controladorProductos.buscaProducto(data)
            res.render('editarproducto', {result:resultado.dataValues})
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta')
        }
    })

    app.post('/actualizar', middUser.verificacionUsuario, async (req, res)=>{
        try {
            let resultado = await controladorProductos.modificar(req.body);
            if(resultado){
                res.redirect('/listado');
            }
        } catch (error) {
            res.status(400).json('No se puedo eliminar el producto')
        }
    });

    //ruta para Eliminar registro
    app.get('/eliminar/:id', middUser.verificacionUsuario, async (req, res) => {
        let data = req.params.id
        try{
            let resultado = await controladorProductos.eliminar(data)
            if(resultado){
                res.redirect('/listado');
            }
        }catch (err){
            res.status(400).json('No se puedo eliminar el producto')
        }
    })

}