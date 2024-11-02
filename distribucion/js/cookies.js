// EJEMPLO DE USO:
// setCookie("ejemplo", "2", {expires: new Date("2024-12-5"), samesite:"strict"});
// console.log(getCookie("ejemplo"));
// dropCookie("ejemplo");


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
 * Busca si la cookie existe y la imprime si no, la crea y la inicializa con el valor 0
 */
function inicio() {
    let cookie = getCookie("contador");
    let posicion = document.querySelector("#contador");
    let contador = localStorage.getItem("contador");

    if (cookie==false) {
        setCookie("contador", "0", {expires: new Date("2026"), samesite: "strict"});
        posicion.innerHTML = "0";
    }else {
        if (cookie["contador"]!=contador && contador!=null) {
            setCookie("contador", contador, {expires: new Date("2026"), samesite: "strict"});
            cookie = getCookie("contador");
        }
        posicion.innerHTML = cookie["contador"];
    }
}

inicio();