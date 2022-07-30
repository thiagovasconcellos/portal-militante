const Path = require('path');

const storage = Path.resolve(__dirname, 'database', 'default.sqlite');

module.exports = {
  database: {
    dialect: 'sqlite',
    storage
  }
}