const testMode = false;
const testQuestN = 0;
const catalog_questsPerClick = 20;
const catalogQuestionWordLimit = 250;
/*[c] FUNCIONES */
//utilities
function setRandomNumber(min = 0, max = 4){
    return Math.floor(Math.random() * ( max - min) ) + min;
};
function completeAsignatureName(abbreviation){
    switch (abbreviation) {
        case "rob":
			return "Robótica"
			break;
		case "vs":
            return "Vida Saludable"
            break;
        case "qui":
            return "Química"
            break;    
        case "eng":
            return "Inglés"
            break;
        case "esp":
            return "Español"
            break;     
        case "his":
            return "Historia"
            break; 
        case "val":
            return "Valores"
            break;
        case "Tec":
            return "Tecnología"
            break;
        case "ef":
            return "Educación Física"
            break; 
        case "fcye":
            return "Formación Cívica y Ética"
            break;
        case "aje":
            return "Ajedrez"
            break;
        case "art":
            return "Artes"
            break; 
        case "tuto":
            return "Tutoría"
            break;
        case "emp":
            return "Emprendimiento"
            break;
                
        default:
            return "Asignatura Indefinida"
            break;
    }
};
function numberToRoman(number){
    switch(number){
        case 1:
            return "I"
            break;
        case 2:
            return "II"
            break;
        case 3:
            return "III"
            break;
        case 4:
            return "IV"
            break;
        case 5:
            return "V"
            break;
        case 6:
            return "VI"
            break;
        case 7:
            return "VII"
            break;
        case 8:
            return "VIII"
            break;

        default:
            return "Indefinido"
            break;
    }
}
function REFRESH(){
    window.scrollTo(0, 0);
    clearBtnsBar();
    clearPageArea();

    openWelcomePage();
}
function home(){
    openWelcomePage()

    btnsBar.style.background = "var(--main-clr)"
}

//CONSOLE MSGS
function clrConsoleText(text = '[clrConsoleText FUNCTION] without text ', clr = '#fff', bg = '#2a2080'){
    console.log(`%c ${text} `, `background: ${bg}; color: ${clr}`);
};
function success(text) {
    clrConsoleText(text, 'white', 'green');
};
function fail(text) {
    clrConsoleText(text, 'white', 'red');
};
function resaltedMsg(text) {
    clrConsoleText(text, 'white', 'purple');
};
function newResaltedMsg(text) {
    clrConsoleText(text, 'black', 'aqua');
};

//DOM MANIPULATION
function appear(element, type = "block"){
    element.style.display = type;
};
function disappear(element){
    element.style.display = "none";
};
function clearHTML(element){
    element.innerHTML = "";
};

//LOCAL STORAGE FUNCTIONS
function saveQuestsData(){
    localStorage.removeItem("quests");
    localStorage.setItem("quests", JSON.stringify(questList));
};
function LS_createItem(itemName, creationCallback = ()=>{console.log("[LS] sin callback de creacion")}){
    console.log("LS_createItem()");
    if(!localStorage.getItem(itemName)){

        localStorage.setItem(itemName, "[]");
        console.log(`[LS]se creo '${itemName}' en la LS`);
        creationCallback();

    };
};
function LS_addToItem(itemName, newContent){
    let content = localStorage.getItem(itemName); //se obtiene el contenido del item...
    content = JSON.parse(content); //se convierte en array JS el item...
    content.push(newContent); //se agrega el nuevo contenido al array JS...
    content = JSON.stringify(content); //se convierte en string el array JS...

    localStorage.removeItem(itemName);
    localStorage.setItem(itemName, content);
};
function RESET_QUESTS(){
    localStorage.removeItem("quests");
}; // nunca es usada en la web, pero se puede usar en la consola para limpiar el LS



