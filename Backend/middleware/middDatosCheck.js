const Joi = require('joi')

//Exportamos nuestro Schema

module.exports = {

    modeloLogin : Joi.object().keys({
        email:Joi.string().email().required(),
        pass: Joi.string().regex(/^[a-zA-Z0-9]{6,16}$/).min(6).required()
    }).with('email', 'pass'),

    modeloAltaProducto : Joi.object().keys({
        nombre_producto: Joi.string().min(6).max(50).required(),
        precio_producto: Joi.number().required(),
        imagen_producto: Joi.string().min(6).max(250).required(),
        cantidad_inventario: Joi.number().required(),
        categoria: Joi.string().min(6).max(50).required()
    }),

    modeloModProducto : Joi.object().keys({
        id: Joi.number().required(),
        nombre_producto: Joi.string().min(6).max(50).required(),
        precio_producto: Joi.number().required(),
        imagen_producto: Joi.string().min(6).max(250).required(),
        cantidad_inventario: Joi.number().required(),
        categoria: Joi.string().min(6).max(50).required()
    }),

}