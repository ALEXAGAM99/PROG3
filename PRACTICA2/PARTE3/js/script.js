document.getElementById('formulario').addEventListener('submit',async(e)=>{
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const precio = document.getElementById('precio').value;

    try {
        const respuesta = await fetch('/guardar',{
            method:'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `nombre=${encodeURIComponent(nombre)}&marca=${encodeURIComponent(marca)}&modelo=${encodeURIComponent(modelo)}&precio=${encodeURIComponent(precio)}`
        })
        if (respuesta.ok) {
            Swal.fire({
                title: "Guardado correctamente",
                icon: "success",
                draggable: true,
                timer:2000
            });
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