const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

//Definir mi Modelo con que voy a trabajar
const Usuarios = sequelize.define('usuarios', {
    id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres : {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING(60),
        allowNull: false,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    tipo_usuario:{
        type: DataTypes.INTEGER(),
        allowNull: false
    }
  },{
    timestamps: true
  })

  module.exports = Usuarios

  module.exports.existenciaDeUsuario = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    let resultado = await Usuarios.findOne({where: {email:usr.email, pass: usr.pass}})
    if (resultado === null){
        return false
    }else {
        return true
    }
  }

  module.exports.recuperarInfoUser = async (usr) => {
    let resultado = await Usuarios.findAll({where: {email:usr.email, pass: usr.pass}})
    if (resultado === null){
      return false
    }else {
      return resultado[0]
    }
  }