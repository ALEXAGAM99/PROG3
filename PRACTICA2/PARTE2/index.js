const pool = require('./database');
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main(){
    const connection = await pool.getConnection();
    try {
        const[row] = await connection.query('SELECT * FROM dispositivos');
        console.log('Datos del Dispositivo',row);
        const resultado = await connection.query('INSERT INTO dispositivos (nombre,marca,modelo,precio) VALUES (?,?,?,?)',['Alexa','Amazon','echo show 8','1200']);
        console.log('Id del nuevo dispositivo: ',resultado[0].insertId);

        //parte 2 

        r1.question('Desea actualizar(U) o eliminar(D)',async (answer)=>{
            if(answer.toUpperCase() === 'U'){
             r1.question('Ingrese el ID del dispositivo que desea actualizar: ',async (id)=>{
                r1.question('Ingrese el nuevo nombre: ',async (nombre)=>{
                    r1.question('Ingrese la nueva marca: ',async (marca)=>{
                        r1.question('Ingrese el nuevo modelo: ',async (modelo)=>{
                            r1.question('Ingrese el nuevo precio: ',async (precio)=>{
                                    await connection.query('UPDATE dispositivos SET nombre=?,marca=?,modelo=?,precio=? WHERE id=?',[nombre,marca,modelo,precio,id]);
                                    console.log('Registro actualizado');
                                    const [array]=await connection.query('SELECT * FROM dispositivos');
                                    console.log('Registro Actualizado: ',array);
                                    r1.close();
                            })
                        })
                    })
                })
             })   
            }
            else if(answer.toUpperCase() === 'D'){
                r1.question('Ingrese el ID del dispositivo que desea eliminar: ',async (id)=>{
                    await connection.query('DELETE FROM dispositivos WHERE id=?',[id]);
                    console.log('Registro eliminado');
                    const [array]=await connection.query('SELECT * FROM dispositivos');
                    console.log('Registro Eliminado: ',array);
                    r1.close();
                })
            }
            else{
                console.log('Opcion no valida');
                r1.close();
            }
        });

    } catch (error) {
        console.error('Error en la Consulta'.error);
    }
}

main();