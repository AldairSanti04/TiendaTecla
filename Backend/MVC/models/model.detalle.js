const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

const DetalleCompras = sequelize.define('detalle_compras', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  compra_id: {
    type: DataTypes.STRING(20),
    references: {
        model: 'compras',
        key: 'id'
     },
    allowNull: false,
  },
  producto: {
      type: DataTypes.STRING(250),
      allowNull: false,
  },
  precio: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
},{
  timestamps: false
})

module.exports = DetalleCompras;