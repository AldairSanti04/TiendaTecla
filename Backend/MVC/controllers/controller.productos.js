const Productos = require('../models/model.productos')
const sequelize = require('../../db/db');
const newProducto = require('../../db/productos.db')

//Exportamos nuestros Modulos

//Listar Productos
module.exports.listarDatos = async (data)=> {
    try {
    let rst = new Productos (data)
    let resultado = await rst.listar()
    return resultado
    }catch (err) {
        console.log('Error desde el modelo' + err)
        throw new Error ({error: err.message})
    }
}

//Guardar un producto
module.exports.guardar = async (data)=>{
    try {
        await newProducto.create(({nombre_producto: data.nombre_producto, precio_producto: data.precio_producto, imagen_producto: data.imagen_producto, cantidad_inventario: data.cantidad_inventario}))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};

//Eliminar un producto
module.exports.eliminar = async (data)=>{
    try {
        await newProducto.destroy({
            where: { id : data}
        })
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el producto seleccionado')
    }
};

//Seleccionar un solo Producto por ID
module.exports.buscaProducto = async (data)=> {
    try {
    let rst = new Productos(data)
    let resultado = await rst.listarProducto(data)
    return resultado
    }catch (err) {
        console.log('Error desde el modelo' + err)
        throw new Error ({error: err.message})
    }
}

//Modificar Producto
module.exports.modificar = async(data) => {
    console.log(data);
    try {
        await newProducto.update({nombre_producto: data.nombre_producto, precio_producto: data.precio_producto, imagen_producto: data.imagen_producto, cantidad_inventario: data.cantidad_inventario}, {where: { id : data.id}})
        return true;
    }catch (err){
        throw new Error ('No se pudo actualizar el producto seleccionado')
    }
}