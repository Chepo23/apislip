const express = require('express');
const router = express.Router();
const mysqlConexion = require('../conexion').mysqlConexion;

router.post('/register', (req, res) => {
    const { name, email, phone, password, age } = req.body;

    const dateOfBirth = new Date();
    dateOfBirth.setFullYear(dateOfBirth.getFullYear() - age);

    const sql = 'INSERT INTO usuarios (nombre, email, telefono, contrasena, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
    mysqlConexion.query(sql, [name, email, phone, password, dateOfBirth], (err, result) => {
        if (err) {
            console.error('Error al registrar:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('Registro exitoso');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT id FROM usuarios WHERE email = ? AND contrasena = ?';
    mysqlConexion.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error al autenticar:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        if (results.length > 0) {
            res.json({ userId: results[0].id });
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    });
});

module.exports = router;
