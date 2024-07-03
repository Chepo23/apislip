const mysql = require("mysql");
var mysqlConexion = mysql.createConnection({
    host: "oaxacapower.org",
    user: "u744130986_Sleeptrack",
    password: "Sleeptrack25",
    database: "u744130986_Sleeptrack",
    multipleStatements: true,
});



mysqlConexion.connect(
(err) => {
    if (!err) {
        console.log("Conexión exitosa a la base de datos");
    } 
    else {
        console.log("Error en la conexión a la base de datos: " + err);
    }
}
);

module.exports = mysqlConexion;