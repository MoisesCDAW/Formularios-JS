const fotos = [
    "img/abraham.png",
    "img/bard.png",
    "img/homero.png",
    "img/lisa.png",
    "img/milhouse.png",
    "img/ned.png"
];

/**
 * Maneja cuando una celda se debe revelar, ocultar o marcar como emparejada
 * También se encarga de llevar un contador de parejas encontradas
 * @param {Object} evento 
 */
function manejarEvento(evento) {
    let reveladas;

    if (evento.target.className!="revelada") { // Para que no pueda desmarcar una celdas
        if (evento.target.className!="emparejada") { // Para desactivar la celda cuando se empareja
            if (evento.target && evento.target.tagName === 'TD') {
    
                evento.target.classList.toggle("oculta");
                
                if (evento.target.classList.toggle("revelada")==true) {
                    evento.target.style.backgroundImage = "url('"+fotos[evento.target.value]+"')";
                }
            }
        
            // Guarda cuántas celdan están reveladas en el momento, permitiendo solo 2 activas
            reveladas = document.querySelectorAll(".revelada");
        
            if (reveladas.length==2) {

                // Cambia la clase de la celda si se empareja
                if (reveladas[0].value==reveladas[1].value) {
                    setTimeout(()=>{
                        reveladas.forEach((x)=>{
                            x.className =""; 
                            x.classList.add("emparejada");
                            x.removeAttribute("style");
                        });
                    }, 400);
                    
                    // Agrega +1 si se empareja
                    document.querySelector("#resultados").textContent = Number(document.querySelector("#resultados").textContent)+1;
        
                }else{
                    // Si no coinciden las fotos, se ocultan
                    setTimeout(()=>{
                        reveladas.forEach((x)=>{
                            x.className =""; 
                            x.classList.add("oculta");
                            x.removeAttribute("style");
                        });
                    }, 400);
                }

                // Si es 6, es porque ya se emparejaron todas
                if (document.querySelector("#resultados").textContent=="6") {
                    setTimeout(()=>{
                        alert("¡Felicidades! Encontraste todas las parejas");
                        location.reload();
                    }, 530);
                    
                }
            }
        }
    }

}


/**
 * Asinga las fotos y sus parejas a una celda aleatoria y crea el evento de click sobre la tabla
 */
function inicio() {
    let numsA = [];
    let numsB = [];
    let longitud = fotos.length;

    // Guarda en un array las posiciones que tendrán las primeras 6 fotos
    for (let i = 0; i < longitud; i++) {
        let num = Math.floor(Math.random()*longitud);
        if (numsA.indexOf(num)==-1) {
            numsA.push(num);
        }else{
            i--;
        }
    }

    // Guarda en un array las posiciones que tendrán las parejas
    for (let i = 0; i < longitud; i++) {
        let num = Math.floor(Math.random()*longitud);
        if (numsB.indexOf(num)==-1) {
            numsB.push(num);
        }else{
            i--;
        }
    }

    // Se asigna la foto a cada celda
    document.querySelectorAll("tr").forEach((x)=>{
        x.querySelectorAll("td").forEach((y)=>{
            if (numsA.length!=0) {
                y.value = numsA[0];
                numsA.shift();
            }else{
                y.value = numsB[0];
                numsB.shift();
            }
        });
    });

    // Se crea el evento de click sobre la tabla
    document.querySelector("table").addEventListener("click", manejarEvento);
}

inicio();
