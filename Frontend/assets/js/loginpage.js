let formR = document.getElementById('formRegistro');
let nombresR = document.getElementById('nombres');
let apellidosR = document.getElementById('apellidos');
let emailR = document.getElementById('correoRegistro');
let passR = document.getElementById('passwordRegistro');
let userR = document.getElementById('usuario');

let formL = document.getElementById('formLogin');
let emailL = document.getElementById('correoLogin');
let passL = document.getElementById('passwordLogin');

class Usuarios {
    constructor(email, pass){
        this.email = email,
        this.pass = pass,
        this.id = "",
        this.nombre = "",
        this.usuario = "",
        this.tipo = "",
        this.token = ""
    }

    static async guardaUsuario (usuario) {
        localStorage.setItem("dataUsuario", JSON.stringify(usuario))
    }

    static async recuperaUsuario () {
        let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
        return resultado
    }
}

//Manda el post
formL.addEventListener('submit', async (event) => {
    event.preventDefault();
    Usuarios.guardaUsuario(new Usuarios(emailL.value, passL.value));
    let resultado = await fetch("http://localhost:3000/login", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "email": emailL.value,
            "pass": passL.value
        })
    })
    let vuelta = await resultado.json();
    if(vuelta.error){
        swal({
            title: `${vuelta.error}`,
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.tipo = vuelta.user.tipo_usuario;
        data.usuario = vuelta.user.usuario;
        data.nombre = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        data.id = vuelta.user.id;
        Usuarios.guardaUsuario(data);
        location.href = "../index.html"
    }
})

//Manda el post
formR.addEventListener('submit', async (event) => {
    event.preventDefault();
    Usuarios.guardaUsuario(new Usuarios(emailR.value, passR.value));
    let resultado = await fetch("http://localhost:3000/nuevoUsuario", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify( {
            "nombres": nombresR.value,
            "apellidos": apellidosR.value,
            "email": emailR.value,
            "usuario": userR.value,
            "pass": passR.value
        })
    })
    let vuelta = await resultado.json();
    if(vuelta.error){
        swal({
            title: `${vuelta.error}`,
            icon: "error",
          });
    } else {
        let data = await Usuarios.recuperaUsuario();
        data.tipo = vuelta.user.tipo_usuario;
        data.usuario = vuelta.user.usuario;
        data.nombre = vuelta.user.nombres + " " + vuelta.user.apellidos;
        data.token = vuelta.token;
        data.id = vuelta.user.id;
        Usuarios.guardaUsuario(data);
        location.href = "../index.html"
    }
})