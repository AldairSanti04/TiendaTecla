let form = document.getElementById('nuevoForm');
let nombre = document.getElementById('producto_name');
let precio = document.getElementById('producto_precio');
let imagen = document.getElementById('producto_imagen');
let cantidad = document.getElementById('producto_cantidad');
let categoria = document.getElementById('categoria');

getCategorias();

function getCategorias(){
    fetch('http://localhost:3000/categorias')
    .then(res => res.json())
    .then(data => {
        categorias = data;
        llenarCategorias(categorias);
    })
}

function llenarCategorias(categorias){
    categorias.forEach(element => {
        
        const categoriaOption = document.createElement('OPTION');
        categoriaOption.textContent = `${element.nombre}`;
        categoriaOption.value = `${element.nombre}`;
        categoria.appendChild(categoriaOption);
    });
}

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
            "cantidad_inventario": cantidad.value,
            "categoria": categoria.value
        })
    })
        if(resultado.status == 400){
            swal({
                title: "No tienes permiso para agregar productos",
                icon: "error",
              });
        } else {
            swal({
                title: "Producto Agregado Correctamente",
                icon: "succes",
              });
            newFormulario();
        }
    } catch (error) {
        swal({
            title: "No tienes permiso para agregar productos",
            icon: "error",
          });
    }
})

function newFormulario()
{
    nombre.value = ""
    imagen.value = ""
    precio.value = ""
    cantidad.value = ""
}