require('dotenv').config();
const express = require('express');
const cors = require('cors');

const notasRoutes = require('./routes/notas.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/notas', notasRoutes);
app.use('/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
});