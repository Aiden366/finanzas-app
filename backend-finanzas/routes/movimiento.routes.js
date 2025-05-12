module.exports = (app) => {
  const movimientos = require("../controllers/movimiento.controller");
  const router = require("express").Router();

  // Rutas para manejar movimientos
  router.get("/", movimientos.findAll);                // Obtener todos los movimientos
  router.post("/", movimientos.create);                 // Crear un nuevo movimiento
  router.put("/:id", movimientos.update);               // Actualizar movimiento por ID
  router.delete("/:id", movimientos.delete);           // Eliminar movimiento por ID
  router.get('/resumen-mensual', movimientos.obtenerResumenMensual);  // Resumen mensual

  // Ruta para obtener un movimiento por ID
  router.get("/:id", movimientos.findById); // Ruta para obtener un movimiento específico por ID

  app.use("/api/movimientos", router);
};