let defaultQuests = [];
function setQuest(question = "question", answer ="answer", 
    incorrectAnswer = ["incorrectAnswer1", "incorrectAnswer2", "incorrectAnswer3"], 
    cat1 ="",cat2 =0, ex ="sin explicacion D:",
    LS = false){

    let newQuestInfo = {
        question: question, 
        answer: answer,
        incorrectAnswer: incorrectAnswer, 
        cat1: cat1,
        cat2: parseInt(cat2),
        ex: ex,
        default: LS
    };

    switch (LS) {
        case true: 
            defaultQuests.push(newQuestInfo)
            break;
    
        default:
            questList.push(newQuestInfo);
            saveQuestsData();
            break;
    }

    console.log("NUEVO QUIZ CREADO");
};
LS_createItem('quests',()=>{
    setQuest("En qué consistió la Revolución Mexicana ( 1910 - 1917 ) ?", 
        "acabar la dictadura de Porfirio Díaz",
        ["guerra internacional con USA",
        "acabar con el dominio Español",
        "independencia de Texas",
        "invencion de maquinas industriales"],
        "his",
        1,
        `La Revolución Mexicana fue un conflicto armado que inició en 1910, 
        como consecuencia del descontento popular hacia la dictadura de Porfirio Díaz, y 
        que derivaría en una guerra civil que transformaría radicalmente las estructuras 
        políticas y sociales del país.`,
        true
    );
    setQuest("cúales son las propiedades EXTENSIVAS en Química?",
        "las que dependen del tamaño",
        ["las que no dependen del tamaño",
        "las que tienen baja fuerza intermolecular",
        "las que son contables"],
        "qui",
        1,
        "Las propiedades Químicas de un objeto son las que dependen del tamaño de este mismo",
        true
    );
});
let questList = localStorage.getItem("quests");
questList = JSON.parse(questList);
for (let i = 0; i < defaultQuests.length; i++) {
    const element = defaultQuests[i];
    questList.push(element);
}
saveQuestsData();
console.log(questList);


//SUBPAGES y mas

function openWelcomePage(){
    clearBtnsBar();
    clearPageArea();

    appear(welcomePage);
}
function clearBtnsBar(){
    for (let i = 0; i < btnsBarBtns.length; i++) {
        const element = btnsBarBtns[i];
        disappear(element);
    }
    console.log("se ha limmpiado la barra de btns");

    appear(homeBtn);
    window.scrollTo(0, 0);
}
function clearPageArea(){
    for (let i = 0; i < pageContent.length; i++) {
        const element = pageContent[i];
        disappear(element);
    }
    window.scrollTo(0, 0);
    console.log("se ha limmpiado la pagina");
}
function clearAll(){
    clearBtnsBar()
    clearPageArea()
}



/*[c] DOM */

//subpages/sectiones:
const catalogSection = document.querySelector("#catalogSection")
const articleSection = document.querySelector("#articleSection");

//divs:
const pageContent = document.querySelectorAll("#pageContent > main");
const page = document.querySelector("#pageContent");
const menuSuggestedContents = document.querySelector("#menuSuggestedContents");

const btnsBar = document.querySelector("#btnsBox");
const catalogAsignsBox = document.querySelector("#catalogAsignsBox");


//btns:
const btnsBarBtns = document.querySelectorAll("#btnsBox button");

const homeBtn = document.querySelector("#homeBtn");
const BTNto_catalogSection = document.querySelector("#BTNto_catalogSection");
const BTNto_appearSubtopicsCatalog = document.querySelector("#BTNto_appearSubtopicsCatalog");

//inputs:


/*
{
    title: "Titulo",
    asign: "materia abreviada",
    unity: 0,
    mini: "link de miniatura",
    grade: 9,
    pdf: "link del documento para leer",
    audio: "link del audio",
    link: "link a la subpagina donde estara el pdf, questionario y mas",
    quiz: [
        question: "pregunta",
        answer: "respuesta correcta",
        incorrectAnswer: [
            "1",
            "2",
            "3"
        ]
    ]
}
*/

/*
{
    title: "Titulo no tan largo",
    asign: "materia",
    unity: 0,
    mini: "link de miniatura",
    grade: 9,
    pdf: "link del documento pdf en google drive",
    audio: "link del audio en google drive",
    quiz: [
        question: "En que fechas se desarrollo la Guerra Cristera?",
        answer: "1926-1929",
        incorrectAnswer: [
            "1924-1928",
            "1918-1923",
            "1915-1925"
        ],
        [
        question: "Otra pregunta",
        answer: "respuesta correcta",
        incorrectAnswer: [
            "1",
            "2",
            "3"
        ],
        [
        question: "pregunta",
        answer: "respuesta correcta",
        incorrectAnswer: [
            "1",
            "2",
            "3"
        ],
        [
        question: "pregunta",
        answer: "respuesta correcta",
        incorrectAnswer: [
            "1",
            "2",
            "3"
        ]
    ]
}
*/
/*
const article = [
    {
        title: "El diagrama de lewis y los tipos de enlaces",
        unity: 4
    },
    {
        title: "Titulo 2",
        unity: 2
    },
    {
        title: "Titulo 3",
        unity: 1
    },
    {
        title: "Titulo 4",
        unity: 3
    }
]*/

