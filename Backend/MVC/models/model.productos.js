const sequelize = require('../../db/db')
const Buscar = require('../../db/productos.db')

module.exports = class Producto {
    constructor(datos) {
        this.datos = datos
    }

    async listar() {
        let resultado = await sequelize.query('SELECT * FROM dbo.productos')
        return resultado[0]
    }

    async listarProducto(data) {
        let resultado = await Buscar.findAll({
            where: { id : data }
        })
        return resultado[0]
    }
}