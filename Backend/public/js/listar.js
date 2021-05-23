async function eliminar(id) {
    if(confirm("¿Seguro que quieres eliminar el Producto?")){
        let resultado = await fetch("http://localhost:3000/eliminar/" + id)
        alert("Producto Eliminado Exitosamente")
        location.href = '/listado'
    } else {
        location.href = '/listado'
    }
}