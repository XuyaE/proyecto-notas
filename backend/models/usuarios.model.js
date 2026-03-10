const pool = require ('../db/connection');

async function buscarUsuarioPorEmail (email){
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 ', [email]);
    return result.rows[0];
}

async function crearUsuario (nombre, email, hash){
    const result = await pool.query('INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *',[nombre, email, hash]);

    return result.rows[0];
}

module.exports = {crearUsuario, buscarUsuarioPorEmail};