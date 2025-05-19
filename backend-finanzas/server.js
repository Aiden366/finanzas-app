const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

// Configurar middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y sincronizar DB
const db = require("./models");
db.sequelize.sync().then(() => {
  console.log("Base de datos conectada.");
}).catch(err => {
  console.error("Error al conectar la base de datos:", err);
});

// Cargar rutas
require("./routes/movimiento.routes")(app);
require("./routes/categoria.routes")(app);

// Configurar rutas estáticas y catch-all route al final
app.use(express.static(path.join(__dirname, 'dist/nombre-de-tu-app')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/nombre-de-tu-app/index.html'));
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
