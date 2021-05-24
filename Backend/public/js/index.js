async function recuperaUsuario () {
    let resultado = await JSON.parse(localStorage.getItem('dataUsuario'))
    return resultado
}

async function inicioApp() {
    let data = await recuperaUsuario()

    let resultado = await fetch("http://localhost:3000/index" , {
        method: 'get',
        headers: {
            "Accept": "application/json, text/plain, */*",
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.token}`
        },
    })
}

inicioApp();