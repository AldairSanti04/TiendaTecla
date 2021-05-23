const sequelize = require('../../db/db')
const controladorProductos = require('../controllers/controller.productos')

module.exports = async (app)=> {
    
    //ruta para enlistar productos
    app.get('/listado' , async (req,res)=>{
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
    app.get('/agregar' , async (req,res)=>{
        res.render('agregar');
    })

    app.post('/guardar', async (req, res)=>{
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

    app.post('/actualizar', async (req, res)=>{
        let resultado = await controladorProductos.modificar(req.body);
        if(resultado){
            console.log('Producto Actualizado Correctamente');
            res.redirect('/listado');
        }
    });

    //ruta para Eliminar registro
    app.get('/eliminar/:id', async (req, res) => {
        let data = req.params.id
        try{
            let resultado = await controladorProductos.eliminar(data)
            if(resultado){
                console.log('Producto Eliminado Correctamente');
                res.redirect('/listado');
            }
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta')
        }
    })

}