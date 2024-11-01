let fechaElaboracion = "";
let cocinero = "";
let direccion = "";
let gramos = 0;
let composicion = "";
let numCuenta = "";


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
        direccion = datos[2].value;
        gramos = datos[3].value;
        composicion = datos[4].value;
        numCuenta = datos[5].value;
    }

    return valido;
}


/**
 * Permite al usuario volver al formulario para ingresar nuevos datos
 */
function volver() {
    const strDOM = `
        <form id="producto">
            <input type="date" id="fecha" value="2024-10-23">
            <input type="text" id="cocinero" placeholder="Nombre cocinero" value="ww$1234">
            <input type="text" id="direccion" placeholder="Dirección destino" value="ww_srgsarg:1234">
            <input type="number" id="gramos" placeholder="Gramos" value="220">
            <input type="text" id="composicion" placeholder="Composición" value="200gC3OH7">
            <input type="text" id="cuenta" placeholder="Nº Cuenta" value="US40-123456789012-34">
            <button>Enviar</button>
        </form>
    `;

    document.querySelector("#volver").addEventListener("click", ()=>{
        document.querySelector("#cuerpo").innerHTML = strDOM;
        inicio();
    });
}


/**
 * Muestra los datos ya validados ingresados por el usuario
 */
function pintaDatos() {
    const strDOM = `
        <div id="etiqueta">
            <p id="producto">Producto NºXX</p>
            <p id="informacion"></p>
            <button id="volver">Volver</button>
        </div>
    `;

    let datos = `
        Fecha Elaboración: ${fechaElaboracion}<br>
        Cocinero: ${cocinero}<br>
        Destino: ${direccion}<br>
        Gramos: ${gramos}<br>
        Composición: ${composicion}<br>
        Nº Cuenta: ${numCuenta}<br>
        Formato alternativo: ${numCuenta.replaceAll("-", "")}
    `;

    document.querySelector("#cuerpo").innerHTML = strDOM;
    document.querySelector("#informacion").innerHTML = datos;

    volver();
}


/**
 * Complemento de la función validarDatos(). 
 * Valida el número de cuenta
 * @returns 1 para valores válidos y 0 para valores inválidos
 */
function validarCuenta() {
    let valido = 1;
    let letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let expresion = /^[A-Z]{2}[0-9]{2}[-][0-9]{12}[-][0-9]{2}$/;
    let aux1, aux2;

    numCuenta = numCuenta.toUpperCase();

    if (expresion.test(numCuenta)) {
        aux1 = letras.indexOf(numCuenta[0])+1;
        aux2 = letras.indexOf(numCuenta[1])+1;
        let primerosDigi = numCuenta.substring(2, 4);


        if ((aux1+aux2)!=primerosDigi) {
            valido = 0;
        }else {
            let seisPri = numCuenta.substring(5, 11);
            aux1 = 0;
            let seisSeg = numCuenta.substring(11, 17);
            aux2 = 0;

            seisPri.split('').forEach((x)=>{ // split('') divide el string en un array de caracteres
                aux1 += Number(x);
            });

            seisSeg.split('').forEach((x)=>{
                aux2 += Number(x);
            });

            aux1 = Math.trunc(aux1/6);
            aux2 = Math.trunc(aux2/6);

            if ((aux1.toString()+aux2.toString())!=numCuenta.substring(18, numCuenta.length)) {
                valido = 0;
            }

        }        
    }else {
        valido = 0;
    }

    if (valido==0) {
        alert("ERROR. Número de cuenta inválido");
    }
    return valido;
}


/**
 * Complemento de la función validarDatos(). 
 * Valida la composición del producto
 * @returns 1 para valores válidos y 0 para valores inválidos
 */
function validarComposicion() {
    let valido = 1;
    let indice = composicion.indexOf("g");
    let gramosAux = parseInt(composicion.substring(0, indice));
    let aux = composicion.substring(0, indice+1);

    aux += composicion.substring(indice+1, composicion.length).toUpperCase();
    composicion = aux;
    expresion = /^[0-9]{1,4}[g][A-Z]{1,2}([0-9])?[A-Z]{1,2}([0-9])?$/;

    if (!expresion.test(composicion)) {
        alert("ERROR. Formato válido: gramos seguido de dos conjuntos de una o dos letras seguidas o no de un número");
        valido = 0;
    }

    if (gramosAux>gramos && valido!=0) {
        alert("ERROR. Los gramos de la composición no pueden ser mayor a los del producto");
        valido = 0;
    }

    return valido;
}



/**
 * Valida todos los datos ingresados en el formulario
 */
function validarDatos() {
    let valido = 1;
    let error = [];

    if (getDatos()) {

        //fecha 
        let inputFecha = new Date(fechaElaboracion);
        let actual = new Date();

        if (inputFecha>actual) {
            alert("ERROR. La fecha de elaboración no puede ser superior a la actual");
            valido = 0;
        }

        if((Math.abs(actual.getFullYear() - inputFecha.getFullYear())) >= 2){
            alert("ERROR. No se puede vender producto de 2 años o más");
            valido = 0;
        }

        if (valido!=0) {

            // Cocinero
            let expresion = /^[A-Z][A-Z][$%&@#][0-9]{4}$/;
            cocinero = cocinero.toUpperCase();
            if (!expresion.test(cocinero)) {
                alert("ERROR. Formato válido:  Dos letras, un símbolo ($%&@#) y cuatro dígitos");
                valido = 0;

                
            }else {

                // direccion
                let indice = direccion.indexOf("_");
                let aux = direccion.substring(0, indice).toUpperCase();
                aux += direccion.substring(indice, direccion.length);
                direccion = aux;
                
                expresion = /^[A-Z]{2,3}[_][a-z]+[:][0-9]{4}$/;
                if (!expresion.test(direccion)) {
                    alert("ERROR. Formato válido: Dos o tres letras, un guión bajo, nombre de la ciudad, dos puntos y 4 digitos");
                    valido = 0;
                }else {

                    // Gramos
                    if (gramos<100 || gramos>5000) {
                        alert("ERROR. Los gramos deben estar entre 100gr y 5000gr");
                        valido = 0;
                    }else {

                        // Composición
                        valido = validarComposicion();

                        if (valido!=0) {
                            // Número de cuenta
                            valido = validarCuenta();
                        }

                    }
                }
            }
        }

        
    }else {
        alert("ERROR. Hay datos vacíos");
    }

    if (valido==1) {
        pintaDatos();
    }
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


