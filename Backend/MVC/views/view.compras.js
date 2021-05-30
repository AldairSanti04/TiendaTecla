const sequelize = require('../../db/db')
const controladorCompras = require('../controllers/controller.compras')
const middUser = require('../../middleware/middUsuarios')

module.exports = async (app)=> {
    app.post('/comprar', middUser.verificacionUsuario, async (req,res)=>{
        let data = req.body
        try{
            let resultado = await controladorCompras.nuevaCompra(data)
            res.send(resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta')
        }
    })

    app.post('/detalleCompra', middUser.verificacionUsuario, async (req, res) => {
        let data = req.body
        try{
            let resultado = await controladorCompras.nuevosDetalles(data)
            res.send(resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error en la consulta')
        }
    })
}