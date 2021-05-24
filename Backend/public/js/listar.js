async function eliminar(id) {
    if(confirm("¿Seguro que quieres eliminar el Producto?")){
        let data = await JSON.parse(localStorage.getItem('dataUsuario'))
        try {
            let resultado = await fetch("http://localhost:3000/eliminar/" + id, { // /nuevousuarios
            method: 'get',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${data.token}`
            }
            })
            if(resultado.status == 400){
                alert("No tienes permiso para eliminar productos");
                location.href = '/listado';
            } else {
                alert("Producto Eliminado Correctamente");
                location.href = '/listado';
            }

        } catch (error) {
            alert("No tienes permiso para eliminar productos");
            location.href = '/listado';
        }
    } else {
        location.href = '/listado'
    }
}