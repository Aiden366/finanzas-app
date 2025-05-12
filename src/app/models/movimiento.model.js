module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movimiento', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: DataTypes.ENUM('ingreso', 'gasto')
    },
    monto: DataTypes.DECIMAL(10, 2),
    descripcion: DataTypes.TEXT,
    fecha: DataTypes.DATEONLY,
    categoria_id: DataTypes.INTEGER,
    usuario_id: DataTypes.INTEGER
  }, {
    tableName: 'movimientos',
    timestamps: false
  });
};
