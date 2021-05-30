async function eliminar(id_usuario) {
    if(confirm("¿Seguro que quieres eliminar el Usuario?")){
        let resultado = await fetch("http://localhost:3000/delete/" + id_usuario, { // /nuevousuarios
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
        }
        })
        location.href = '/usuarios'
    } else {
        location.href = '/usuarios'
    }
}