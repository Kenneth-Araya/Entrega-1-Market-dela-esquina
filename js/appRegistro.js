const regiones = {
    "Región Metropolitana": ["Santiago", "Maipú", "Puente Alto", "Las Condes"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"]
};
 
const formulario = document.getElementById("formulario-registro");
const campoRun = document.getElementById("run");
const campoNombre = document.getElementById("nombre");
const campoApellidos = document.getElementById("apellidos");
const campoCorreo = document.getElementById("correo");
const campoTipoUsuario = document.getElementById("tipo-usuario");
const campoRegion = document.getElementById("region");
const campoComuna = document.getElementById("comuna");
const campoDireccion = document.getElementById("direccion");
const campoContrasena = document.getElementById("contrasena");
const campoConfirmarContrasena = document.getElementById("confirmar-contrasena");
const mensajeResultado = document.getElementById("mensaje-resultado");
 
// ===== llenamos el select de region a partir del arreglo js =====
function cargarRegiones() {
    Object.keys(regiones).forEach(function (nombreRegion) {
        const opcion = document.createElement("option");
        opcion.value = nombreRegion;
        opcion.textContent = nombreRegion;
        campoRegion.appendChild(opcion);
    });
}
 
// ===== cuando cambia la region, se actualizan las comunas disponibles =====
function actualizarComunas() {
    const regionSeleccionada = campoRegion.value;
 
    // limpiamos las opciones actuales de comuna
    campoComuna.innerHTML = "";
 
    if (!regionSeleccionada || !regiones[regionSeleccionada]) {
        const opcionVacia = document.createElement("option");
        opcionVacia.value = "";
        opcionVacia.textContent = "Selecciona primero una región";
        opcionVacia.selected = true;
        opcionVacia.disabled = true;
        campoComuna.appendChild(opcionVacia);
        return;
    }
 
    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona una comuna";
    opcionInicial.selected = true;
    opcionInicial.disabled = true;
    campoComuna.appendChild(opcionInicial);
 
    regiones[regionSeleccionada].forEach(function (nombreComuna) {
        const opcion = document.createElement("option");
        opcion.value = nombreComuna;
        opcion.textContent = nombreComuna;
        campoComuna.appendChild(opcion);
    });
}
 
campoRegion.addEventListener("change", actualizarComunas);
cargarRegiones();
 
// ===== validacion del run chileno (modulo 11) =====
function calcularDigitoVerificador(runSinDv) {
    let suma = 0;
    let multiplicador = 2;
 
    // recorremos el run de derecha a izquierda multiplicando por la secuencia 2,3,4,5,6,7
    for (let i = runSinDv.length - 1; i >= 0; i--) {
        suma += parseInt(runSinDv.charAt(i), 10) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
 
    const resto = 11 - (suma % 11);
 
    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return resto.toString();
}
 
function esRunValido(run) {
    // no debe contener puntos ni guion
    if (run.includes(".") || run.includes("-")) return false;
 
    // debe tener entre 7 y 9 caracteres
    if (run.length < 7 || run.length > 9) return false;
 
    const cuerpo = run.slice(0, -1);
    const dvIngresado = run.slice(-1).toUpperCase();
 
    // el cuerpo debe ser solo números
    if (!/^\d+$/.test(cuerpo)) return false;
 
    const dvCalculado = calcularDigitoVerificador(cuerpo);
 
    return dvIngresado === dvCalculado;
}
 
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
 
    const run = campoRun.value.trim().toUpperCase();
    const nombre = campoNombre.value.trim();
    const apellidos = campoApellidos.value.trim();
    const correo = campoCorreo.value.trim();
    const tipoUsuario = campoTipoUsuario.value;
    const region = campoRegion.value;
    const comuna = campoComuna.value;
    const direccion = campoDireccion.value.trim();
    const contrasena = campoContrasena.value.trim();
    const confirmarContrasena = campoConfirmarContrasena.value.trim();
 
    // 1. verificamos que los campos obligatorios no esten vacios (fecha de nacimiento es opcional)
    if (!run || !nombre || !apellidos || !correo || !tipoUsuario || !region || !comuna || !direccion || !contrasena || !confirmarContrasena) {
        mensajeResultado.textContent = "Por favor completa todos los campos obligatorios.";
        mensajeResultado.classList.add("text-danger");
        return; // el return actúa como un muro. si entra aquí, no sigue bajando.
    }
 
    // 2. validamos el run: sin puntos ni guion, entre 7 y 9 caracteres y con dígito verificador correcto
    if (!esRunValido(run)) {
        mensajeResultado.textContent = "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion, y un dígito verificador válido.";
        mensajeResultado.classList.add("text-danger");
        return; // aqui frenamos si el run no cumple el formato o el dv no calza
    }
 
    // 3. validamos la longitud maxima del nombre
    if (nombre.length > 50) {
        mensajeResultado.textContent = "El nombre no puede superar los 50 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 4. validamos la longitud maxima de los apellidos
    if (apellidos.length > 100) {
        mensajeResultado.textContent = "Los apellidos no pueden superar los 100 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 5. validamos la longitud maxima del correo
    if (correo.length > 100) {
        mensajeResultado.textContent = "El correo no puede superar los 100 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 6. validamos que el dominio del correo sea uno de los tres permitidos
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    // le preguntamos al correo si termina en algo de estos de la lista
    const esDominioValido = dominiosPermitidos.some(function (dominio) {
        return correo.endsWith(dominio);
    });
 
    if (!esDominioValido) {
        mensajeResultado.textContent = "Ingresa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        mensajeResultado.classList.add("text-danger");
        return; // muro final del correo. si no sirve, no se hace el registro.
    }
 
    // 7. validamos que se haya seleccionado un tipo de usuario
    if (!["Administrador", "Cliente", "Vendedor"].includes(tipoUsuario)) {
        mensajeResultado.textContent = "Selecciona un tipo de usuario válido.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 8. validamos que la comuna seleccionada pertenezca a la region elegida
    if (!regiones[region] || !regiones[region].includes(comuna)) {
        mensajeResultado.textContent = "Selecciona una comuna válida para la región elegida.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 9. validamos la longitud maxima de la direccion
    if (direccion.length > 300) {
        mensajeResultado.textContent = "La dirección no puede superar los 300 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return;
    }
 
    // 10. validamos la longitud de la contraseña
    if (contrasena.length < 4 || contrasena.length > 10) {
        mensajeResultado.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
        mensajeResultado.classList.add("text-danger");
        return; //aqui detenemos la ejecucion en caso de que no se cumpla la regla
    }
 
    // 11. validamos que ambas contraseñas coincidan
    if (contrasena !== confirmarContrasena) {
        mensajeResultado.textContent = "Las contraseñas no coinciden.";
        mensajeResultado.classList.add("text-danger");
        return; //si no coinciden, frenamos el registro
    }
 
    // si todas las validaciones funcionan se redirige a la pagina de login ;)
    window.location.href = "login.html";
});