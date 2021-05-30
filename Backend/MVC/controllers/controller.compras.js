const Compras = require('../models/model.compras')
const Detalles = require('../models/model.detalle')
const sequelize = require('../../db/db');

//Guardar una Compra
module.exports.nuevaCompra = async (data) => {
    try {
        await Compras.create(({id: data.id, cliente_id: data.cliente_id, total: data.total, calle: data.calle, pais: data.pais, estado: data.estado, codigo_postal: data.codigo_postal, forma_de_pago: data.forma_de_pago}))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};

module.exports.nuevosDetalles = async (data) => {
    try {
        await Detalles.create(({
            compra_id: data.compra_id, 
            producto: data.producto, 
            precio: data.precio, 
            cantidad: data.cantidad, 
            subtotal: data.subtotal }))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};