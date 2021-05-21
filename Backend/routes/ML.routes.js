const MLservices = require('../services/ML.services')

module.exports = (app) => {

    app.get('/productos', async function (req, res){
        try {
            let result = await MLservices.mandarProductos();
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });
    
    app.get('/buscar/:palabra', async (req, res) => {
        try {
            let result = await MLservices.mandarBusqueda(req.params.palabra);
            res.send(result);
        } catch(error) {
            let errorMensaje = { error: error.message }
            res.status(404).send(errorMensaje);
        }
    })
    
    app.get('/categorias', async function (req, res){
        try {
            let result = await MLservices.mandarCategorias();
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });
    
    app.get('/categorias/:idCategoria', async function (req, res){
        try {
            let result = await MLservices.mandarProductosXcategoria(req.params.idCategoria);
            res.send(result)
        } catch (error) {
            let errorMensaje = { error : error.message }
            res.status(404).send(errorMensaje)
        }
    });
}