import { app_id, app_key } from "./apiKeys.js";

const BASE_URL = "https://api.edamam.com/api/recipes/v2";

const cuisineType = [
    "American", "Asian","Chinese","French", "Indian", "Italian",
    "Japanese", "Mediterranean", "Mexican"
    
];

const health = [
     "Mediterranean", "pescatarian",
     "vegan", "vegetarian"
];

const alergias = [
    "celery-free", "egg-free", "fish-free", "gluten-free",
     "peanut-free", "pescatarian", "shellfish-free"
];


const calorieRanges = [
    { value: "100-300", text: "100 - 300 kcal" },
    { value: "300-500", text: "300 - 500 kcal" },
    { value: "500-700", text: "500 - 700 kcal" },
    { value: "700-1000", text: "700 - 1000 kcal" },
    { value: "1000+", text: "1000+ kcal" }
]

const mealType = ["Breakfast", "Dinner", "Lunch", "Snack"];


hideComida();
hideDieta();
hideAlergia();
hidePais();
hideCalorias();
hideBoton();
hideBuscar();
hideBotonReset();


let inputElement;
let tipoCaloria = "";
let selectedAllergies = [];
let selectedDietas = [];
let selectedComidas = [];
let selectedPaises = [];


let nextPageUrl = '';

export async function fetchData(query, searchParams = {}) {
    try {
        const url = new URL(BASE_URL);
        url.searchParams.append("type", "public");
        url.searchParams.append("app_id", app_id);
        url.searchParams.append("app_key", app_key);
        url.searchParams.append("q", query);
        
        if (tipoCaloria) url.searchParams.append("calories", tipoCaloria)
        
        

            selectedDietas.forEach(dieta=>{
                url.searchParams.append("health", dieta)
            })

            selectedAllergies.forEach( alergia =>{
            url.searchParams.append("health", alergia)
            }
            )    
            selectedComidas.forEach( comida =>{
                url.searchParams.append("mealType", comida)
                }
                )
            selectedPaises.forEach( pais =>{
                url.searchParams.append("cuisineType", pais)
                }
                )    

      
        
        for (const key of Object.keys(searchParams)) {
            url.searchParams.append(key, searchParams[key]);
        }
        console.log(url.toString());
        const response = await fetch(url.toString());
        const responseData = await response.json();
        nextPageUrl = responseData._links.next.href;
        return responseData;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

export async function fetchDataNextPage() {
    try {
        const response = await fetch(nextPageUrl);
        const responseData = await response.json();
        nextPageUrl = responseData._links.next.href;
        return responseData;
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}
function createSearchInput() {
    const contenedor = document.getElementById("search-container");
    inputElement = document.createElement("input");
    inputElement.placeholder = "Buscar recetas...";
    contenedor.appendChild(inputElement);
}


function hideBuscar(){
    const selectorBuscar = document.getElementById("search-container");
    selectorBuscar.classList.add("hidden");
}


function showPregunta(){
    const selectorPregunta = document.getElementById("selectorPregunta");
    selectorPregunta.classList.remove("hidden");
}
function hidePregunta(){
    const selectorPregunta = document.getElementById("selectorPregunta");
    selectorPregunta.classList.add("hidden");
}


function showComida(){
    const selectorComida = document.getElementById("selectorComida");
    selectorComida.classList.remove("hidden");
}
function hideComida(){
    const selectorComida = document.getElementById("selectorComida");
    selectorComida.classList.add("hidden");
}

function showDieta(){
    const selectorDieta = document.getElementById("selectorDieta");
    selectorDieta.classList.remove("hidden");
}
function hideDieta(){
    const selectorDieta = document.getElementById("selectorDieta");
    selectorDieta.classList.add("hidden");
}

function showAlergia(){
    const selectorAlergia = document.getElementById("selectorAlergia");
    selectorAlergia.classList.remove("hidden");
}
function hideAlergia(){
    const selectorAlergia = document.getElementById("selectorAlergia");
    selectorAlergia.classList.add("hidden");
}
function showPais(){
    const selectorAlergia = document.getElementById("selectorPais");
    selectorAlergia.classList.remove("hidden");
}
function hidePais(){
    const selectorPais = document.getElementById("selectorPais");
    selectorPais.classList.add("hidden");
}

function showCalorias(){
    const selectorCalorias = document.getElementById("selectorCalorias");
    selectorCalorias.classList.remove("hidden");
}
function hideCalorias(){
    const selectorCalorias = document.getElementById("selectorCalorias");
    selectorCalorias.classList.add("hidden");
}

function showBoton(){
    const selectorBoton = document.getElementById("selectorBoton");
    selectorBoton.classList.remove("hidden");
}
function hideBoton(){
    const selectorBoton = document.getElementById("selectorBoton");
    selectorBoton.classList.add("hidden");
}

function showBotonReset(){
    const selectorBoton = document.getElementById("selectorBotonReset");
    selectorBoton.classList.remove("hidden");
}
function hideBotonReset(){
    const selectorBoton = document.getElementById("selectorBotonReset");
    selectorBoton.classList.add("hidden");
}


function createPregunta() {
    const container = document.getElementById("selectorPregunta");
    const pregunta = document.createElement("h1");
    const click = document.createElement("h3");
    pregunta.innerHTML = "WOULD YOU LIKE TO LEARN <br> NEW RECIPES? <br><br>  Start here";
    
    
    pregunta.addEventListener("click", async () => {
        hidePregunta();
        showComida(); 
    });

    click.addEventListener("click", async () => {
        hidePregunta();
        showComida(); 
    });


    

    container.appendChild(pregunta);
    container.appendChild(click);
    
   
}


function createComidaCheckboxes() {
    const container = document.getElementById("selectorComida");
    const pregunta = document.createElement("h1");
    pregunta.innerText = "WHAT ARE YOU LOOKING FOR?";
    const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("tipos-comida");

        mealType.forEach(comida => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = comida;

        const label = document.createElement("label");
        label.innerText = comida;
        label.appendChild(checkbox);
        
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedComidas.push(comida);
            } else {
                selectedComidas = selectedComidas.filter(a => a !== comida);
            }
        });

        checkboxContainer.appendChild(label);
    });
    
    container.appendChild(pregunta);
    container.appendChild(checkboxContainer);
    crearBotonComida()
}


