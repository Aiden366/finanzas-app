// routes/categoria.routes.js
module.exports = (app) => {
  const categorias = require("../controllers/categoria.controller");
  const router = require("express").Router();

  router.get("/", categorias.findAll);
  router.post("/", categorias.create);
  router.put("/:id", categorias.update);
  router.delete("/:id", categorias.delete);

  app.use("/api/categorias", router);
};
