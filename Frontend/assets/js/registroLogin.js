document.getElementById("btn-registrarse").addEventListener("click",registro);
document.getElementById("btn-login").addEventListener("click",inciarSesion);

//declaracion de variables
var contenedorLoginRegistro = document.querySelector(".contenedorLoginRegistro")
var formLogin = document.querySelector(".formLogin")
var formRegistro = document.querySelector(".formRegistro")
var cajaTraseraLogin = document.querySelector(".cajaTrasera-Login")
var cajaTraseraRegistro = document.querySelector(".cajaTrasera-Registro")

function registro() {
        formRegistro.style.display = "block";
        contenedorLoginRegistro.style.left = "410px";
        formLogin.style.display = "none";
        cajaTraseraRegistro.style.opacity ="0";
        cajaTraseraLogin.style.opacity = "1";
} 

function inciarSesion() {
        formRegistro.style.display = "none";
        contenedorLoginRegistro.style.left = "10px";
        formLogin.style.display = "block";
        cajaTraseraRegistro.style.opacity ="1";
        cajaTraseraLogin.style.opacity = "0";
} 