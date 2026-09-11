// Cerrar sesión
const botonLogout = document.getElementById("boton-logout");
if (botonLogout) {
    botonLogout.addEventListener("click", function (evento) {
        evento.preventDefault();
        if (confirm("¿Cerrar sesión?")) {
            window.location.href = "Login.html";
        }
    });
}
