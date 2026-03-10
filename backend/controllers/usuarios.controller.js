const bcrypt = require('bcrypt');
const {crearUsuario, buscarUsuarioPorEmail} = require('../models/usuarios.model');
const jwt = require('jsonwebtoken');

async function registrar (req, res) {
    const {nombre, email, password, confirmPassword} = req.body;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)*$/;

    try{

        console.log(nombre, email, password, confirmPassword);

        if(!regex.test(email)){
            return res.status(400).json({mensaje: "Correo inválido"});
        }

        const existe = await buscarUsuarioPorEmail(email);
        if(existe){
            return res.status(400).json({mensaje: "El email ya esta regitrado"});
        }

        if(password !== confirmPassword){
            return res.status(400).json({mensaje : "Las contraseñas no coinciden"});
        }

        const hash = await bcrypt.hash(password, 10);

        const nuevoUsuario = await crearUsuario(nombre, email, hash);

        res.json(nuevoUsuario);
    } catch (error) {
        console.error("ERROR EN EL LOGIN/REGISTER:", error);
        res.status(500).json({error: "Error en el servidor"});
    }
}

async function login (req, res) {
    const {email, password} = req.body;

    try{
        const usuario = await buscarUsuarioPorEmail(email);
        if (!usuario) return res.status(400).json({mensaje: "Credenciales Inválidas"});

        const coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(400).json({mensaje: "Credenciales inválidas"});

        const token = jwt.sign(
            {id: usuario.id, email: usuario.email, nombre: usuario.nombre},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({token});
    } catch (error){
        res.status(500).json({error: "Error en el servidor"});
    }
}

async function userInfo (req, res) {
    const usuario = await buscarUsuarioPorEmail(req.usuario.email);
    res.json({
        nombre: usuario.nombre
    });
}

module.exports = {registrar, login, userInfo};