function createDietCheckboxes() {
    const container = document.getElementById("selectorDieta");
    const pregunta = document.createElement("h1");
    pregunta.innerHTML = "WHICH DIET <br> ARE YOU FOLLOWING?";
    const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("dietas");

    health.forEach(dieta => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = dieta;

        const label = document.createElement("label");
        label.innerText = dieta;
        label.appendChild(checkbox);
        
        
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedDietas.push(dieta);
            } else {
                selectedDietas = selectedDietas.filter(a => a !== dieta);
            }
        });
        
        checkboxContainer.appendChild(label);
    });
    
    container.appendChild(pregunta);
    container.appendChild(checkboxContainer);
    crearBotonDieta()
}


function createAllergyCheckboxes() {
    const container = document.getElementById("selectorAlergia");
    const pregunta = document.createElement("h1");
    pregunta.innerText = "DO YOU HAVE ANY ALLERGIES?";
    const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("alergias");

    alergias.forEach(alergia => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = alergia;

        const label = document.createElement("label");
        label.innerText = alergia;
        label.appendChild(checkbox);
        
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedAllergies.push(alergia);
            } else {
                selectedAllergies = selectedAllergies.filter(a => a !== alergia);
            }
        });

        checkboxContainer.appendChild(label);
    });
    container.appendChild(pregunta);
    container.appendChild(checkboxContainer);
    crearBotonAlergia()
    
}


function createPaisCheckboxes() {
    const container = document.getElementById("selectorPais");
    const pregunta = document.createElement("h1");
    pregunta.innerHTML = "WHICH COUNTRY ARE <br> INTERESTED IN?";
    const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("paises");

        cuisineType.forEach(pais => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = pais;

        const label = document.createElement("label");
        label.innerText = pais;
        label.appendChild(checkbox);
        
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                selectedPaises.push(pais);
            } else {
                selectedPaises = selectedPaises.filter(a => a !== pais);
            }
        });

        checkboxContainer.appendChild(label);
    });
    container.appendChild(pregunta);
    container.appendChild(checkboxContainer);
    crearBotonPais()
}


