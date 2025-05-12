module.exports = (sequelize, DataTypes) => {
  const Movimiento = sequelize.define("Movimiento", {
    tipo: {
      type: DataTypes.ENUM("ingreso", "gasto"),
      allowNull: false,
    },
    monto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    tableName: "Movimientos"  // Aquí debe ir como parte de las configuraciones
  });

  Movimiento.associate = (models) => {
    Movimiento.belongsTo(models.Categoria, {
      foreignKey: "categoria_id",
      as: "categoria"
    });
  };


  return Movimiento;
};
