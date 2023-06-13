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
        case "ci":
            return "Ciencias"
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

//divs:
const pageContent = document.querySelectorAll("#pageContent > main");
const page = document.querySelector("#pageContent");
const menuSuggestedContents = document.querySelector("#menuSuggestedContents");

const btnsBar = document.querySelector("#btnsBox");
//btns:
const btnsBarBtns = document.querySelectorAll("#btnsBox button");

const homeBtn = document.querySelector("#homeBtn");
const BTNto_catalogSection = document.querySelector("#BTNto_catalogSection");

//inputs:


/*
{
    title: "Titulo",
    asign: "materia abreviada",
    unity: 0,
    mini: "link de miniatura",
    grade: 9,
    pdf: "link del documento para leer",
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
]

/*FUNCIONES DE TEORIM */

function generateArticleBoxes(div, limit = 8) { //PROXIMAMENTE: asign, unity
    for (let i = 0; i < limit; i++) {
        const e = article[i];
        if (!e) {
            break;
        }
        console.log(i);

        div.innerHTML += `

        <a href="#" class="articleBox">

            <img src="https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/06/15175543/Collage-Antologias.jpg" alt="">

            <div class="articleBoxInfo">	
                <p class="title">${e.title}..</p>
                <p class="asign">QUIMICA</p> 
                <p class="unity">BLOQUE ${numberToRoman(e.unity)}</p>
            </div>
 
        </a>

    `;
    }
}

function openCatalogSection(){
    clearAll()
    appear(catalogSection);
}
generateArticleBoxes(menuSuggestedContents);

/*[c] EVENT LISTENERS */
homeBtn.addEventListener("click", home);

BTNto_catalogSection.addEventListener("click", openCatalogSection);

openWelcomePage();