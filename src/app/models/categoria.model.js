module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Categoria', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: DataTypes.STRING
  }, {
    tableName: 'categorias',
    timestamps: false
  });
};
