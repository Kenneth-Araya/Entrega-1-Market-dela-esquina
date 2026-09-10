// Arreglo de productos basado en la nueva estructura del HTML de tu compañero
const productos = [
    {
        id: 1,
        nombre: "Pan amasado casero",
        descripcion: "500gm",
        precio: 1500,
        imagen: "img/pan.jpg"
    },
    {
        id: 2,
        nombre: "Queso gauda laminado",
        descripcion: "250gm",
        precio: 3200,
        imagen: "img/queso.jpg"
    },
    {
        id: 3,
        nombre: "Palta hass madura",
        descripcion: "1 unidad",
        precio: 990,
        imagen: "img/palta.jpg"
    },
    {
        id: 4,
        nombre: "Leche entera Colun",
        descripcion: "Leche entera de excelente calidad nutritiva.",
        precio: 1200,
        imagen: "img/leche.jpg"
    }
];

const contenedorProductos = document.getElementById("contenedor-productos");

function mostrarProductos() {
    if (!contenedorProductos) return; // Si por alguna razón no está el contenedor en esta vista, frena de forma segura

    contenedorProductos.innerHTML = "";

    productos.forEach(function(producto) {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3 mb-4"; // Coincide con el diseño de 4 columnas de tu compañero

        col.innerHTML = `
            <div class="product-card h-100 d-flex flex-column shadow-sm p-3 bg-white rounded">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="product-img mb-3" style="height: 140px; object-fit: contain;">
                <h6 class="product-name fw-bold">${producto.nombre}</h6>
                <div class="d-flex justify-content-between align-items-center product-meta text-muted small mb-2">
                    <span>${producto.descripcion}</span>
                    <span>⭐ (4.8/5)</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-auto pt-2">
                    <span class="product-price fw-bold text-success fs-5">$${producto.precio}</span>
                    <button class="btn btn-primary btn-add" onclick="agregarAlCarrito(${producto.id})">+</button>
                </div>
            </div>
        `;

        contenedorProductos.appendChild(col);
    });
}

// Función para agregar productos al carrito y guardarlos en localStorage
function agregarAlCarrito(idProducto) {
    const productoEncontrado = productos.find(function(p) {
        return p.id === idProducto;
    });

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const indexExistente = carrito.findIndex(function(p) {
        return p.id === idProducto;
    });

    if (indexExistente !== -1) {
        carrito[indexExistente].cantidad = (carrito[indexExistente].cantidad || 1) + 1;
    } else {
        productoEncontrado.cantidad = 1;
        carrito.push(productoEncontrado);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`¡Has agregado "${productoEncontrado.nombre}" al carrito!`);
}

document.addEventListener("DOMContentLoaded", mostrarProductos);