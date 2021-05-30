const Compras = require('../models/model.compras')
const sequelize = require('../../db/db');

//Guardar una Compra
module.exports.nuevaCompra = async (data) => {
    try {
        console.log(data);
        await Compras.create(({cliente_id: data.cliente_id, total: data.total, calle: data.calle, pais: data.pais, estado: data.estado, codigo_postal: data.codigo_postal, forma_de_pago: data.forma_de_pago}))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};