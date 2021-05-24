async function eliminar(id) {
    if(confirm("¿Seguro que quieres eliminar el Producto?")){
        let data = await JSON.parse(localStorage.getItem('dataUsuario'))
        let resultado = await fetch("http://localhost:3000/eliminar/" + id, { // /nuevousuarios
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        }
        })
        alert("Producto Eliminado Exitosamente")
        location.href = '/listado'
    } else {
        location.href = '/listado'
    }
}