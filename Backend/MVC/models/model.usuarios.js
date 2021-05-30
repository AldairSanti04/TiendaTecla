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
    let resultado = await Usuarios.findOne({where: {email:usr.email}})
    if (resultado === null){
        return false
    }else {
        return true
    }
  }

  module.exports.usuarioAutenticado = async (usr)=>{
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

  module.exports.nuevoUsuario = async (data)=> {
    try {
        let resultado = await Usuarios.findOne({where:{usuario: data.usuario}})
        if (resultado != null){
          alert("Error en la creacion del usuario o el usuario ya existe")
          //throw new Error ('Error en la creacion del usuario o el usuario ya existe')
          return false; 
        }else {            
            await Usuarios.create(({nombres: data.nombres, apellidos: data.apellidos, email: data.email, usuario: data.usuario, pass: data.pass, tipo_usuario: data.tipo_usuario}))
            return true;
        }
    }catch (err) {
        console.log(err)
        throw new Error (err)
    }
  }

  module.exports.buscarUsuarios = async (data) => {
    try{
      let resultado = await Usuarios.findAll({
        where: { id : data }
      })
      return resultado[0]
    }catch (err) {
      throw new Error (err)
    }
  }