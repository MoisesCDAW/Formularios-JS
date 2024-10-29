let fechaElaboracion;
let cocinero;
let destinatario;
let gramos;
let composicion;
let numCuenta;
let datos;


function validarDatos() {
    let valido = 1;


    if (getDatos()) {

        // Cocinero
        let expresion = /^[A-Z][A-Z][$%&@#][0-9]{4}$/;
        cocinero = cocinero.toUpperCase();
        if (!expresion.test(cocinero)) {
            valido = 0;
        }
    }
}


/**
 * Recoje todos los datos del formulario
 */
function getDatos() {
    let valido = true;

    datos = Array.from(document.querySelector("#producto")).forEach((x)=>{
        if (x.value=="") {
            valido = false;
        }
    });

    fechaElaboracion = datos[0].value;
    cocinero = datos[1].value;
    destinatario = datos[2].value;
    gramos = datos[3].value;
    composicion = datos[4].value;
    numCuenta = datos[5].value;

    return valido;
}

/**
 * Inicio del programa. Controla el evento del formulario
 */
function inicio(){
    // Evita que la página se recargue al enviar el formulario
    document.querySelector("#producto").addEventListener("submit", (evento)=> {
        evento.preventDefault();
        getDatos();
    });
}

inicio();


