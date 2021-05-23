const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

//Definir mi Modelo con que voy a trabajar
const Usuarios = sequelize.define('usuarios', {
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