let fechaElaboracion = "";
let cocinero = "";
let destinatario = "";
let gramos = 0;
let composicion = "";
let numCuenta = "";

function validarDatos() {
    let valido = 1;

    if (getDatos()) {

        // Cocinero
        let expresion = /^[A-Z][A-Z][$%&@#][0-9]{4}$/;
        cocinero = cocinero.toUpperCase();
        if (!expresion.test(cocinero)) {
            console.log("cocinero inválido");
            valido = 0;

            
        }else {

            // Destinatario
            let indice = destinatario.indexOf("_");
            let aux = destinatario.substring(0, indice).toUpperCase();
            aux += destinatario.substring(indice, destinatario.length);
            destinatario = aux;
            
            expresion = /^[A-Z]{2,3}[_][a-z]+[:][0-9]{4}$/;
            if (!expresion.test(destinatario)) {
                console.log("destinatario inválido");
                valido = 0;
            }else {

                // Gramos
                if (gramos<100 || gramos>5000) {
                    console.log("gramos inválidos");
                    valido = 0;
                }else {

                    // Composición 200gC3OH7
                    let indice = composicion.indexOf("g");
                    let gramosAux = parseInt(composicion.substring(0, indice));
                    let aux = composicion.substring(0, indice+1);
                    aux += composicion.substring(indice+1, composicion.length).toUpperCase();
                    composicion = aux;
                    expresion = /^[0-9]{1,4}[g][A-Z0-9]+$/;

                    if (!expresion.test(composicion)) {
                        if (gramosAux>gramos) {
                            console.log("Los gramos de la composición no pueden ser mayor a los del producto");
                            valido = 0;
                        }
                        console.log("composicion inválida");
                        valido = 0;
                    }

                }
            }
        }


    }else {
        console.log("ERROR. Hay datos vacíos o inválidos");
    }
}


/**
 * Recoje todos los datos del formulario
 */
function getDatos() {
    let valido = true;

    let datos = Array.from(document.querySelector("#producto"));
    
    datos.forEach((x)=>{
        if (x.value=="" && x.type!="submit") {
            valido = false;
        }
    });

    if (valido) {  
        fechaElaboracion = datos[0].value;
        cocinero = datos[1].value;
        destinatario = datos[2].value;
        gramos = datos[3].value;
        composicion = datos[4].value;
        numCuenta = datos[5].value;
    }

    return valido;
}

/**
 * Inicio del programa. Controla el evento del formulario
 */
function inicio(){
    // Evita que la página se recargue al enviar el formulario
    document.querySelector("#producto").addEventListener("submit", (evento)=> {
        evento.preventDefault();
        validarDatos();
    });
}

inicio();


