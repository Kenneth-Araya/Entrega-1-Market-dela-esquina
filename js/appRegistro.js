const formulario = document.getElementById("formulario-registro");
const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoRepetirCorreo = document.getElementById("repetir-correo");
const campoContrasena = document.getElementById("contrasena");
const campoConfirmarContrasena = document.getElementById("confirmar-contrasena");
const mensajeResultado = document.getElementById("mensaje-resultado");
 
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();
 
    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const repetirCorreo = campoRepetirCorreo.value.trim();
    const contrasena = campoContrasena.value.trim();
    const confirmarContrasena = campoConfirmarContrasena.value.trim();
 
    // 1. ningun campo vacio
    if (!nombre || !correo || !repetirCorreo || !contrasena || !confirmarContrasena) {
        mensajeResultado.textContent = "Por favor completa todos los campos.";
        mensajeResultado.classList.add("text-danger");
        return; // El return actúa como un muro. Si entra aquí, no sigue bajando.
    }
 
    // 2. repetir que no este vacio
    if ((correo && contrasena) && (!repetirCorreo || !confirmarContrasena)) {
        mensajeResultado.textContent = "Debes repetir el correo electrónico y la contraseña.";
        mensajeResultado.classList.add("text-danger");
        return; // aqui frenamos si falta repetir alguno de los dos
    }
 
    // 3. 4 a 10 caracteres
    if (contrasena.length < 4 || contrasena.length > 10) {
        mensajeResultado.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return; //aqui detenemos la ejecucion en caso de que no se cumpla la regla
    }
 
    // 4. ambas contrasenas coinciden 
    if (contrasena !== confirmarContrasena) {
        mensajeResultado.textContent = "Las contraseñas no coinciden.";
        mensajeResultado.classList.add("text-danger");
        return; //si no coinciden, frenamos el registro
    }
 
    // 5. correo duoc o profesor duoc
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl"];
    const esDominioValido = dominiosPermitidos.some(function(dominio) {
        return correo.endsWith(dominio);
    });
 
    if (!esDominioValido) {
        mensajeResultado.textContent = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensajeResultado.className = "alert alert-danger mt-3";
        return; 
    }
 
    window.location.href = "login.html";
});