function crearSelectorCalorias() {
    const selector = document.getElementById("selectorCalorias");
    const pregunta = document.createElement("h1");
    pregunta.innerHTML = "DO YOU HAVE ANY <br> CALORIC RESTRICTIONS?";
    const elementoSelect = document.createElement("select");
    const opcionSelect = document.createElement("option");
    opcionSelect.innerText = "Calories";
    opcionSelect.value = "";
    
    
    elementoSelect.appendChild(opcionSelect);

    calorieRanges.forEach(caloria => {
        const opcionSelect = document.createElement("option");
        opcionSelect.innerText = caloria.text;
        opcionSelect.value = caloria.value;
        elementoSelect.appendChild(opcionSelect);
    });
    
    selector.appendChild(pregunta);
    selector.appendChild(elementoSelect);
    elementoSelect.addEventListener("change", (e) => {
        tipoCaloria = e.target.value;
    });

    return elementoSelect;
}


function crearBotonComida() {
    
    
    const boton = document.getElementById("selectorComida");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-comida")
    searchButton.innerText = "Next";

     searchButton.addEventListener("click", async () => {
                hideComida();
                showDieta(); 
        
           

    });

    
    boton.appendChild(searchButton);
    
}

function crearBotonDieta() {

    const boton2 = document.getElementById("selectorDieta");
    const searchButtonAtras = document.createElement("button");
    searchButtonAtras.classList.add("boton-Dieta-atras")
    searchButtonAtras.innerText = "Previous";

    const boton = document.getElementById("selectorDieta");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-Dieta")
    searchButton.innerText = "Next";

   
   
    searchButtonAtras.addEventListener("click", async () => {
        showComida();
        hideDieta(); 
   
    });
    searchButton.addEventListener("click", async () => {
    hideDieta();
    showAlergia();    
    });

   
    boton.appendChild(searchButton);
    boton2.appendChild(searchButtonAtras);
}

function crearBotonAlergia() {

    const boton2 = document.getElementById("selectorAlergia");
    const searchButtonAtras = document.createElement("button");
    searchButtonAtras.classList.add("boton-Alergia-atras")
    searchButtonAtras.innerText = "Previous";

    
    const boton = document.getElementById("selectorAlergia");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-Alergia")
    searchButton.innerText = "Next";

    searchButtonAtras.addEventListener("click", async () => {
    showDieta();
    hideAlergia(); 
   
    });


    searchButton.addEventListener("click", async () => {
    hideAlergia();
    showPais(); 
    });

    boton.appendChild(searchButton);
    boton2.appendChild(searchButtonAtras);
}

function crearBotonPais() {
    const boton2 = document.getElementById("selectorPais");
    const searchButtonAtras = document.createElement("button");
    searchButtonAtras.classList.add("boton-pais-atras")
    searchButtonAtras.innerText = "Previous";


    const boton = document.getElementById("selectorPais");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-Pais")
    searchButton.innerText = "Next";

    searchButtonAtras.addEventListener("click", async () => {
        
    hidePais();
    showAlergia();
    hideBoton();
    hideBotonReset();
    });
    

    searchButton.addEventListener("click", async () => {
        
    hidePais(); 
    showCalorias();
    showBoton();
   
   
});
    
    boton.appendChild(searchButton);
    boton2.appendChild(searchButtonAtras);
}

function crearBotonBusqueda() {
    const boton = document.getElementById("selectorBoton");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-buscar")
    searchButton.innerText = "Search";

    const boton2 = document.getElementById("selectorBoton");
    const searchButtonAtras = document.createElement("button");
    searchButtonAtras.classList.add("boton-boton-atras")
    searchButtonAtras.innerText = "Previous";


    searchButtonAtras.addEventListener("click", async () => {
        
        showPais();
        hideBoton();
        hideCalorias();
       
        });
     
       
    
    searchButton.addEventListener("click", async () => {
       
              
        const query = inputElement.value;
        await displayResults(query);
        hideCalorias(); 
        hideBoton();
        showBotonReset();
       
    });
    
    boton.appendChild(searchButton);
    boton2.appendChild(searchButtonAtras);
}




