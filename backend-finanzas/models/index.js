const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("finanzas_personales", "root", "root", {
  host: "localhost",
  dialect: "mysql"
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Movimiento = require("./movimiento.model")(sequelize, DataTypes);
db.Categoria = require("./categoria.model")(sequelize, DataTypes);

// Llamar las asociaciones si existen
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
