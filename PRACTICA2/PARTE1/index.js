const pool = require('./database');
async function main(){
    const connection = await pool.getConnection();
    try {
        const[row] = await connection.query('SELECT * FROM dispositivos');
        console.log('Datos del Dispositivo',row);
        const resultado = await connection.query('INSERT INTO dispositivos (nombre,marca,modelo,precio) VALUES (?,?,?,?)',['Celular','Xiaomi','A12','4520']);
        console.log('Id del nuevo registro: ',resultado[0].insertId);
    } catch (error) {
        console.error('Error en la Consulta'.error);
    }
}

main();