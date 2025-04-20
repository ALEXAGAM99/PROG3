import pool from "../config/db.js";

export const obtenerTodosPacientes = async () => {
    const [array] = await pool.query("SELECT * FROM pacientes");
    return array;   
}

export const crearNuevoPaciente = async (nombre , apellidoP , apellidoM , ci) => {
    try {
        const [resultado] = await pool.query("INSERT INTO pacientes(nombre, apellidoP, apellidoM, ci) VALUES (?, ?, ?, ?)",[nombre, apellidoP, apellidoM, ci]);
        return resultado.insertId;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const actualizarPaciente = async (id, nombre, apellidoP, apellidoM, ci) => {
    await pool.query("UPDATE pacientes SET nombre = ? , apellidoP = ? , apellidoM = ? , ci = ? WHERE id = ?", [nombre, apellidoP, apellidoM, ci, id]);
}

export const buscarRegistro = async (id) => {
    const [array] = await pool.query("SELECT * FROM pacientes WHERE id = ?", [id]);
    return array[0];
}

export const eliminarPaciente = async (id) => {
    await pool.query("DELETE FROM pacientes WHERE id = ?", [id]);
}