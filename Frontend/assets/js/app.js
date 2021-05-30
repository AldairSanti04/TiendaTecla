const items = document.getElementById('items');//tener acceso a un elemento por su Id
const plantillaProd = document.getElementById('plantillaProd').content;
//fragment para evita el reflow ya que es un arrego con muchos elementos
const fragment = document.createDocumentFragment();//para guardar la estructura antes de incorporarlo a HTML (como un acumulador)
let result;
const paginadorP = document.getElementById('paginas');
const titulo = document.getElementById('titulo');
const formBuscar = document.getElementById('busqueda');
let categorias;
const listaDeCategorias = document.getElementById('listaCategorias');

const carro = new Carrito();
const carrito = document.getElementById('carrito');
const listaProductos = document.getElementById('elementosComprar');
const btnProcesar = document.getElementById('procesarPedido');

let pageNumber=1; 
let pageSize=12; 
let pagination;

//evento DOMContentLoaded: es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', () => {//registra un evento a un objeto en especifico
    getProductos();
    getCategoriasUI();
    cargarEventos();
    //localStorage.clear();
})

// Traer productos
function getProductos(){
    fetch('http://localhost:3000/locales')
    .then(res => res.json())
    .then(data => {
        result = data;
        showProductos(result);
    })
}

//Traer Tendencias
async function getTendencias(){
    let resp = await fetch('http://localhost:3000/productos');        
    let data = await resp.json();
    result = data;

    if(result.error === 'No hay productos para tu búsqueda'){
        location.href = "./pages/notFound.html";
    } else {
        pageNumber=1;
        items.innerHTML  =  '' ;
        paginadorP.innerHTML = '';
        titulo.textContent = 'Tendencias Ropa, Bolsas y Calzado';
        showProductos(result);
    }
}

//Traer Categorías
function getCategoriasUI(){
    fetch('http://localhost:3000/categorias')
    .then(res => res.json())
    .then(data => {
        categorias = data;
        llenarCategorias(categorias);
    })
}

//Muestra las categorias
function llenarCategorias(categorias){
    categorias.forEach(element => {
        
        const categoriaLista = document.createElement('DIV');
        categoriaLista.innerHTML = `
        <a class="dropdown-item" onclick="buscarXcategoria('${element.id}','${element.nombre}')">${element.nombre}</a>
        `;
        listaDeCategorias.appendChild(categoriaLista);
    });
}

//Buscar Productos por Categoria Seleccionada
async function buscarXcategoria(idCategoria, nombre){
    let resp = await fetch('http://localhost:3000/categorias/'+ idCategoria);        
    let data = await resp.json();
    result = data;

    if(result.error === 'No hay productos para tu búsqueda'){
        location.href = "./pages/notFound.html";
    } else {
        pageNumber=1;
        items.innerHTML  =  '' ;
        paginadorP.innerHTML = '';
        titulo.textContent = `Productos de la categoría: ${nombre}`;
        showProductos(result);
    }
}

//Realizar Busquedas
formBuscar.addEventListener('submit', event => {
    event.preventDefault();
    const buscar = document.getElementById("busca");
    let palabra = buscar.value.charAt(0).toUpperCase() + buscar.value.slice(1);
    obtenerBusqueda(palabra, result);
    buscar.value = '';
})

async function obtenerBusqueda(buscar) {    
    let resp = await fetch('http://localhost:3000/buscar/'+ buscar);        
    let data = await resp.json();
    result = data;

    if(result.error === 'No hay productos para tu búsqueda'){
        location.href = "./pages/notFound.html";
    } else {
        pageNumber=1;
        items.innerHTML  =  '' ;
        paginadorP.innerHTML = '';
        titulo.textContent = `Resultados para: ${buscar}`;
        showProductos(result);
    }
}

//Paginación
        
function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function nextPage(){
    pageNumber ++;
    items.innerHTML  =  '' ;
    showProductos(result)
}
        
function previusPage(){
    pageNumber --;
    items.innerHTML  =  '' ;
    showProductos(result)
}
        
function showProductos(productos){
    let pageCont =Math.ceil(productos.length/pageSize);
    let pagination = paginate(productos,pageSize,pageNumber);
    pagination.forEach(element => {//ciclo forEach para recorrer elementos
        //DOM accedemos a los elementos con querySelector
        plantillaProd.querySelector('img').setAttribute("src", element.imagen_producto);
        plantillaProd.querySelector('h5').textContent = element.nombre_producto;
        plantillaProd.querySelector('span').textContent = `${element.precio_producto}`;
        plantillaProd.querySelector('.btn-success').dataset.id = element.id;
        
        let productosLS;
        productosLS = carro.obtenerProductosLS();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === element.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === element.id){
            plantillaProd.querySelector('.btn-success').classList.add('d-none');
        }
        else {
            plantillaProd.querySelector('.btn-success').classList.remove('d-none')
        }

        const clone = plantillaProd.cloneNode(true)//clona nuestra PlantillaProd (que es el template de HTML)
        fragment.appendChild(clone)//guardamos el con(la estructura) en fragment
    })
    items.appendChild(fragment)//imprimimos dentro del class="items" de html la estructura que guardamos en fragment    
    paginasHTML= pageNumber >1  ? " <a href='#titulo' class='btn btn-outline-dark' onclick='previusPage()'>Anterior</a>":"";
    paginasHTML+= pageNumber < pageCont ?(" <a href='#titulo' class='btn btn-outline-dark' onclick='nextPage()'>Siguiente</a>"):"" ;
    document.getElementById("paginas").innerHTML="";
    document.getElementById("paginas").innerHTML=paginasHTML;
}

// Carrito

function cargarEventos(){

    //Se ejecuta cuando se presionar agregar carrito
    items.addEventListener('click', (e)=>{carro.comprarProducto(e)});

    //Cuando se elimina productos del carrito
    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    //Al cargar documento se muestra lo almacenado en LS
    document.addEventListener('DOMContentLoaded', carro.leerLocalStorage());

    //Enviar pedido a otra pagina
    btnProcesar.addEventListener('click', (e)=>{carro.procesarPedido(e)});
}