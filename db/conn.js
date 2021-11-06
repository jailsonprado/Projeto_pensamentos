const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectado com sucesso ao Mysql');
} catch (err) {
  console.log(`Náo foi possivel conectar:  ${err}`);
}

module.exports = sequelize;
