const fotos = [
    "img/abraham.png",
    "img/bard.png",
    "img/homero.png",
    "img/lisa.png",
    "img/milhouse.png",
    "img/ned.png"
];


function manejarEvento(evento) {
    let reveladas;

    if (evento.target && evento.target.tagName === 'TD') {

        evento.target.classList.toggle("oculta");
        
        if (evento.target.classList.toggle("revelada")==true) {
            evento.target.style.backgroundImage = "url('"+fotos[evento.target.value]+"')";
        }else{
            evento.target.removeAttribute("style");
        } 
    }

    reveladas = document.querySelectorAll(".revelada");

    if (reveladas.length==2) {
        if (reveladas[0].value==reveladas[1].value) {
            setTimeout(()=>{
                reveladas.forEach((x)=>{
                    x.className =""; 
                    x.classList.add("emparejada");
                    x.removeAttribute("style");
                });
            }, 400);
            
            document.querySelector("#resultados").textContent = Number(document.querySelector("#resultados").textContent)+1;
        }else{
            setTimeout(()=>{
                reveladas.forEach((x)=>{
                    x.className =""; 
                    x.classList.add("oculta");
                    x.removeAttribute("style");
                });
            }, 400);
        }

        
    }

}


function inicio() {
    let numsA = [];
    let numsB = [];
    let longitud = fotos.length;

    for (let i = 0; i < longitud; i++) {
        let num = Math.floor(Math.random()*longitud);
        if (numsA.indexOf(num)==-1) {
            numsA.push(num);
        }else{
            i--;
        }
    }

    for (let i = 0; i < longitud; i++) {
        let num = Math.floor(Math.random()*longitud);
        if (numsB.indexOf(num)==-1) {
            numsB.push(num);
        }else{
            i--;
        }
    }

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

    document.querySelector("table").addEventListener("click", manejarEvento);
}

inicio();
