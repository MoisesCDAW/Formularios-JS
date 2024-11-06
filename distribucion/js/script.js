let fechaElaboracion = "";
let cocinero = "";
let direccion = "";
let gramos = 0;
let composicion = "";
let numCuenta = "";
let contador = 0;

/**
 * Permite recuperar una cookie por su nombre
 * @param {String} nombre de la cookie que se quiere recuperar
 * @returns Objeto con la clave-valor de la cookie
 */
function getCookie(nombre) {
    let cookie = false;

    document.cookie.split(";").map((x)=>{
        x = x.trim();
        nom = decodeURIComponent(x.substring(0, x.indexOf("="))); // decodeURIComponent(). Decodifica la URL y la convierte a su formato original
        valor = decodeURIComponent(x.substring(x.indexOf("=")+1, x.length));
    
        if (nom == nombre) {
            cookie={[nombre]:valor};
        }
    });

    return cookie;
}


/**
 * Permite crear una cookie
 * @param {String} nombre que tendrá la cookie
 * @param {String} valor para la cookie
 * @param {Object} opciones opcionales que tendrá la cookie
 */
function setCookie(nombre, valor, opciones = {}) {
    let str = `${nombre}=${valor};`;
    
    Object.entries(opciones).forEach(([key, value])=>{ // Object.entries(obj): Devuelve un array de pares clave-valor.
        let aux = `${key}=${value};`;
        str += aux;
    });

    document.cookie = str;
}


/**
 * Permite borrar una cookie
 * @param {String} nombre de la cookie que se quiere borrar
 */
function dropCookie(nombre) {
    setCookie(nombre, "", {expires: new Date("2020")});
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
        direccion = datos[2].value;
        gramos = datos[3].value;
        composicion = datos[4].value;
        numCuenta = datos[5].value;
    }

    return valido;
}


/**
 * Permite reiniciar el contador
 */
function reiniciar() {
    document.querySelector("#reiniciar").addEventListener("click", ()=>{
        contador = 0;
        dropCookie("contador");
        document.querySelector("#contador").innerHTML = contador;
    });
}


/**
 * Permite al usuario volver al formulario para ingresar nuevos datos
 */
function volver() {
    contador = 0;
    dropCookie("contador");
    document.querySelector("#volverForm").addEventListener("click", ()=>{
        location.reload();
    });

}


/**
 * Muestra los datos ya validados ingresados por el usuario
 */
function pintaDatos() {
    const strDOM = `
        <div id="etiqueta">
            <p id="num-producto">Producto NºXX</p>
            <p id="informacion"></p>
            <button id="volverForm">Volver al Form</button>
        </div>
    `;

    let datos = `
        <span>Fecha Elaboración:</span> ${fechaElaboracion}<br>
        <span>Cocinero:</span> ${cocinero}<br>
        <span>Destino:</span> ${direccion}<br>
        <span>Gramos:</span> ${gramos}<br>
        <span>Composición:</span> ${composicion}<br>
        <span>Nº Cuenta:</span> ${numCuenta}<br>
        <span>Formato alternativo:</span> ${numCuenta.replaceAll("-", "")}
    `;

    document.querySelector("#contenedor").innerHTML = strDOM;
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
        alert("ERROR. El formato debe ser: gramos seguido de dos conjuntos de una o dos letras seguidas o no de un número");
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
                alert("ERROR. El formato debe ser:  Dos letras, un símbolo ($%&@#) y cuatro dígitos");
                valido = 0;

                
            }else {

                // direccion
                let indice = direccion.indexOf("_");
                let aux = direccion.substring(0, indice).toUpperCase();
                aux += direccion.substring(indice, direccion.length);
                direccion = aux;
                
                expresion = /^[A-Z]{2,3}[_][a-z]+[:][0-9]{4}$/;
                if (!expresion.test(direccion)) {
                    alert("ERROR. El formato debe ser: Dos o tres letras, un guión bajo, nombre de la ciudad, dos puntos y 4 digitos");
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
    }else {
        contador++;
        setCookie("contador", contador, {expires: new Date("2026"), samesite: "strict"});
        document.querySelector("#contador").innerHTML = contador;
    }
}


/**
 * Inicio del programa. Controla el evento del formulario
 */
function inicio(){

    // Busca si la cookie existe y la imprime si no, la crea y la inicializa con el valor 0
    let cookie = getCookie("contador");
    let posicion = document.querySelector("#contador");

    if (cookie==false) {
        setCookie("contador", "0", {expires: new Date("2026"), samesite: "strict"});
        posicion.innerHTML = "0";
        contador = 0;
    }else {
        posicion.innerHTML = cookie["contador"];
        contador = cookie["contador"];
    }

    // Evita que la página se recargue al enviar el formulario
    document.querySelector("#producto").addEventListener("submit", (evento)=> {
        evento.preventDefault();
        validarDatos();
    });

    reiniciar();
}

inicio();


