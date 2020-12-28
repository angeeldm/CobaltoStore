(function() {
    'use strict'

    document.addEventListener('DOMContentLoaded', function() {

        // PRODUCTOS TIENDA

        let productoCarrito = document.querySelectorAll('#agregarProducto');

        //PRODUCTOCARRITO selecciona los productos de la tienda

        productoCarrito.forEach(botonCarrito => {
            botonCarrito.addEventListener('click', agregarProductoCarrito);
        });

        let resumenCarrito = document.querySelector('.productos-carrito');

        //RESUMENCARRITO variable global utilizada para crear el contenido al HTML

        //  AGREGARPRODUCTOCARRITO --> me permite seleccionar los elementos del producto con el uso del boton

        function agregarProductoCarrito(event) {
            let boton = event.target;

            let producto = boton.closest('.contenido-producto');

            var nombreProducto = producto.querySelector('.nombre-producto').textContent;
            var precioProducto = producto.querySelector('.precio').textContent;
            var imagenProducto = producto.querySelector('.img-producto').src;

            // estas VARIABLES me muestran los valores que quiero mostrar

            productosElegidos(nombreProducto, precioProducto, imagenProducto);
        }

        function productosElegidos(nombreProducto, precioProducto, imagenProducto) {

            // console.log(nombreProducto, precioProducto, imagenProducto);

            let tituloProductos = resumenCarrito.getElementsByClassName('titulo-carrito');

            for (let i = 0; i < tituloProductos.length; i++) {
                if (tituloProductos[i].innerText === nombreProducto) {

                    let cantidadTotal = tituloProductos[i].parentElement.parentElement.querySelector('.cantidad-carrito');

                    cantidadTotal.value++;

                    resumenCompra();
                    return;
                }
            }

            let carritoCompra = document.createElement('DIV');

            let contenidoCarrito = `
            <div class="contenidoCarrito">
                <div class="resumen" id="resumen">


                    <div class="info-productos">
                        <img class="img-carrito" src="${imagenProducto}">
                        <h6 class="titulo-carrito">${nombreProducto}</h6>
                    </div>

                    <div class="precio-productos">

                        <h6 class="precio-carrito">${precioProducto}</h6>

                     </div>

                    <div class="cantidad-productos">
                        <input class="cantidad-carrito" type="number" value="1">

                        <button type="button" class="boton-restaurar"><i class="far fa-trash-alt"></i></button>

                    </div>

                </div>
            </div>
            `;

            carritoCompra.innerHTML = contenidoCarrito
            resumenCarrito.append(carritoCompra);

            carritoCompra.querySelector('.boton-restaurar').addEventListener('click', eliminarProductoCarrito);

            carritoCompra.querySelector('.cantidad-carrito').addEventListener('change', cantidadProductos);

            resumenCompra();
        }

        function resumenCompra() {

            let total = 0;

            // TOTAL es el valor incial del carrito

            let totalCarrito = document.querySelector('#total_resumen');

            // TOTALCARRITO esta variable nos selecciona el monto a pagar

            let productosCarrito = document.querySelectorAll('.resumen');

            // PRODUCTOSCARRITO selecciona a cada producto del carrito

            productosCarrito.forEach(resumen => {
                var precioProductoCarrito = resumen.querySelector('.precio-carrito');

                // PRECIOPRODUCTOCARRITO nos regresa el valor de cada producto elegido

                var valorPrecio = Number(precioProductoCarrito.textContent.replace('$', ''));

                // VALORPRECIO nos regresa solo la informacion del precio del producto. con NUMBER transformamos el string a numero y con REPLACE eliminamos las divisas del valor

                var cantidadProductoCarrito = resumen.querySelector('.cantidad-carrito');

                //CANTIDADPRODUCTOCARRITO nos regresa la cantidad del producto elegido

                var valorCantidad = Number(cantidadProductoCarrito.value);


                total = total + valorPrecio * valorCantidad;
            });

            totalCarrito.innerHTML = `Total a Pagar: ${total}$`;
        }

        function eliminarProductoCarrito(event) {

            var eliminarProducto = event.target;

            eliminarProducto.closest('.resumen').remove();

            resumenCompra();

            // llamando la funcion RESUMENCOMPRA restauro el valor del carrito
        }

        function cantidadProductos(event) {
            var cantidadElegida = event.target;

            cantidadElegida.value <= 0 ? (cantidadElegida.value = 1) : null;

            /* OTRA MANERA DE REALIZAR 
                if (cantidadElegida.value <= 0){
                    cantidadElegida.value = 1;
                }
            */

            resumenCompra();
        };


        // VALIDACION CONTACTO

        const nombre = document.querySelector('#nombre');
        const apellido = document.querySelector('#apellido');
        const email = document.querySelector('#email');
        const telefono = document.querySelector('#numero');

        nombre.addEventListener('blur', validarCampo);
        apellido.addEventListener('blur', validarCampo);
        telefono.addEventListener('blur', validarCampo);

        function validarCampo() {

            if (this.value === '') {
                this.style.border = '1px solid red';
            } else {
                this.style.border = 'none';
            }
        };

        email.addEventListener('blur', function() {
            if (this.value.indexOf('@') > -1) {
                this.style.border = 'none';
            } else {
                this.style.border = '1px solid red';
            }
        });



        // MAPA

        var map = L.map('mapa').setView([-34.611551, -58.362009], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([-34.611551, -58.362009]).addTo(map)
            .bindPopup('Cobalto Store')
            .openPopup();

    }); //DOMCONTENTLOADED
})();