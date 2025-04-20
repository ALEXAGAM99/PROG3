import * as Paciente from "../model/ProductModel.js";

export const obtenerPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.obtenerTodosPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pacientes' + error.message });
    }
}

export const crearPaciente = async (req, res) => {
    try {
        const { nombre , apellidoP , apellidoM , ci } = req.body;
        const newPaciente = await Paciente.crearNuevoPaciente(nombre , apellidoP , apellidoM , ci);
        res.status(201).json({ id: newPaciente, message: 'Paciente creado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el paciente' + error.message });
    }
}

export const ActualizarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.buscarRegistro(id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        await Paciente.actualizarPaciente(id , req.body.nombre , req.body.apellidoP , req.body.apellidoM , req.body.ci);
        res.status(200).json({ message: 'Paciente actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el paciente' + error.message });
    }
}

export const EliminarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.buscarRegistro(id);
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado' });
        }
        await Paciente.eliminarPaciente(id);
        res.status(200).json({ id: id, message: 'Paciente eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el paciente' + error.message });
    }
}