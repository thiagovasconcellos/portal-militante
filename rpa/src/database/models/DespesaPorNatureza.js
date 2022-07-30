const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize(config.database);

const DespesaPorNatureza = sequelize.define('DespesaPorNatureza', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  matricula: {
    type: DataTypes.STRING
  },
  naturezaDespesas: {
    type: DataTypes.DECIMAL
  },
  valor: {
    type: DataTypes.DECIMAL
  }
}, {
  tableName: 'despesasPorNatureza'
});

// `sequelize.define` also returns the model
module.exports = { DespesaPorNatureza };