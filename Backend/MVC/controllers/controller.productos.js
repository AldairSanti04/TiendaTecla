const Productos = require('../models/model.productos')
const sequelize = require('../../db/db');

//Exportamos nuestros Modulos

//Listar Productos
module.exports.listarDatos = async () => {
    try {
    let resultado = await Productos.listar()
    return resultado
    }catch (err) {
        console.log('Error desde el modelo' + err)
        throw new Error ({error: err.message})
    }
}

//Guardar un producto
module.exports.guardar = async (data) => {
    try {
        await Productos.create(({nombre_producto: data.nombre_producto, precio_producto: data.precio_producto, imagen_producto: data.imagen_producto, cantidad_inventario: data.cantidad_inventario, categoria: data.categoria}))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};

//Eliminar un producto
module.exports.eliminar = async (data) => {
    try {
        await Productos.destroy({
            where: { id : data}
        })
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el producto seleccionado')
    }
};

//Seleccionar un solo Producto por ID
module.exports.buscaProducto = async (data) => {
    try {
    let resultado = await Productos.listarProducto(data)
    return resultado
    }catch (err) {
        console.log('Error desde el modelo' + err)
        throw new Error ({error: err.message})
    }
}

//Modificar Producto
module.exports.modificar = async (data) => {
    try {
        await Productos.update({nombre_producto: data.nombre_producto, precio_producto: data.precio_producto, imagen_producto: data.imagen_producto, cantidad_inventario: data.cantidad_inventario, categoria: data.categoria}, {where: { id : data.id}})
        return true;
    }catch (err){
        throw new Error ('No se pudo actualizar el producto seleccionado')
    }
}