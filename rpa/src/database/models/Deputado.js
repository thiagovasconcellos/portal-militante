const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize(config.database);

const Deputado = sequelize.define('Deputado', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  matricula: {
    type: DataTypes.STRING
  },
  deputado: {
    type: DataTypes.STRING
  },
  partido: {
    type: DataTypes.STRING
  },
  legislatura: {
    type: DataTypes.INTEGER
  },
  periodo: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'deputados'
});

// `sequelize.define` also returns the model
module.exports = { Deputado };