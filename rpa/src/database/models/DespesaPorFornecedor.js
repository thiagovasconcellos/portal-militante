const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize(config.database);

const DespesaPorFornecedor = sequelize.define('DespesaPorFornecedor', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  matricula: {
    type: DataTypes.STRING
  },
  tipoDespesa: {
    type: DataTypes.STRING
  },
  fornecedor: {
    type: DataTypes.STRING
  },
  cpfCnpj: {
    type: DataTypes.STRING
  },
  valor: {
    type: DataTypes.DECIMAL
  }
}, {
  tableName: 'despesasPorFornecedor'
});

module.exports = { DespesaPorFornecedor };