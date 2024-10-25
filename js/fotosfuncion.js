import { fetchData, fetchDataNextPage } from "./llamada.js";



let currentRecetas = []
let limitRecetas = [];
const showLimit = 4;
let currentRecetasIndex = -1;
let currentQuery = null;

export async function displayResultsCarrusel(query) {
    ++currentRecetasIndex;
// Comprobar si necesito llamar a la api o seguir con los datos actuales
    if (currentRecetas.length > 0 && query == currentQuery && showLimit * currentRecetasIndex < currentRecetas.length) {

    } else {
        let datos = null;
        if (query == currentQuery) {
            datos = await fetchDataNextPage();
        } else {
            datos = await fetchData(query, { "q": query });
        }
        currentRecetas = datos.hits;
        currentRecetasIndex = 0;
    }

    currentQuery = query;
    limitRecetas = [];
    // Añado las recetas del siguiente bloque
    for (let i = 0; i < showLimit; i++) {
        const currentIndex = showLimit * currentRecetasIndex + i;
        if (currentIndex < currentRecetas.length) {
            limitRecetas.push(currentRecetas[currentIndex])
        } else {
            break;
        }
    }

    const contenedor = document.getElementById("resultsMiCarrusel");
    contenedor.innerHTML = "";

    if (limitRecetas && limitRecetas.length > 0) {

        limitRecetas.forEach(hit => {
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
            link.target = "_blank";
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
