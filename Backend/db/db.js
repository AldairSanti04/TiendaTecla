const fetch = require('node-fetch')

let Productos = [];

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
}

async function getProductos () {
    const url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1430";
    const resp = await fetch(url);
    const data = await resp.json();
    const result = data.results;
    return result
}


async function mandarProductos() {
    let resultado = await getProductos();
    resultado.forEach(element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos
}

module.exports = { mandarProductos, Productos };