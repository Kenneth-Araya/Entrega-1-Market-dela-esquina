document.addEventListener("DOMContentLoaded", () => {
    cargarCarrito();
});

const catalogoReferencia = [
    { id: "pan", nombre: "Pan amasado casero", precio: 1500, peso: "500gm", img: "img/pan.jpg" },
    { id: "queso", nombre: "Queso gauda laminado", precio: 3200, peso: "250gm", img: "img/queso.jpg" },
    { id: "palta", nombre: "Palta hass madura", precio: 990, peso: "1 unidad", img: "img/palta.jpg" },
    { id: "leche", nombre: "Leche entera Colun", precio: 1190, peso: "1L", img: "img/leche.jpg" }
];

function cargarCarrito() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("contenedor-carrito-items");
    const subtotalEl = document.getElementById("subtotal-carrito");
    const totalEl = document.getElementById("total-carrito");

    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="text-muted text-center py-4">Tu carrito está vacío.</p>`;
        subtotalEl.innerText = "$0";
        totalEl.innerText = "$0";
        return;
    }

    let subtotalTotal = 0;

    carrito.forEach((item, index) => {
        const productoInfo = catalogoReferencia.find(p => p.id === item.id) || item;
        let cantidad = item.cantidad || 1;
        let subtotalProducto = productoInfo.precio * cantidad;
        subtotalTotal += subtotalProducto;

        const itemDiv = document.createElement("div");
        itemDiv.className = "d-flex align-items-center justify-content-between border-bottom py-3";

        itemDiv.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <img src="${productoInfo.img || productoInfo.imagen}" alt="${productoInfo.nombre}" style="width: 60px; height: 60px; object-fit: contain;" class="bg-light rounded p-1">
                <div>
                    <h6 class="fw-bold mb-1">${productoInfo.nombre}</h6>
                    <small class="text-muted">Precio: $${productoInfo.precio.toLocaleString('es-CL')} | Cantidad: ${cantidad}</small>
                </div>
            </div>
            <div class="text-end">
                <span class="fw-bold text-success d-block mb-1">$${subtotalProducto.toLocaleString('es-CL')}</span>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarItem(${index})">🗑️</button>
            </div>
        `;
        contenedor.appendChild(itemDiv);
    });

    subtotalEl.innerText = `$${subtotalTotal.toLocaleString('es-CL')}`;
    totalEl.innerText = `$${subtotalTotal.toLocaleString('es-CL')}`;
}

window.eliminarItem = function(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
}

window.limpiarCarrito = function() {
    localStorage.removeItem("carrito");
    cargarCarrito();
}

window.finalizarCompra = function() {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    alert("¡Compra finalizada con éxito! Gracias por comprar en Market De La Esquina.");
    localStorage.removeItem("carrito");
    cargarCarrito();
}