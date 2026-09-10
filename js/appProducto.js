const productos = [
    {
        id: 1,
        nombre:"Leche Entera 1L",
        descripcion: "Leche entera de excelente calidad nutritiva.",
        precio: 1200,
        imagen: "img/leche.jpg"

    },

    {
        id:2,
        nombre:"Fideos San Remo",
        descripcion:"La Pasta Tallarines 5 de San Remo es la elección perfecta para quienes buscan una experiencia culinaria auténtica y deliciosa",
        precio: 800,
        imagen: "img/fideos.jpg"
    },

    {
        id:3,
        nombre:"Lomito De Atun",
        descripcion:"El Atún en Agua Cuisine & Co ofrece una opción más liviana para tus comidas diarias. Ideal para quienes prefieren recetas con menos grasa, sin perder la textura firme del lomito de atún.",
        precio: 1700,
        imagen: "img/lomito.jpg"
    }
];

const contenedorProductos = document.getElementById("contenedor-productos");

function mostrarProductos(){
    contenedorProductos.innerHTML= "";

    productos.forEach(function(producto){
        const col = document.createElement("div");
        col.className="col-12 col-md-4 mb-4";

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.imagen}" class="card-img-top p-3" alt="${producto.nombre}" style="height: 150px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text text-muted small">${producto.descripcion}</p>
                    <div class="mt-auto">
                        <p class="card-text fw-bold text-success fs-5 mb-3">$${producto.precio}</p>
                        <button class="btn btn-primary w-100" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(col)
    });

}

document.addEventListener("DOMContentLoaded",mostrarProductos)

// FUNCION DE AGREGAR PRODUCTOS AL CARRITO Y GUARDARLOS EN LOCALSTORAGE
function agregarAlCarrito(idProducto){
    
    // BUSCAMOS EL PRODUCTO SELECCIONADO DENTRO DE EL ARREGLO
    const productoEncontrado = productos.find(function(p){
        return p.id == idProducto;
    });

    // RECUPERAMOS EL CARRITO ACTUAL DESDE EL LOCALSTORAGE (SI NO HAY NADA, INCIAMOS EL ARREGLO VACIO)
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // VERIFICAMOS SI EL PRODUCTO YA ESTA EN EL CARRITO PARA SUMAR CANTIDAD O AGREGARLO NUEVO
    const indexExistente = carrito.findIndex(function(p){
        return p.id == idProducto;
    });

    if(indexExistente!==-1){
        //SI YA EXISTE, AUMENTAMOS SU CANTIDAD
        carrito[indexExistente].cantidad = (carrito[indexExistente].cantidad || 1) + 1;
    } else {
        // SI ES NUEVO LO AGREGAMOS CON LA CANTIDAD EN 1
        productoEncontrado.cantidad=1;
        carrito.push(productoEncontrado);
    }

    // GUARDAMOS EL CARRITO ACTUALIZADO DE VUELTA EN EL LOCALSTORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));

    //MENSAJE DE CONFIRMACION RAPIDO 
    alert('¡Has agregado "${productoEncontrado.nombre}" al carrito!')
}