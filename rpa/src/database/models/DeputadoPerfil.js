const { Sequelize, DataTypes } = require('sequelize');
const config = require('../../config');
const sequelize = new Sequelize(config.database);

const DeputadoPerfil = sequelize.define('DeputadoPerfil', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  matricula: {
    type: DataTypes.STRING
  },
  avatar: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  telefone: {
    type: DataTypes.STRING
  },
  biografia: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'deputadoPerfil'
});

// `sequelize.define` also returns the model
module.exports = { DeputadoPerfil };