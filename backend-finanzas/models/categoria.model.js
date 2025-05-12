// models/categoria.model.js
module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define("Categoria", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Categoria" // nombre exacto de la tabla en la BD
  });

  return Categoria;
};
