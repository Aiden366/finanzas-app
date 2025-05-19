module.exports = (app) => {
  const movimientos = require("../controllers/movimiento.controller");
  const router = require("express").Router();

  // Rutas específicas primero
  router.get('/resumen-mensual', movimientos.obtenerResumenMensual);  // Resumen mensual

  // Rutas con parámetros después
  router.get("/", movimientos.findAll);                // Obtener todos los movimientos
  router.post("/", movimientos.create);                // Crear un nuevo movimiento
  router.get("/:id", movimientos.findById);            // Obtener un movimiento específico por ID
  router.put("/:id", movimientos.update);              // Actualizar movimiento por ID
  router.delete("/:id", movimientos.delete);           // Eliminar movimiento por ID

  app.use("/api/movimientos", router);
};
