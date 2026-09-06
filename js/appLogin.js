const formulario = document.getElementById("formulario-reserva");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const mensajeResultado = document.getElementById("mensaje-resultado");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();

    if (nombre && correo) {
        window.location.href = "Home.html"; // cambia por el nombre real de tu página
    } else {
        mensajeResultado.textContent = "Por favor completa ambos campos.";
        mensajeResultado.classList.add("text-danger");
    }
});