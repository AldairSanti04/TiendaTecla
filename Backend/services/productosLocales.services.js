const sequelize = require('../db/db')

module.exports.listarProductos = async ()=>{
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.productos')
        return resultado[0]
    }catch (err){
        console.log(err)
        throw new Error ('Ocurrio un problema en la consulta con la DB')
    }
}