const db = require("../models");
const Movimiento = db.Movimiento;
const Categoria = db.Categoria;
const { Op } = require('sequelize');

// Obtener todos los movimientos con posible filtro por tipo y categoría
exports.findAll = async (req, res) => {
  try {
    const { tipo, categoria_id } = req.query;
    const condicion = {};

    if (tipo) {
      condicion.tipo = tipo;
    }

    if (categoria_id) {
      condicion.categoria_id = categoria_id;
    }

    const movimientos = await Movimiento.findAll({
      where: condicion,
      include: { model: db.Categoria, as: "categoria" }
    });

    res.json(movimientos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo movimiento
exports.create = async (req, res) => {
  try {
    const { tipo, monto, fecha, categoria_id } = req.body;

    // Validación básica de datos
    if (!tipo || !monto || !fecha || !categoria_id) {
      return res.status(400).json({ message: "Faltan datos requeridos" });
    }

    const nuevo = await Movimiento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un movimiento por ID
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({ message: "Movimiento no encontrado" });
    }

    await movimiento.update(req.body);
    res.json(movimiento);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un movimiento por ID
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await Movimiento.destroy({ where: { id } });

    if (eliminado === 1) {
      res.json({ message: "Movimiento eliminado" });
    } else {
      res.status(404).json({ message: "Movimiento no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener resumen mensual
exports.obtenerResumenMensual = async (req, res) => {
  try {
    const inicioMes = new Date();
    inicioMes.setDate(1);

    const finMes = new Date(inicioMes.getFullYear(), inicioMes.getMonth() + 1, 0);

    const movimientos = await db.Movimiento.findAll({
      where: {
        fecha: {
          [Op.between]: [inicioMes, finMes]
        }
      }
    });

    const resumen = {
      ingresos: 0,
      gastos: 0,
      balance: 0
    };

    movimientos.forEach((mov) => {
      if (mov.tipo === 'ingreso') resumen.ingresos += parseFloat(mov.monto);
      if (mov.tipo === 'gasto') resumen.gastos += parseFloat(mov.monto);
    });

    resumen.balance = resumen.ingresos - resumen.gastos;

    res.json(resumen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener resumen mensual' });
  }
};

// Obtener un movimiento por ID
exports.findById = async (req, res) => {
  try {
    const id = req.params.id;
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({ error: 'Movimiento no encontrado' });
    }

    res.json(movimiento);
  } catch (error) {
    console.error('Error al buscar movimiento:', error);
    res.status(500).json({ error: 'Error al buscar movimiento' });
  }
};
