const jwt = require('jsonwebtoken')
const Joi = require('joi')
const {modeloLogin, modeloAltaProducto, modeloModProducto} = require('./middDatosCheck')

module.exports.verificacionUsuario = async (req,res,next)=>{
    let token = req.headers.authorization
    if (token != undefined){
        try {
            let tokenchk = token.split(' ')[1]
            let verificado = jwt.verify(tokenchk, process.env.SECRET_KEY)
            if (verificado){
                next();                
            } else  {
                throw new Error ('Token no valido')  
            }
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }else {
        res.status(400).json('Este sistema es privado y seguro, necesita un Token para ingresar')
    }
}

module.exports.chkDatosLogin = async (req,res,next)=> {
    try{
        await Joi.attempt(req.body, modeloLogin, 'Los datos ingresados no son correctos para el login')
        return next()
    }catch (err){
        console.log(err)
        res.status(500).json({error: err.message})
    }
}

module.exports.chkDatosAltaProducto = async (req,res,next)=> {
    try {
        await Joi.attempt(req.body, modeloAltaProducto, 'Los datos ingresados no son correctos para realizar el alta de un producto')
        return next()
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})
    }
} 

module.exports.chkDatosModificarProducto = async (req,res,next)=> {
    try {
        await Joi.attempt(req.body, modeloModProducto, 'Los datos ingresados no son correctos para actualizar un producto')
        return next()
    }catch(err){
        console.log(err)
        res.status(500).json({error : err.message})
    }
} 