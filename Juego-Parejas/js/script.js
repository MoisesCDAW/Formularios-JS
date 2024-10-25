const fotos = [
    "../img/abraham",
    "../img/bard",
    "../img/homero",
    "../img/lisa",
    "../img/milhouse",
    "../img/ned"
];


function asignaFotos() {
    let numeros = [];
    let longitud = fotos.length;

    for (let i = 0; i < longitud; i++) {
        let num = Math.floor(Math.random()*longitud);
        if (numeros.indexOf(num)==-1) {
            numeros.push(num);
        }else{
            i--;
        }
    }
    

    document.querySelectorAll("tr").forEach((x)=>{
        x.querySelectorAll("td").forEach((y)=>{
            y.classList.toggle("revelada");
            console.log(numeros);
            y.style.background=fotos[numeros[0]];
            numeros.shift();
        });
    });

}

function inicio() {
    document.querySelector("table").addEventListener("click", (evento)=>{
        if (evento.target && evento.target.tagName === 'TD') {
            evento.target.classList.toggle("revelada");
        }
    });
    asignaFotos();
}

inicio();
