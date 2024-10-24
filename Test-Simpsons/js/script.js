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


function validarRespuestas(boton) {
    let correctas = 0;

    document.querySelector("#preguntas").addEventListener("submit", function(evento) {
        evento.preventDefault();
    });


    const marcados = Array.from (document.querySelectorAll("input[type=radio]:checked"));
    
    if (marcados.length==0) {


        // NOTA: Agregar clase que pinte la pregunta que falta



    }else {
        // document.querySelector("#"+boton.id).hidden = true;        // OJO: Descomentar

        for (let i = 0; i < 2; i++) {                   // OJO: Cambiar al length de "preguntas"
            let posicion = document.querySelector("#resultado-"+i);
            posicion.className = "";

            if (marcados[i].value==preguntas[i].resc) {
                correctas++;
                posicion.classList.add("correcta");
            }else{
                posicion.classList.add("incorrecta");
            }
        }
    }
    

    document.querySelector("#num-correctas").innerHTML = `Resultado: ${correctas} / 10`;
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

    for (let i = 0; i < 2; i++) {                       // OJO: Cambiar al length de "preguntas"
        let respuestas = cambiaOrdenRespuestas(preguntas[i]);    

        str = `           
            <div class="cont-pregunta">
                <p id="pregunta-x">Pregunta sobre la serie de televisión</p>
                <input type="radio" name="opcion-x" id="radio-x-0"><span id="res-x-0">Respuesta uno</span>
                <input type="radio" name="opcion-x" id="radio-x-1"><span id="res-x-1">Respuesta dos</span>
                <input type="radio" name="opcion-x" id="radio-x-2"><span id="res-x-2">Respuesta tres</span>
                <div id="resultado-x"></div>
            </div>`;
        
        
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

        if (i < 1) {                               // OJO: Cambiar al length de "preguntas"
            document.querySelector("#preguntas").innerHTML += str;
        }
        
    }

    str = `<button id="enviar" onclick=validarRespuestas(this)>Enviar</button>`;
    document.querySelector("#preguntas").innerHTML += str;
}

pintaPreguntas();
