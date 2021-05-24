let form = document.getElementById('nuevoForm');
let nombre = document.getElementById('producto_name');
let precio = document.getElementById('producto_precio');
let imagen = document.getElementById('producto_imagen');
let cantidad = document.getElementById('producto_cantidad');

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/guardar", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "nombre_producto": nombre.value,
            "precio_producto": precio.value,
            "imagen_producto": imagen.value,
            "cantidad_inventario": cantidad.value
        })
    })
        if(resultado.status == 400){
            alert("No tienes permiso para agregar productos");
        } else {
            alert("Producto Agregado Correctamente");
            newFormulario();
        }
    } catch (error) {
        alert("No tienes permiso para agregar productos");
        location.href = '/listado';
    }
})

function newFormulario()
{
    nombre.value = ""
    imagen.value = ""
    precio.value = ""
    cantidad.value = ""
}