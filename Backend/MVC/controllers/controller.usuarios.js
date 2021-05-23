const Usuarios = require('../models/model.usuarios');
const sequelize = require('../../db/db');
const jwt = require('jsonwebtoken');

//Exportar mis modulos
module.exports.generaToken = async (data)=>{
    try {
        let resultado = jwt.sign({
            data}, process.env.SECRET_KEY
        )
        return resultado
    }catch (err){
        console.log(err)
        throw new Error (err)
    }
}

module.exports.chequearUsuario = async (usr)=>{
    let usrchk = usr
    try {
        let resultado =  await Usuarios.existenciaDeUsuario(usrchk)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No existe el usuario')
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}

module.exports.datosUsuario = async (usr) => {
    let usrchk = usr
    try {
        let resultado =  await Usuarios.recuperarInfoUser(usrchk)
        if (resultado) {
            return resultado
        }else {
            throw new Error ('No hay datos de Usuario')
        }
    }catch (err){
        console.log(err)
        throw new Error (' no semuy bien que paso')
    }
}