let form = document.getElementById('nuevoForm');
let nombre = document.getElementById('producto_name');
let precio = document.getElementById('producto_precio');
let imagen = document.getElementById('producto_imagen');
let cantidad = document.getElementById('producto_cantidad');
let idData = document.getElementById('idProducto')

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/actualizar", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "id": parseInt(idData.textContent),
            "nombre_producto": nombre.value,
            "precio_producto": precio.value,
            "imagen_producto": imagen.value,
            "cantidad_inventario": cantidad.value
        })
    })

    alert("Producto Actualizado Correctamente")
    newFormulario()
    location.href = '/listado'
    } catch (error) {
        console.log(error)
    }

})

function newFormulario()
{
    nombre.value = ""
    imagen.value = ""
    precio.value = ""
    cantidad.value = ""
}