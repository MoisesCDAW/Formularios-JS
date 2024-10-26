const fotos = [
    "img/abraham.png",
    "img/bard.png",
    "img/homero.png",
    "img/lisa.png",
    "img/milhouse.png",
    "img/ned.png"
];


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

    document.querySelector("table").addEventListener("click", (evento)=>{
        if (evento.target && evento.target.tagName === 'TD') {

            evento.target.classList.toggle("oculta");
            
            if (evento.target.classList.toggle("revelada")==true) {
                evento.target.style.backgroundImage = "url('"+fotos[evento.target.value]+"')";
            }else{
                evento.target.removeAttribute("style");
            } 
        }
    });

}

inicio();
