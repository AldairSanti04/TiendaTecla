let form = document.getElementById('nuevoForm');
let nombres = document.getElementById('usuario_nombres');
let apellidos = document.getElementById('usuario_apellidos');
let email = document.getElementById('usuario_email');
let usuario = document.getElementById('usuario');
let pass = document.getElementById('usuario_pass');
let tipo_usuario = document.getElementById('tipo_usuario');

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try{
    let resultado = await fetch("http://localhost:3000/save", { // /nuevousuarios
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify( {
            "nombres": nombres.value,
            "apellidos": apellidos.value,
            "email": email.value,
            "usuario": usuario.value,
            "pass": pass.value,
            "tipo_usuario": tipo_usuario.value
        })
    })

    alert("Usuario Agregado Correctamente")
    location.href = '/'
    } catch (error) {
        console.log(error)
    }
})

function newFormulario()
{
    nombres.value = ""
    apellidos.value = ""
    email.value = ""
    usuario.value = ""
    pass.value = ""
    tipo_usuario.value = ""
}