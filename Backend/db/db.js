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
    let url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1430";
    let resp = await fetch(url);
    let data = await resp.json();
    let result = data.results;
    return result
}


async function mandarProductos() {
    let resultado = await getProductos();
    Productos = [];
    resultado.forEach(element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos
}

async function buscarProductos (palabra){
    try {
        let resp = await fetch('https://api.mercadolibre.com/sites/MLM/search?category=MLM1430&q='+ palabra);        
        let data = await resp.json();
        let result = data.results;

        if(result.length == 0) {
            throw new Error('No hay productos para tu busqueda');
        }

        return result;
    } catch(error) {
        throw error;
    }
}

async function mandarBusqueda(palabra) {
    let resultado = await buscarProductos(palabra);
    Productos = [];
    resultado.forEach(element => {
        Productos.push(new Producto(element.id, element.title, element.price, element.thumbnail));
    });
    return Productos
}

module.exports = { mandarProductos, Productos, mandarBusqueda};