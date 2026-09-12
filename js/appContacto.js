//1. Esperamos que el HTML cargue completamente antes de buscar elementos
document.addEventListener("DOMContentLoaded", function () {
    
    // CAPTURAMOS EL BOTON Y EL FORMULARIOS POR SUS IDS
    const btnEnviar = document.getElementById("btnEnviar");
    const formContacto = document.getElementById("formContacto");

    // LE AGREGAMOS EL ESCUCHADOR DE EVENTOS AL BOTON
    btnEnviar.addEventListener("click", function(evento){
        
        // CON ESTO EVITAMOS QUE LA PAGINA SE RECARGUE AL PRECIONAR EL BOTON
        evento.preventDefault();

        // CAPTURAMOS LOS VALORES Y USAMOS TRIM PARA BORRAR ESPACIOS EN BLANCO
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contenido = document.getElementById("contenido").value.trim();

        // EXPRESION REGULAR PARA VALIDAR EL FORMATO DEL CORREO
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // VALIDACIONES
        if(nombre === ""){
            alert("Por favor, ingresa tu nombre completo.");
            return;
        }

        if(correo === "" || !regexCorreo.test(correo)){
            alert("Por favor, ingrese un correo electrónico valido.");
            return;
        }

        if(contenido === ""){
            alert("El contenido del mensaje no puede estar vacio.");
            return;
        }

        alert("Mensaje enviado con exito, "+ nombre + "! Nos pondremos en contacto en las proximas 48 horas habiles contigo.")

        //LIMPIAMOS LOS CAMPOS PARA QUE EL FORMULARIO QUEDE EN BLANCO
        formContacto.reset();
    });

});


document.getElementById('boton-login').addEventListener('click', function() {
    window.location.href = 'login.html';
});

document.getElementById('boton-registro').addEventListener('click', function() {
    window.location.href = 'registro.html';
});