function crearBotonReset() {
    const boton = document.getElementById("selectorBotonReset");
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-reset")
    searchButton.innerText = "Reset";

     

    searchButton.addEventListener("click", async () => {
        
        hideBoton();
        hideCalorias();
        showComida();
        hideBotonReset();
        const contenedor = document.getElementById("results");
        contenedor.innerHTML = "";
        });

boton.appendChild(searchButton);

}




function crearBotonBusqueda2() {
    
    
    const pregunta = document.createElement("h1");
    pregunta.innerText = "SEARCH BY ANY FIELD";
    const boton = document.getElementById("selectorBoton2");

    
    const inputElement = document.createElement("input");
    inputElement.placeholder = "Search recipes...";
    
   
    const searchButton = document.createElement("button");
    searchButton.classList.add("boton-buscar")
    searchButton.innerText = "Search";

    searchButton.addEventListener("click", async () => {
             
        const query = inputElement.value;
        await displayResults2(query);
    });
    boton.appendChild(pregunta);
    boton.appendChild(inputElement);
    boton.appendChild(searchButton);
    
   
}

async function displayResults(query) {
    const datos = await fetchData(query, {});
    
    const contenedor = document.getElementById("results");
    contenedor.innerHTML = "";

    if (datos.hits && datos.hits.length > 0) {
        datos.hits.forEach(hit => {
            const receta = hit.recipe;
            const recetaElement = document.createElement("div");
            recetaElement.classList.add("carta");

            const imagen = document.createElement("img");
            const titulo = document.createElement("h4");
            const ingredientes = document.createElement("p");
            //const calories = document.createElement("p");
            const link = document.createElement("a");

            titulo.innerText = receta.label;
            imagen.src = receta.image;
            link.href = receta.url;
            link.target = "_blank";
            link.innerText = "Ir a la receta";
            ingredientes.innerText = receta.ingredientLines;
           // calories.innerText = receta.calories;

            recetaElement.appendChild(imagen);
            recetaElement.appendChild(titulo);
            recetaElement.appendChild(ingredientes);
            //recetaElement.appendChild(calories);
            recetaElement.appendChild(link);

            contenedor.appendChild(recetaElement);
        });
    } else {
        contenedor.innerHTML = "<p>No recipes found</p>";
    }
}




async function displayResults2(query) {
    const datos = await fetchData(query, {});
    
    const contenedor = document.getElementById("results2");
    contenedor.innerHTML = "";

    if (datos.hits && datos.hits.length > 0) {
        datos.hits.forEach(hit => {
            const receta = hit.recipe;
            const recetaElement = document.createElement("div");
            recetaElement.classList.add("carta");

            const imagen = document.createElement("img");
            const titulo = document.createElement("h4");
            //const ingredientes = document.createElement("p");
            const calories = document.createElement("p");
            const link = document.createElement("a");

            titulo.innerText = receta.label;
            imagen.src = receta.image;
            link.href = receta.url;
            link.innerText = "Go to recipe";
            //ingredientes.innerText = receta.ingredients.map(ing => ing.text).join(", ");
            calories.innerText = receta.calories;

            recetaElement.appendChild(imagen);
            recetaElement.appendChild(titulo);
            //recetaElement.appendChild(ingredientes);
            recetaElement.appendChild(calories);
            recetaElement.appendChild(link);

            contenedor.appendChild(recetaElement);
        });
        
        } else {
        contenedor.innerHTML = "<p>No recipes found</p>";
    }
}





createPregunta()
createComidaCheckboxes()
crearSelectorCalorias()
createPaisCheckboxes()
createAllergyCheckboxes()
createDietCheckboxes()
createSearchInput()
crearBotonBusqueda()
crearBotonReset() 
crearBotonBusqueda2()
 