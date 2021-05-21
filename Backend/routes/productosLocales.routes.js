const localesServices = require('../services/productosLocales.services')


module.exports = (app)=> {

    app.get('/locales', async (req,res)=> {
        try {
            let resultado = await localesServices.listarProductos()
            res.json(resultado)
        }catch (err) {
            console.log(err)
            res.status(500).json({error: err.message})
        }
    });
}