class Carrito {

    //Mostrar los productos guardados en el LS
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto){
            //Construir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${producto.imagen}"></td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="index.html" class="borrar-producto" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </a>
                </td>
            `;
            listaProductos.appendChild(row);
        });
    }

    //Comprobar que hay elementos en el LS
    obtenerProductosLS(){
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

    //Añadir producto al carrito
    comprarProducto(event){
        event.preventDefault();
        //Delegado para agregar al carrito
        if(event.target.classList.contains('agregar-carrito')){
            const producto = event.target.parentElement.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
    }

    //Leer datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo: producto.querySelector('h5').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('.btn-success').getAttribute('data-id'),
            cantidad: 1
        }

        producto.querySelector('.btn-success').classList.add('d-none');

        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });

        if(productosLS === infoProducto.id){
            swal("El producto ya se encuentra en su carrito");
        }
        else {
            this.insertarCarrito(infoProducto);
        }
    }

    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.imagen}"></td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="index.html" class="borrar-producto" data-id="${producto.id}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </a>
            </td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLS(producto);
    }

    //Eliminar el producto del carrito en el DOM
    eliminarProducto(event){
        event.preventDefault();
        let producto, idProducto;
        if(event.target.parentElement.classList.contains('borrar-producto')){
            event.target.parentElement.parentElement.parentElement.remove();
            producto = event.target.parentElement.parentElement.parentElement;
            idProducto = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLS(idProducto);
        let btnBorrar = document.querySelector(`[data-id='${idProducto}']`);
        if(btnBorrar){
            btnBorrar.classList.remove('d-none');
        }
    }

    //Almacenar en el LS
    guardarProductosLS(producto){
        let productos;
        //Toma valor de un arreglo con datos del LS
        productos = this.obtenerProductosLS();
        //Agregar el producto al carrito
        productos.push(producto);
        //Agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    //Eliminar producto por ID del LS
    eliminarProductoLS(idProducto){
        let productosLS;
        //Obtenemos el arreglo de productos
        productosLS = this.obtenerProductosLS();
        //Comparar el id del producto borrado con LS
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === idProducto){
                productosLS.splice(index, 1);
            }
        });

        //Añadimos el arreglo actual al LS
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    //Mostrar los productos guardados en el LS en checkout.html
    leerLSxCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLS();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            let total = producto.precio * producto.cantidad;
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}">
                </td>
                <td>${producto.titulo}</td>
                <td>$${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
                </td>
                <td id='subtotales'>$${total.toFixed(2)}</td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${producto.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }

    //Calcular montos
    calcularTotal(){
        let productosLS;
        let total = 0, igv = 0, subtotal = 0;
        productosLS = this.obtenerProductosLS();
        for(let i = 0; i < productosLS.length; i++){
            let element = Number(productosLS[i].precio * productosLS[i].cantidad);
            total = total + element;
        }

        document.getElementById('total').value = "$ " + total.toFixed(2);
    }

    //Procesar pedido
    procesarPedido(event){
        event.preventDefault();

        if(this.obtenerProductosLS().length === 0){
            swal("Su Carrito está Vacío")
        }
        else {
            location.href = "./pages/checkout.html";
        }
    }

    obtenerEvento(event) {
        event.preventDefault();
        let id, cantidad, producto, productosLS;
        if (event.target.classList.contains('cantidad')) {
            producto = event.target.parentElement.parentElement;
            id = producto.querySelector('a').getAttribute('data-id');
            cantidad = producto.querySelector('input').value;
            let actualizarMontos = document.querySelectorAll('#subtotales');
            productosLS = this.obtenerProductosLS();
            productosLS.forEach(function (productoLS, index) {
                if (productoLS.id === id) {
                    productoLS.cantidad = cantidad;
                    let newTotal = Number(cantidad * productosLS[index].precio);
                    actualizarMontos[index].innerHTML = '$' + newTotal.toFixed(2);
                }    
            });
            localStorage.setItem('productos', JSON.stringify(productosLS));
            this.calcularTotal();
            
        }
        else {
            console.log("click afuera");
        }
    }
}
