// 1. Fuente única de verdad: El catálogo de productos compartido
const productos = [
    { id: "pan", nombre: "Pan amasado casero", precio: 1500, peso: "500gm", rating: "4.8/5", img: "img/pan.jpg" },
    { id: "queso", nombre: "Queso gauda laminado", precio: 3200, peso: "250gm", rating: "4.7/5", img: "img/queso.jpg" },
    { id: "palta", nombre: "Palta hass madura", precio: 990, peso: "1 unidad", rating: "4.8/5", img: "img/palta.jpg" },
    { id: "leche", nombre: "Leche entera Colun", precio: 1190, peso: "1L", rating: "4.6/5", img: "img/leche.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
    // Detectamos si estamos en la página de productos o en el Home
    const esPaginaProductos = window.location.pathname.includes("productos.html");

    // 2. Renderizamos el catálogo en ambas páginas (si el contenedor existe)
    renderizarCatalogo(esPaginaProductos);

    // 3. Si estamos en productos.html, activamos toda la lógica del carrito y botones interactivos
    if (esPaginaProductos) {
        inicializarCarrito();
    }
});

// Función para pintar las tarjetas en el HTML
function renderizarCatalogo(conInteraccion) {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    productos.forEach(prod => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3";
        
        // CONDICIONAL: Si es la página de productos, agregamos el espacio para los botones. 
        // Si es el Home, dejamos este espacio vacío para que solo se vea la tarjeta informativa.
        const htmlAccion = conInteraccion 
            ? `<div class="accion-producto" data-id="${prod.id}"></div>` 
            : '';

        col.innerHTML = `
            <div class="product-card" data-id="${prod.id}">
                <img src="${prod.img}" alt="${prod.nombre}" class="product-img">
                <h6 class="product-name">${prod.nombre}</h6>
                <div class="d-flex justify-content-between align-items-center product-meta">
                    <span>${prod.peso}</span>
                    <span>⭐ (${prod.rating})</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <span class="product-price">$${prod.precio.toLocaleString('es-CL')}</span>
                    ${htmlAccion}
                </div>
            </div>
        `;
        contenedor.appendChild(col);
    });
}

// Lógica exclusiva del carrito y controles dinámicos para productos.html
function inicializarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedorProductos = document.getElementById("contenedor-productos");
    const badgeCarrito = document.getElementById("cart-badge");

    actualizarUICompleta();

    // Delegación de eventos para sumar, restar y agregar
    if (contenedorProductos) {
        contenedorProductos.addEventListener("click", (e) => {
            const target = e.target;
            const accionDiv = target.closest(".accion-producto");
            if (!accionDiv) return;

            const idProducto = accionDiv.dataset.id;

            if (target.classList.contains("btn-add-initial") || target.classList.contains("btn-mas")) {
                modificarCantidad(idProducto, 1);
            } else if (target.classList.contains("btn-menos")) {
                modificarCantidad(idProducto, -1);
            }
        });
    }

    function modificarCantidad(id, delta) {
        let item = carrito.find(prod => prod.id === id);

        if (item) {
            item.cantidad += delta;
            if (item.cantidad <= 0) {
                carrito = carrito.filter(prod => prod.id !== id);
            }
        } else if (delta > 0) {
            carrito.push({ id: id, cantidad: 1 });
        }

        guardarYActualizar(id);
    }

    function guardarYActualizar(idModificado) {
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarUICompleta();
        renderTarjeta(idModificado);
    }

    function actualizarUICompleta() {
        actualizarBadge();
        document.querySelectorAll(".accion-producto").forEach(div => {
            renderTarjeta(div.dataset.id);
        });
    }

    function actualizarBadge() {
        if (!badgeCarrito) return;
        
        const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

        if (totalUnidades > 0) {
            badgeCarrito.textContent = totalUnidades;
            badgeCarrito.classList.remove("d-none");
        } else {
            badgeCarrito.classList.add("d-none");
            badgeCarrito.textContent = "0";
        }
    }

    function renderTarjeta(id) {
        const contenedorAccion = document.querySelector(`.accion-producto[data-id="${id}"]`);
        if (!contenedorAccion) return;

        const item = carrito.find(prod => prod.id === id);
        const cantidad = item ? item.cantidad : 0;

        if (cantidad === 0) {
            contenedorAccion.innerHTML = `
                <button class="btn-add-initial">+</button>
            `;
        } else {
            contenedorAccion.innerHTML = `
                <div class="qty-control">
                    <button class="btn-qty btn-menos">-</button>
                    <span class="qty-number">${cantidad}</span>
                    <button class="btn-qty btn-mas">+</button>
                </div>
            `;
        }
    }
}