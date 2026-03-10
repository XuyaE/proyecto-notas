const pool = require ('../db/connection.js');

async function obtenerNotas(userId) {
  const result = await pool.query('SELECT * FROM notas WHERE usuario_id = ($1) ORDER BY id ASC',[userId]);
  return result.rows;
}

async function crearNota(texto, usuarioId, titulo) {
  const result = await pool.query(
    'INSERT INTO notas (texto, usuario_id, titulo) VALUES ($1, $2, $3) RETURNING *',
    [texto, usuarioId, titulo]
  );
  return result.rows[0];
}

async function actualizarNota(id, texto, titulo) {
  const result = await pool.query(
    'UPDATE notas SET texto = $1, titulo = $2 WHERE id = $3 RETURNING *',
    [texto, titulo, id]
  );
  return result.rows[0];
}

async function eliminarNota(id) {
  const result = await pool.query(
    'DELETE FROM notas WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  obtenerNotas,
  crearNota,
  actualizarNota,
  eliminarNota
};