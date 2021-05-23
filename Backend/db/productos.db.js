const {DataTypes, Model} = require('sequelize')
const sequelize = require('./db')

//Definir mi Modelo con que voy a trabajar
const Productos = sequelize.define('productos', {
    nombre_producto : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio_producto: {
        type: DataTypes.FLOAT(),
        allowNull: false,
    },
    imagen_producto: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    cantidad_inventario: {
      type: DataTypes.INTEGER(),
      allowNull: false
    }
  },{
    timestamps: false
  })

module.exports = Productos