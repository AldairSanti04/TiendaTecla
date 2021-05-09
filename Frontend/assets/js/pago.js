const listaProductos = document.getElementById('listaProductos');
const cantidadProductos = document.getElementById('cantidadProductos');
let totalCompra = 0;

function obtenerProductosLS(){
    let productoLS;

    //Comprobar si hay algo en LS
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}

productosLS = obtenerProductosLS();
productosLS.forEach(function (producto) {
    
    const productoLista = document.createElement('LI');
    productoLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

    const divProducto = document.createElement('DIV');
    
    const nombreProducto = document.createElement('P')
    nombreProducto.classList.add('my-0');
    nombreProducto.textContent = producto.titulo;

    const cantidadProducto = document.createElement('P')
    cantidadProducto.classList.add('text-muted');
    cantidadProducto.textContent = producto.cantidad;

    let totalProducto = (producto.cantidad * producto.precio);
    totalCompra += totalProducto;

    const precioProducto = document.createElement('SPAN');
    precioProducto.textContent = `$ ${totalProducto}`;

    divProducto.appendChild(nombreProducto);
    divProducto.appendChild(precioProducto);

    productoLista.appendChild(divProducto);
    productoLista.appendChild(cantidadProducto);

    listaProductos.appendChild(productoLista);
});

const totalLista = document.createElement('LI');
totalLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

const totalTexto = document.createElement('SPAN')
totalTexto.textContent = 'Total (MXN)';

const muestraTotal = document.createElement('STRONG')
muestraTotal.textContent = `$ ${totalCompra}`;

cantidadProductos.textContent = `${productosLS.length}`

totalLista.appendChild(totalTexto);
totalLista.appendChild(muestraTotal);

listaProductos.appendChild(totalLista);