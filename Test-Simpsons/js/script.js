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


function pintaPreguntas() {
    let str = "";

    for (let i = 0; i < preguntas.length; i++) {
        let correcta = preguntas[i].resc;
        let respuestas = cambiaOrdenRespuestas(preguntas[i]);    

        str = `           
            <div class="cont-pregunta">
                <p id="pregunta-x">Pregunta sobre la serie de televisión</p>
                <input type="radio" name="opcion-x" id="radio-x.0"><span id="res-x.0">Respuesta uno</span>
                <input type="radio" name="opcion-x" id="radio-x.1"><span id="res-x.1">Respuesta dos</span>
                <input type="radio" name="opcion-x" id="radio-x.2"><span id="res-x.2">Respuesta tres</span>
            </div>`;
        
        document.getElementsByName("opcion-x").name = "opcion-"+i;
        document.getElementById("pregunta-x").id = "pregunta-"+i;
        document.getElementById("pregunta-"+i).innerHTML = preguntas[i].pregunta;

        for (let j = 0; j < 3; j++) {
            document.getElementById("res-x."+j).id = "res-"+i+"."+j;
            document.getElementById("radio-x."+j).id = "radio-"+i+"."+j;
            document.getElementById("res-"+i+"."+j).innerHTML = respuestas[j];
        }

        if (i< preguntas.length-1) {
            document.getElementById("preguntas").innerHTML += str;
        }
        
    }

    str = `<button id="enviar">Enviar</button>`;
    document.getElementById("preguntas").innerHTML += str;

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

pintaPreguntas();
