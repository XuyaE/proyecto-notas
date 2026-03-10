const {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota
} = require('../models/notas.model');

async function getNotas(req, res) {
  const userId = req.usuario.id;
  const notas = await obtenerNotas(userId);
  res.json(notas);
}

async function postNota(req, res) {
  const { texto, titulo} = req.body;
  const userId = req.usuario.id;
  if (!texto || !texto.trim()) {
    return res.status(400).json({ error: 'Texto requerido' });
  }
  
  const nuevaNota = await crearNota(texto.trim(),userId,titulo);
  res.status(201).json(nuevaNota);
}

async function putNota(req, res) {
  const { id } = req.params;
  const { texto, titulo } = req.body;

  const notaActualizada = await actualizarNota(id, texto, titulo);
  if (!notaActualizada) {
    return res.status(404).json({ error: 'Nota no encontrada' });
  }

  res.json(notaActualizada);
}

async function deleteNota(req, res) {
  const { id } = req.params;

  const notaEliminada = await eliminarNota(id);
  if (!notaEliminada) {
    return res.status(404).json({ error: 'Nota no encontrada' });
  }

  res.status(204).send();
}

module.exports = {
  getNotas,
  postNota,
  putNota,
  deleteNota
};