const jwt = require('jsonwebtoken')

module.exports.verificacionUsuario = async (req,res,next)=>{
    let token = req.headers.authorization
    console.log(token)
    if (token != undefined){
        let tokenchk = token.split(' ')[1]
        let resultado = jwt.verify(tokenchk, process.env.SECRET_KEY)
        //console.log(resultado)
        if (resultado){
            return next
        }else {
            throw new Error ('Token no valido')
        }
    }else {
        res.status(400).json('Este sistema es privado y seguro, necesita un Token para ingresar')
    }
}