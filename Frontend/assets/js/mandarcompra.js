let form = document.getElementById('compraForm');
let totalCompraM = document.getElementById('totalCompra');
let calle = document.getElementById('address');
let pais = document.getElementById('country');
let estado = document.getElementById('state');
let codigoPostal = document.getElementById('zip');
let formaPago = document.getElementById('formaPago');

//Manda el post
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    let productos = await JSON.parse(localStorage.getItem('productos'))
    try {
        let resultado = await fetch("http://localhost:3000/comprar", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "cliente_id": data.id,
            "total": parseFloat(totalCompraM.textContent),
            "calle": calle.value,
            "pais": pais.value,
            "estado": estado.value,
            "codigo_postal": parseInt(codigoPostal.value),
            "forma_de_pago": formaPago.value 
        })
    })
    if(resultado){
        localStorage.removeItem('productos');
        location.href = "thanksPage.html";
    }
    } catch (error) {
        swal({
            title: "Necesitas Iniciar Sesión para poder comprar",
            icon: "error",
          });
    }
})