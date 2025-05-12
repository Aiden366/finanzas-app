const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nombre_bd', 'usuario', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.Usuario = require('./usuario.model')(sequelize, Sequelize);
db.Categoria = require('./categoria.model')(sequelize, Sequelize);
db.Movimiento = require('./movimiento.model')(sequelize, Sequelize);

// Relaciones
db.Categoria.hasMany(db.Movimiento, { foreignKey: 'categoria_id' });
db.Usuario.hasMany(db.Movimiento, { foreignKey: 'usuario_id' });
db.Movimiento.belongsTo(db.Categoria, { foreignKey: 'categoria_id' });
db.Movimiento.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

module.exports = db;
