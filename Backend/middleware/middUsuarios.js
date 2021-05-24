const jwt = require('jsonwebtoken')

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