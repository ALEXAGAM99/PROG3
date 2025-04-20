import './App.css';
import { useCallback, useState, useEffect } from 'react';
import {BiPlus, BiEdit, BiTrash} from 'react-icons/bi';

function App() {
  const [pacientes, setPacientes] = useState([]);

  const [formularioAgregar, setFormularioDatos] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    ci: ''
  });
  const [formularioEditar, setEditarPaciente] = useState({
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    ci: ''
  });
  const [pacienteId, setPacienteId] = useState(null);

  const fetchPacientes = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pacientes');
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      alert('Error al cargar pacientes: ' + error.message);
    }
  }, []);
  useEffect(() => {
    fetchPacientes();
  }, [fetchPacientes]);


  const Agregar = async (e) => {
    e.preventDefault();
    if (!formularioAgregar.nombre.trim() || !formularioAgregar.apellidoP.trim() || !formularioAgregar.apellidoM.trim() || !formularioAgregar.ci.trim()) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const respuesta = await fetch('http://localhost:3001/api/pacientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formularioAgregar
        })
      });
      if (!respuesta.ok) {
        let errorMensaje = 'Error al crear el paciente';
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.error(error);
        }
        throw new Error(errorMensaje);
      }
      var A1 = document.getElementById('Insert1');
      A1.hidePopover();
      setColorAlerta('success');
      setTextoAlerta('Paciente creado exitosamente!');
      mostrarAlerta();
      fetchPacientes();
      setFormularioDatos({
        nombre: '',
        apellidoP: '',
        apellidoM: '',
        ci: ''
      });
    } catch (error) {
      console.error('Error al agregar');
      setColorAlerta('danger');
      setTextoAlerta('Error al crear el paciente');
      mostrarAlerta();
    }
  };
  const cambiosFormularioAgregar = (e) => {
    setFormularioDatos({
      ...formularioAgregar,
      [e.target.name]: e.target.value
    })

  };

  const EditarPacientes = (paciente) => {
    setEditarPaciente({
      nombre: paciente.nombre,
      apellidoP: paciente.apellidoP,
      apellidoM: paciente.apellidoM,
      ci: paciente.ci
    });
    setPacienteId(paciente.id);
  }

  const cambiosFormularioEditar = (e) => {
    setEditarPaciente({
      ...formularioEditar,
      [e.target.name]: e.target.value
    })
  }

  const EditarPaciente = async (e) => {
    e.preventDefault();
    if (!formularioEditar.nombre.trim() || !formularioEditar.apellidoP.trim() || !formularioEditar.apellidoM.trim() || !formularioEditar.ci) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      const respuesta = await fetch(`http://localhost:3001/api/pacientes/${pacienteId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formularioEditar
        })
      });
      if (!respuesta.ok) {
        let errorMensaje = 'Error al editar el paciente';
        try {
          const error = await respuesta.json();
          errorMensaje = error.message || errorMensaje;
        } catch (error) {
          console.error(error);
        }
        throw new Error(errorMensaje);
      }
      var A1 = document.getElementById('Edit1');
      A1.hidePopover();
      setColorAlerta('success');
      setTextoAlerta('Paciente editado exitosamente!');
      mostrarAlerta();
      fetchPacientes();
    } catch (error) {
      console.error('Error al editar');
      setColorAlerta('danger');
      setTextoAlerta('Error al editar el paciente');
      mostrarAlerta();
    }
  }

  const EliminarPaciente = async (id) => {

    try {
      await fetch(`http://localhost:3001/api/pacientes/${id}`, {
        method: 'DELETE',
      });
      setColorAlerta('success');
      setTextoAlerta('Paciente eliminado exitosamente!');
      mostrarAlerta();
      fetchPacientes();
    } catch (error) {
      console.error('Error al eliminar el paciente', error);
      setColorAlerta('danger');
      setTextoAlerta('Error al eliminar el paciente');
      mostrarAlerta();
    }
  };

  // estilos y texto para el alert
  const [textoAlerta, setTextoAlerta] = useState('');
  const [colorAlerta, setColorAlerta] = useState('success');
  const [visibilidadAlerta, setVisibilidadAlerta] = useState(false);


  function mostrarAlerta() {
    setVisibilidadAlerta(true);
    setTimeout(() => {
      setVisibilidadAlerta(false);
    }, 4000);
  }

  return (
    <div>

      <div className={`alert alert-${colorAlerta} alert-dismissible fade ${visibilidadAlerta ? 'show' : 'hide'}`} id='alerta' role="alert">
        <strong>{textoAlerta}</strong>
        <button type="button" className="close btn-close" data-dismiss="alert" aria-label="Close" onClick={() => setVisibilidadAlerta(false)}>
        </button>
      </div>

      <div className='container mt-5 border rounded rounded-5 p-4 bg-light'>
        <h2 className='text-primary text-center fw-bold display-6 mb-3'>Lista de Pacientes</h2>

        <button className='btn btn-success mb-3' popovertarget="Insert1"> <BiPlus className='fs-4' /></button>
        <div popover='auto' id="Insert1" className='px-4 py-3 rounded border-0'>
          <div className='text-end'>
            <button className='btn-close' popovertarget="Insert1"></button>
          </div>
          <h2 className="text-center mb-2 text-primary">Crear Nuevo Paciente</h2>
          <div className='row'>
            <div className='form-floating mb-3 col'>
              <input type="text" className="form-control" id="nombre" placeholder="Ingrese el nombre" name="nombre" value={formularioAgregar.nombre} onChange={cambiosFormularioAgregar} />
              <label htmlFor="nombre" className='fw-bold mx-2'>Nombre</label>
            </div>
            <div className='form-floating mb-3 col'>
              <input type="text" className="form-control" id="apellidoP" placeholder="Ingrese el apellido paterno" name="apellidoP" value={formularioAgregar.apellidoP} onChange={cambiosFormularioAgregar} />
              <label htmlFor="apellidoP" className='fw-bold mx-2'>Apellido Paterno</label>
            </div>
          </div>

          <div className='row'>
            <div className='form-floating mb-3 col'>
              <input type="text" className="form-control" id="apellidoM" placeholder="Ingrese el apellido materno" name="apellidoM" value={formularioAgregar.apellidoM} onChange={cambiosFormularioAgregar} />
              <label htmlFor="apellidoM" className='fw-bold mx-2'>Apellido Materno</label>
            </div>
            <div className='form-floating mb-3 col'>
              <input type="number" className="form-control" id="ci" placeholder="Ingrese el CI" name="ci" value={formularioAgregar.ci} onChange={cambiosFormularioAgregar} />
              <label htmlFor="ci" className='fw-bold mx-2'>CI</label>
            </div>
          </div>
          <div className='text-end'>
            <button className='btn btn-danger' popovertarget='Insert1'>Cerrar</button>
            <button type="submit" className="btn btn-success mx-2" onClick={Agregar}>Guardar</button>
          </div>
        </div>

        <table className="table table-striped table-hover">
          <thead className='table-primary'>
            <tr>
              <th className='text-primary'>Id</th>
              <th className='text-primary'>Nombre</th>
              <th className='text-primary'>Apellido Paterno</th>
              <th className='text-primary'>Apellido Materno</th>
              <th className='text-primary'>CI</th>
              <th className='text-center text-primary'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellidoP}</td>
                <td>{paciente.apellidoM}</td>
                <td>{paciente.ci}</td>
                <td className='text-center'>
                  <div className='btn-group'>
                    <button className='btn btn-primary' popovertarget="Edit1" onClick={() => EditarPacientes(paciente)}> <BiEdit className='fs-5' /></button>

                    <div popover='auto' id={`Elim${paciente.id}`} className='px-4 py-3 rounded border-0'>
                      <div className='text-end'>
                        <button className='btn-close' popovertarget={`Elim${paciente.id}`}></button>
                      </div>
                      <h2 className='text-center mb-2 text-primary'>Estas seguro de eliminar el paciente?</h2>
                      <h4 className='text-center mb-4 text-primary fw-bold fs-2'>{paciente.nombre} {paciente.apellidoP} {paciente.apellidoM}</h4>
                      <div className='text-end'>
                        <button className='btn btn-danger' popovertarget={`Elim${paciente.id}`}>Cerrar</button>
                        <button type="submit" className="btn btn-success mx-2" onClick={() => EliminarPaciente(paciente.id)}>Eliminar</button>
                      </div>
                    </div>

                    <button className='btn btn-danger' popovertarget={`Elim${paciente.id}`}>
                      <BiTrash className='fs-5' />
                    </button>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>

        <div popover='auto' id="Edit1" className='px-4 py-3 rounded border-0'>
          <div className='text-end'>
            <button className='btn-close' popovertarget='Edit1'></button>
          </div>
          <h2 className="text-center mb-2 text-primary">Modificar Paciente</h2>
          <div className='row'>
            <div className='form-floating mb-4 col'>
              <input type="text"
                placeholder="Ingrese el nombre"
                name="nombre"
                onChange={cambiosFormularioEditar}
                value={formularioEditar.nombre}
                className="form-control"
              ></input>
              <label htmlFor="nombre" className='fw-bold mx-2'>Nombre</label>
            </div>
            <div className='form-floating mb-4 col'>
              <input type="text" className="form-control" id="apellidoP" placeholder="Ingrese el apellido paterno" name="apellidoP" value={formularioEditar.apellidoP} onChange={cambiosFormularioEditar} />
              <label htmlFor="apellidoP" className='fw-bold mx-2'>Apellido Paterno</label>
            </div>
          </div>
          <div className='row'>
            <div className='form-floating mb-4 col'>
              <input type="text" className="form-control" id="apellidoM" placeholder="Ingrese el apellido materno" name="apellidoM" value={formularioEditar.apellidoM} onChange={cambiosFormularioEditar} />
              <label htmlFor="apellidoM" className='fw-bold mx-2'>Apellido Materno</label>
            </div>
            <div className='form-floating mb-4 col'>
              <input type="number" className="form-control" id="ci" placeholder="Ingrese el CI" name="ci" value={formularioEditar.ci} onChange={cambiosFormularioEditar} />
              <label htmlFor="ci" className='fw-bold mx-2'>CI</label>
            </div>
          </div>
          <div className='text-end'>
            <button className='btn btn-danger' popovertarget='Edit1'>Cerrar</button>
            <button type="submit" className="btn btn-success mx-2" onClick={EditarPaciente}>Guardar</button>
          </div>
        </div>
        <br></br><br></br>
      </div>
      <br></br>
    </div>
  );
}

export default App;