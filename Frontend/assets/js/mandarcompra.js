const twoDigits = (value) => (value < 10) ? `0${value}` : value ;
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
        
    //Generar un Id para la Compra
        const today = new Date();
        const y = twoDigits(today.getFullYear());;
        const M = twoDigits(today.getMonth());
        const d = twoDigits(today.getDate());
        const h = twoDigits(today.getHours())
        const m = twoDigits(today.getMinutes());
        const s = twoDigits(today.getSeconds())
        const idCompra = `${y}${M}${d}${h}${m}${s}`;

    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
    try {
        let resultado = await fetch("http://localhost:3000/comprar", { 
        method: 'post',
        headers: {
            "Accept": "application/json, text/plain, *,*",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${data.token}`
        },
        body: JSON.stringify( {
            "id": idCompra,
            "cliente_id": data.id,
            "total": parseFloat(totalCompraM.textContent),
            "calle": calle.value,
            "pais": pais.value,
            "estado": estado.value,
            "codigo_postal": parseInt(codigoPostal.value),
            "forma_de_pago": formaPago.value 
        })
    })
        if(resultado.error){
            swal({
                title: "Necesitas Iniciar Sesión para poder comprar",
                icon: "error",
              });
        } else{
            await mandarProductos(idCompra)
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

async function mandarProductos(idCompra) {
    let data = await JSON.parse(localStorage.getItem('dataUsuario'))
        try {
            let productos = await JSON.parse(localStorage.getItem('productos'))
            productos.forEach(async element => {
            let resultado = await fetch("http://localhost:3000/detalleCompra", { 
            method: 'post',
            headers: {
                "Accept": "application/json, text/plain, *,*",
                "Content-Type": "application/json",
                'Authorization': `Bearer ${data.token}`
            },
            body: JSON.stringify( {
                "compra_id": idCompra,
                "producto": element.titulo,
                "precio": parseFloat(element.precio),
                "cantidad": parseInt(element.cantidad),
                "subtotal":  (Number(element.precio * element.cantidad)).toFixed(2)
            })
        })
    })
        } catch (error) {
            swal({
                title: "Necesitas Iniciar Sesión para poder comprar",
                icon: "error",
            });
        }
}