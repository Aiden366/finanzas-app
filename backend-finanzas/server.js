const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'dist/nombre-de-tu-app')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/nombre-de-tu-app/index.html'));
});


app.use(cors());
app.use(express.json());

// Importar y sincronizar DB
const db = require("./models");
db.sequelize.sync().then(() => {
  console.log("Base de datos conectada.");
});

// Cargar rutas
require("./routes/movimiento.routes")(app);
require("./routes/categoria.routes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
