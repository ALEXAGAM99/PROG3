const mysql=require('mysql2/promise');

const config={
    host:'localhost',
    user:'root',
    password:'',
    database:'electronicos'
}

const pool=mysql.createPool(config);

async function testConnection(){
    console.time('Conexion Pooling');
    try {
        const connection=await pool.getConnection();
        console.timeEnd('Conexion Pooling');
        console.log('Conexion exitosa');
        connection.release();
    } catch (error) {
        console.log('Error de conexion' .error);
    }
}
testConnection();
module.exports=pool;