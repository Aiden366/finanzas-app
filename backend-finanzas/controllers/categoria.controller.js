const db = require("../models");
const Categoria = db.Categoria;

// Obtener todas las categorías
exports.findAll = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva categoría
exports.create = async (req, res) => {
  try {
    const nueva = await Categoria.create({ nombre: req.body.nombre });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar categoría
exports.update = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ message: "Categoría no encontrada" });

    await categoria.update({ nombre: req.body.nombre });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar categoría
exports.delete = async (req, res) => {
  try {
    const eliminado = await Categoria.destroy({ where: { id: req.params.id } });
    if (eliminado === 1) {
      res.json({ message: "Categoría eliminada" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
