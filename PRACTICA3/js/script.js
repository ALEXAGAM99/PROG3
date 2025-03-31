document.getElementById('formulario').addEventListener('submit',async(e)=>{
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const precio = document.getElementById('precio').value;

    const alerta = document.getElementById('alerta');
    const alertaerror = document.getElementById('alertaerror');
    if (nombre === '' || marca === '' || modelo === '' || precio === '') {
        alertaerror.style.display = 'block';
        setTimeout(() => {
            alertaerror.style.display = 'none';
        }, 4000);
        return;
    }
    try {
        const respuesta = await fetch('/guardar',{
            method:'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nombre=${encodeURIComponent(nombre)}&marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}&precio=${encodeURIComponent(precio)}`
        })
        if (respuesta.ok) {
            alerta.style.display = 'block';
            setTimeout(() => {
                alerta.style.display = 'none';
            }, 4000);
            cargarDatos();
            document.getElementById('nombre').value = '';
            document.getElementById('marca').value = '';
            document.getElementById('modelo').value = '';
            document.getElementById('precio').value = '';
        } else {
            console.log('Error del servidor')
        }
    } catch (error) {
        Swal.fire({
            icon: "error",
        })
    }
});


document.addEventListener("DOMContentLoaded", () => {
    cargarDatos();
});

function cargarDatos() {
    fetch('/obtener-datos')
        .then(response => response.json())
        .then(data => {
            const tabla = document.getElementById("tabla-datos");
            tabla.innerHTML = ""; // Limpiar tabla antes de agregar datos

            data.forEach(dispositivo => {
                const fila = `
                    <tr>
                        <td>${dispositivo.id}</td>
                        <td>${dispositivo.nombre}</td>
                        <td>${dispositivo.marca}</td>
                        <td>${dispositivo.modelo}</td>
                        <td>$${dispositivo.precio}</td>
                        <td class="text-center display-flex">
                            <button type="button" popovertarget="formularioactualizar" class="btn btn-primary" onclick="actualizarDatos(${dispositivo.id})">
                                Actualizar
                            </button>
                            <button type="button" class="btn btn-danger" onclick="eliminarDatos(${dispositivo.id})">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                `;
                tabla.innerHTML += fila;
            });
        })
        .catch(error => console.error("Error al cargar datos:", error));
}


//eliminar dispositivo
function eliminarDatos(id) {
    Swal.fire({
        title: "¿Seguro que desea eliminar?",
        text: "No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/eliminar/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success"
                    });
                    cargarDatos();
                } else {
                    console.log('Error del servidor');
                }
            })
            .catch(error => console.error("Error al eliminar datos:", error));
        }
    });
}


//actualizar dispositivo
// Función para cargar datos en el formulario de actualización
function actualizarDatos(id) {
    fetch(`/obtener-datos/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombreactualizar').value = data.nombre;
            document.getElementById('marcaactualizar').value = data.marca;
            document.getElementById('modeloactualizar').value = data.modelo;
            document.getElementById('precioactualizar').value = data.precio;
            
            // Modificar el formulario para que haga update cuando se envíe
            const form = document.getElementById('formularioactualizar');
            form.onsubmit = async (e) => {
                e.preventDefault();
                const nombre = document.getElementById('nombreactualizar').value;
                const marca = document.getElementById('marcaactualizar').value;
                const modelo = document.getElementById('modeloactualizar').value;
                const precio = document.getElementById('precioactualizar').value;

                try {
                    const respuesta = await fetch(`/actualizar/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `nombre=${encodeURIComponent(nombre)}&marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}&precio=${encodeURIComponent(precio)}`
                    });
                    if (respuesta.ok) {
                        const alerta = document.getElementById('alertaactualizar');
                        alerta.style.display = 'block';
                        setTimeout(() => {
                            alerta.style.display = 'none';
                        }, 4000);
                        cargarDatos();
                    }
                } catch (error) {
                    console.error("Error al actualizar datos:", error);
                }
            };
        })
        .catch(error => console.error("Error al cargar datos:", error));
}

// Guardar la función original de submit
const submitOriginal = document.getElementById('formulario').onsubmit;


