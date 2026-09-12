const formulario = document.getElementById("formulario-login");
const campoCorreo = document.getElementById("correo");
const campoContrasena = document.getElementById("contrasena");
const mensajeResultado = document.getElementById("mensaje-resultado");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const correo = campoCorreo.value.trim();
    const contrasena = campoContrasena.value.trim();

    // 1. VERIFICAMOS QUE LOS CAMPOS DEL LOGIN NO ESTEN VACIOS
    if (!correo || !contrasena) {
        mensajeResultado.textContent = "Por favor completa ambos campos.";
        mensajeResultado.classList.add("text-danger");
        return; // El return actúa como un muro. Si entra aquí, no sigue bajando.
    }

    //2. VALIDAMOS LA LONGITUD DE LA CONTASEÑA 
    if(contrasena.length<4 || contrasena.length>10){
        mensajeResultado.textContent="La contraseña debe tener entre 4 y 10 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return;//aqui detenemos la ejecucion en caso de que no se cumpla la regla 
    }

    //3. VALIDAMOS QUE EL DOMINIO DEL CORREO SEAN SOLO LOS ELEGIDOS
    const dominiosPermitidos=["@duoc.cl","@profesor.duoc.cl","@gmail.com"];
    // LE PREGUNTAMOS AL CORREO SI TERMINA EN ALGO DE ESTOS DE LA LISTA
    const esDominioValido = dominiosPermitidos.some(function(dominio){
        return correo.endsWith(dominio);
    });

    // SI esDominioValido es falso (no valido) frenamos todo
    if(!esDominioValido){
        mensajeResultado.textContent = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensajeResultado.className = "alert alert-danger mt-3";
        return; // Muro final. Si el correo no sirve, no se hace el Login.
    }

    //maximo 100 caracteres
    if (correo.length > 100) {
    mensajeResultado.textContent =
        "El correo no puede superar los 100 caracteres.";
    mensajeResultado.className = "alert alert-danger mt-3";
    return;
}

    //Si todas las validaciones funcionan se redirige a las pagina home ;)
    window.location.href = "home.html"; 
});
