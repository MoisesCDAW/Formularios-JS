const preguntas = [
    {pregunta: "¿Cómo se llama la familia principal?", 
        resc: "Simpson.",
        res2: "Flanders.",
        res3: "Hibbert."
    },
    {pregunta: "¿Cómo se llama la cerveza que bebe Homero?", 
        res1: "Buff.",
        resc: "Duff.",
        res3: "Puff."
    },
    {pregunta: "¿En dónde trabaja Homero?", 
        resc: "En una Planta Nuclear.",
        res2: "En el Kwik-E-Mart.",
        res3: "En la Tienda para Zurdos."
    },
    {pregunta: "¿Quién es la más inteligente de la familia Simpson?", 
        res1: "Marge",
        res2: "Lisa",
        resc: "Maggie"
    },
    {pregunta: "¿De qué color es el donut preferido de Homero?", 
        resc: "Rosa",
        res2: "Blanca",
        res3: "Beige"
    },
    {pregunta: "¿De qué color son los Simpson?", 
        res1: "Blancos",
        resc: "Amarillos",
        res3: "Negros"
    },
    {pregunta: "¿Cuántos miembros tiene la familia Simpson?", 
        resc: "cinco",
        res2: "seis",
        res3: "cuatro"
    },
    {pregunta: "¿De qué color es el pelo de Marge?", 
        res1: "Amarillo",
        res2: "Negro",
        resc: "Azul"
    },
    {pregunta: "¿Cómo se llama el millonario más famoso de la serie?", 
        resc: "Burns",
        res2: "Ned",
        res3: "Moe"
    },
    {pregunta: "¿Quién creó Los Simpson?", 
        res1: "J. K. Rowling",
        res2: "George Lucas",
        resc: "Matt Groening"
    },
];


function validarRespuestas() {
    let correctas = 0;
    let valido = true;
    let cantidadPreguntas = 10;
    let preCorrectas = [];
    let preIncorrectas = [];

    document.querySelector("#preguntas").addEventListener("submit", function(evento) {
        evento.preventDefault();
    });

    for (let i = 0; i < preguntas.length; i++) {
        const posicionRes = document.querySelector("#resultado-"+i);
        const posicionPre = document.querySelector("#cont-pregunta-"+i);
        const marcado = posicionPre.querySelector("input[type=radio]:checked");
        
        if (marcado!=null) {
            if (marcado.value==preguntas[i].resc) {
                correctas++;
                preCorrectas.push(posicionRes);
            }else{
                preIncorrectas.push(posicionRes);
            }

            posicionPre.querySelectorAll("input[type=radio]").forEach((x)=>x.disabled = true);

            posicionPre.classList.remove("no-marcada");
            marcado.classList.add("marcada");
        }else {
            valido = false;
            posicionPre.classList.add("no-marcada");
        }
    }

    if (valido) {
        preCorrectas.map((x)=>x.classList.add("correcta"));
        preIncorrectas.map((x)=>x.classList.add("incorrecta"));
        document.querySelector("#enviar").hidden = true;
        document.querySelector("#num-correctas").innerHTML = `Resultado: ${correctas} / ${cantidadPreguntas}`;
    }else{
        alert("No has respondido todas las preguntas");
    }
    
}
    

function cambiaOrdenRespuestas(objeto) {
    let nuevoOrden = [];
    let numeros = [];
    let valores = Object.values(objeto);

    for (let i = 0; i < 3; i++) {
        let num = Math.floor(Math.random()*3)+1;
        if (numeros.indexOf(num)==-1) {
            nuevoOrden.push(valores[num]);
            numeros.push(num);
        }else{
            i--;
        }
    }

    return nuevoOrden;
}


function pintaPreguntas() {
    let str = "";

    for (let i = 0; i < preguntas.length; i++) {
        let respuestas = cambiaOrdenRespuestas(preguntas[i]);    

        str = `           
            <div class="cont-pregunta" id="cont-pregunta-x">
                <p id="pregunta-x">Pregunta sobre la serie de televisión</p>
                <input type="radio" name="opcion-x" id="radio-x-0"><span id="res-x-0">Respuesta uno</span>
                <input type="radio" name="opcion-x" id="radio-x-1"><span id="res-x-1">Respuesta dos</span>
                <input type="radio" name="opcion-x" id="radio-x-2"><span id="res-x-2">Respuesta tres</span>
                <div id="resultado-x"></div>
            </div>`;
        
        document.querySelector("#cont-pregunta-x").id = "cont-pregunta-"+i;
        document.querySelector("#pregunta-x").id = "pregunta-"+i;
        document.querySelector("#resultado-x").id = "resultado-"+i;
        document.querySelector("#pregunta-"+i).innerHTML = preguntas[i].pregunta;

        for (let j = 0; j < 3; j++) {
            document.querySelector("[name='opcion-x']").name = "opcion-"+i;
            document.querySelector("#res-x-"+j).id = "res-"+i+"-"+j;
            document.querySelector("#radio-x-"+j).id = "radio-"+i+"-"+j;
            document.querySelector("#radio-"+i+"-"+j).value = respuestas[j];
            document.querySelector("#res-"+i+"-"+j).innerHTML = respuestas[j];
        }

        if (i < preguntas.length-1) {                              
            document.querySelector("#preguntas").innerHTML += str;
        }
        
    }

    str = `<button id="enviar">Enviar</button>`;
    document.querySelector("#preguntas").innerHTML += str;

    document.querySelector("#enviar").addEventListener("click", ()=>{
        validarRespuestas();
    });
}


pintaPreguntas();