const article = [
    {  
    title: "Revolución y justicia social",
    asign: "his",
    unity: 2,
    mini: "link de miniatura",
    grade: 9,
    pdf: "https://drive.google.com/file/d/1vsEo2qxZ2iRLOwBdFHL6LlF7Nk745zHw/preview",
    audio: "link del audio en google drive",
    quiz: [
        {
        question: "¿Quiénes eran los magonistas?",
        answer: "Fueron el primer grupo contrario a Díaz, creían un cambio mediante la fuerza",
        incorrectAnswer: [
            "Grupo liberal que buscaba un medio pacífico para terminar con la dictadura de Díaz",
            "Grupo liberal a favor de no terminar con la dictadura de Díaz"]
        },
        {
        question: "¿Quiénes eran los maderistas?",
        answer: " Grupo liberal que buscaba un medio pacífico para terminar con la dictadura de Díaz.",
        incorrectAnswer: [
            "Fueron el primer grupo contrario a Díaz, creían un cambio mediante la fuerza",
            "Grupo liberal a favor de no terminar con la dictadura de Díaz"]
        },
        {
        question: "Persona que está a favor de la libertad, rechaza la autoridad política y se opone al Estado.",
        answer: "Anarquista",
        incorrectAnswer: [
            "Socialista",
            "Maderista"]
        },
        {
        question: "Persona perteneciente a la igualdad de clases, donde los medios de producción y la propiedad se controlan de manera colectiva.",
        answer: "Socialista",
        incorrectAnswer: [
            "Anarquista",
            "Peninsulares"]
        },
        {
        question: "¿Cuándo se firmó el tratado en el cual se establecía la renuncia de Díaz y del vicepresidente Ramon Corral?",
        answer: "El 21 de mayo de 1911",
        incorrectAnswer: [
            "20 de noviembre de 1910",
            "16 de septiembre de 1820"]
        },
        {
        question: "Rebelión en el cual se desconoce a madero como presidente y es encabezado por Bernardo Reyes:",
        answer: "Rebelión reyista",
        incorrectAnswer: [
            "Rebelión Zapatista",
            "Rebelión de Orozco" ]
        },
        {
        question: "Rebelióna la cual conto con apoyo militar y de otros sectores de la población a causa de un descontento por retribuciones injustas:",
        answer: "Rebelión de Pascual Orozco",
        incorrectAnswer: [
            "Rebelión reyista",
            "Rebelión de Félix Díaz"]
        },
        {
        question: "Encabezado por Emiliano Zapata. Buscaba la devolución de las tierras usurpadas por hacendados porfiristas.",
        answer: "Rebelión zapatista",
        incorrectAnswer: [
            "Rebelión de Pascual Orozco",
            "Rebelión reyista"]
        }]

    },
    {
        title: "Experimentación con mezclas",
        asign: "qui",
        unity: 1,
        mini: "link de miniatura",
        grade: 9,
        pdf: "https://docs.google.com/file/d/1kFaaKH480HkkL-bZIsuqtJrMLA7Lgaa54G584oLfURA/preview",
        audio: "link del audio en google drive",
        quiz: [
            {
            question: "¿Qué es una mezcla homogénea?",
            answer: "Son componentes que no se distinguen a simple vista",
            incorrectAnswer: [
            "Es una propiedad",
            "Es un componente que se distingue a simple vista",
            "Son componentes que se distinguen con un microscopio"
            ]},
            {
            question: "¿Qué es una mezcla heterogénea?",
            answer: "Son componentes que se distinguen a simple vista",
            incorrectAnswer: [
            "Es un componente que no se distinguen a simple vista",
            "Es una disolución",
            "Es un solvente o un soluto"
            ]},
            {
            question: "¿Cómo se le puede llamar a la mezcla homogénea?",
            answer: "Disolvente",
            incorrectAnswer: [
            "Disoluto",
            "Soluto",
            "Solvente"
            ]},
            {
            question: "¿Cuáles son las dos disoluciones que existen?",
            answer: "Disolvente y soluto",
            incorrectAnswer: [
            "heterogénea y soluto ",
            "disolvente y homogénea",
            "soluto y ebullición"
            ]},
            {
            question: "¿Qué es la filtración?",
            answer: "Con este método se puede separar un sólido insoluble de grano desde grueso hasta fino",
            incorrectAnswer: [
            "Consiste en separar gases o liquidos con la ayuda de un solvente",
            "Es la sustancia de mayor cantidad",
            "Es la sustancia de menor cantidad"
            ]},
            {
            question: "¿Qué es el disolvente?",
            answer: "Es la sustancia de mayor cantidad",
            incorrectAnswer: [
            "Es la sustancia intermedia",
            "Es la sustancia de menor cantidad",
            "Es la sustancia más pequeña que hay"
            ]},
            {
            question: "¿Qué es el soluto?",
            answer: "Es la sustancia con menor cantidad",
            incorrectAnswer: [
            "Es la sustancia con mayor cantidad",
            "Es la sustancia intermedia",
            "Es la sustancia más usada"
            ]},
            {
            question: "¿Cuál sería un ejemplo de una mezcla heterogénea?",
            answer: "Sándwich",
            incorrectAnswer: [
            "Agua de limón",
            "Café",
            "Perfume"
            ]}
        ]
    },
    {
    title: "La tabla periodica",
    asign: "qui",
    unity: 3,
    mini: "link de miniatura",
    grade: 9,
    pdf: "https://docs.google.com/file/d/1IxgNpTCnSkedbssvjlQJW1C6NiJdH0cAoCjn2N6CdNc/preview",
    audio: "link del audio en google drive",
    quiz: [
        {
        question: "¿Cuál es el otro nombre que se le pueden llamar a los grupos que están en forma vertical?",
        answer: "Familias",
        incorrectAnswer: [
        "Valencia",
        "Periodos",
        "Masa atomica"
        ]},
        {
        question: "¿Cuántos elementos tiene la tabla periódica?",
        answer: "118 elementos",
        incorrectAnswer: [
        "120 elementos",
        "116 elementos",
        "110 elementos"
        ]},
        {
        question: "¿Cuántos periodos hay en la tabla periodica?",
        answer: "7",
        incorrectAnswer: [
        "8",
        "9",
        "6"
        ]},
        {
        question: "¿Quién presento por primera vez la tabla periodica?",
        answer: "Mendeléiev",
        incorrectAnswer: [
        "Cannizzaro",
        "Marie Curie",
        "Lavoisier"
        ]},
        {
        question: "¿En que año se creo la tabla periódica?",
        answer: "1869",
        incorrectAnswer: [
        "1870",
        "1868",
        "1879"
        ]},
        {
        question: "¿Cuáles son los 3 tipos de elementos que hay?",

        answer: "Metales, metaloides y no metales",
        incorrectAnswer: [
        "Metaloides, valencia y grupos",
        "No metales, periodos y grupos",
        "Periodos, grupos y familias"
        ]},
        {
        question: "¿Cuál es el elemento más electronegativo?",
        answer: "Flúor",
        incorrectAnswer: [
        "Cobre",
        "Aluminio",
        "Carbono"
        ]},
        {
        question: "Menciona una característica de los metales",
        answer: "Son buenos conductores de electricidad",
        incorrectAnswer: [
        "No son maleables",
        "Son frágiles y quebradizos",
        "No son corrosivos"
        ]},
        {
        question: "Menciona una característica de los no metales",
        answer: "No son maleables",
        incorrectAnswer: [
        "Son dúctiles",
        "Son resistentes a su alta densidad",
        "Son buenos conductores de electricidad"
        ]},
        {
        question: "¿Que es la valencia?",
        answer: "Es el número que expresa la capacidad de un átomo para combinarse con otro y formar sustancias",
        incorrectAnswer: [
        "Es el número total de protones y neutrones presentes en el núcleo",
        "Es el número que expresa en que posición de la tabla va estar",
        "Es el número que expresa la capacidad de electronegatividad que tiene"
        ]},
        {
        question: "¿Como ordeno los elementos Mendeléiev? ",
        answer: "Los acomodo de forma ascendente según su masa atómica",
        incorrectAnswer: [
        "Los ordeno por sus propiedades que tenía cada elemento",
        "Los ordeno por el que tenía más protones y neutrones",
        "Los acomodo por su forma y características que tenían"
        ]}
        ]
    }
];

