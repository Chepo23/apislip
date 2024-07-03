const express = require("express");
const bodyParser = require("body-parser");
const mysqlConexion = require("./conexion");
const cors = require('cors');

const usuarios = require("./routes/usuarios");
const datos = require("./routes/datos");

var app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/routes/usuarios/register", (req, res) => {
    const { name, email, phone, password, birthDate } = req.body;

    const sql = 'INSERT INTO usuarios (nombre, email, telefono, contrasena, fecha_nacimiento) VALUES (?, ?, ?, ?, ?)';
    mysqlConexion.query(sql, [name, email, phone, password, birthDate], (err, result) => {
        if (err) {
            console.error('Error al registrar:', err);
            res.status(500).send('Error en el servidor');
            return;
        }
        res.status(200).send('Registro exitoso');
    });
});

// Usar las rutas definidas en usuarios.js
app.use("/api/routes/usuarios", usuarios);
app.use("/api/datos", datos);

app.listen(3001, () => {
    console.log("Servidor API en ejecución en http://localhost:3001");
});
