const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

const DetalleCompras = sequelize.define('detalle_compras', {
  id : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  compra_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'compras',
        key: 'id'
     }
  },
  producto: {
      type: DataTypes.STRING(100),
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
  total: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false
  },
},{
  timestamps: true
})

module.exports = DetalleCompras;