const asignsList = ["qui", "esp", "his"]

/*FUNCIONES DE TEORIM */

function generateArticleBoxes(div, limit = 8) { //PROXIMAMENTE: asign, unity
    for (let i = 0; i < limit; i++) {
        const e = article[i];
        if (!e) {
            break;
        }
        console.log(i);

        div.innerHTML += `

        <a onclick="openArticle(${i})" class="articleBox">

            <img src="https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/06/15175543/Collage-Antologias.jpg" alt="">

            <div class="articleBoxInfo">	
                <p class="title">${e.title}...</p>
                <p class="asign">${completeAsignatureName(e.asign)}</p> 
                <p class="unity">BLOQUE ${numberToRoman(e.unity)}</p>
            </div>
 
        </a>

        `;


    }
}

function openCatalogSection(){
    clearAll();
    appear(catalogSection);
}

function openArticle(ubication){
    clearAll();
    console.log(ubication);
    appear(articleSection);

    articleSection.innerHTML = `
    <div class="imgBox" style="background-color: var(--main-clr-2);">
        <img width="80px" src="./logo.png" style="margin-top: 10px; " alt="seplin logo quiz app web questionaries free netlify study active recall">

        <p class="niceBox " style="color: var(--clr); background: none; padding-bottom: 20px;">
            ADEMIX
        </p>
    </div>

    <p class="niceBox " style="font-size: 19px; margin-top: -5px;"> 
        Acá La Bendición De Occidente
    </p>
    <br>`;
}


function loadCatalogSection(){


    for (let i = 0; i < asignsList.length; i++) {
        const selectedAsign = asignsList[i];
        console.log(selectedAsign);
        
        catalogAsignsBox.innerHTML += `
        <a class="mainClr2 suggestedContents" id="BTNto_appearSubtopicsCatalog" onclick="toggleCatalogSubtopics(${i})">
            ${completeAsignatureName(selectedAsign)}
            <button class="tinyBtn">
                <ion-icon name="caret-down"></ion-icon>
            </button>
        </a> 
        <a class="mainClr2 suggestedContents subtopicsBox" id="subtopicsBox${i}" style="display: none;"></a> `;

        for (let y = 0; y < article.length; y++) {
            const e = article[y];
    
            if (e.asign == selectedAsign) {
                let subtopicsBox = document.querySelector(`#subtopicsBox${i}`);
                subtopicsBox.innerHTML += `
                <p class="catalogItem" onclick="openArticle(${y})">BLOQUE ${numberToRoman(e.unity)} - ${e.title}</p>
                `;
            }
        }
    }
}

function toggleCatalogSubtopics(i){
    const subtopicsBox = document.querySelector(`#subtopicsBox${i}`);

    if(subtopicsBox.style.display === "none"){
        appear(subtopicsBox);
    } else{
        disappear(subtopicsBox);
    }

}
let actualOpenArticle = undefined;
function openArticle(ubication){
    clearAll()
    appear(articleSection)

    actualOpenArticle = ubication;
    const e = article[ubication];
    //e.pdf = "undefined";

    articleSection.innerHTML = `
    <div class="imgBox" style="background-color: var(--main-clr-2);">
        <img width="80px" src="./logo.png" style="margin-top: 10px; " alt="seplin logo quiz app web questionaries free netlify study active recall">

        <p class="niceBox " style="color: var(--clr); background: none; padding-bottom: 20px;">
            JEKIDA
        </p>
    </div>

    <p class="niceBox " style="font-size: 19px; margin-top: -5px;"> 
        Acá La Bendición De Occidente
    </p>
    <br>

    <embed src="${e.pdf}" width="100%" height="480" allow="autoplay"></embed>

    <div class="niceBox mainClr2" id="articleExamBox">

        <div style="color: var(--main-clr);">QUESTIONARIO</div>

        <div id="quizesBox"></div>

        
        <button type="submit" onclick="verifyAnswers">CONTESTAR!</button>
    </div>`

    for (let i = 0; i < e.quiz.length; i++) {
        const quiz = e.quiz[i];
        const quizesBox = document.querySelector("#quizesBox");

        quizesBox.innerHTML += `
        <div class="mainClr2 questionBox" id="questionBox${i}">
            <p>${i} - ${quiz.question}</p>
            <select id="optionsBox${i}">
            </select>

        </div>
        `;

        let optionsBox = document.querySelector(`#optionsBox${i}`);

        let allAnswers = quiz.incorrectAnswer.concat(quiz.answer);
        allAnswers.sort(function() { return Math.random() - 0.5 });


        for (let z = 0; z < allAnswers.length; z++) {
            
            optionsBox.innerHTML += `<option>${allAnswers[z]}</option>`
            
        }
        
    }
    const verifyButton = document.querySelector("#articleExamBox button");
    verifyButton.addEventListener("click", verifyAnswers)

}

function verifyAnswers() {
    console.log(actualOpenArticle)
}

/*[c] EVENT LISTENERS */
homeBtn.addEventListener("click", home);

BTNto_catalogSection.addEventListener("click", openCatalogSection);
 

const quizesOfExam = document.querySelectorAll("#questionBox");


generateArticleBoxes(menuSuggestedContents);
loadCatalogSection();
openWelcomePage();
