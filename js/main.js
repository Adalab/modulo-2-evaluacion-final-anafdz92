"use strict";

//Creamos dúas variables valeiras.

let series = [];
let favourites = [];

// 1.OBTER DATOS DA API

//1.1Creamos a referencia o botón

const buttonSearch = document.querySelector(".js-search-button");

//1.2Función para coller os datos da Api

const getDataFromApi = () => {
  //1.3 Creamos unha referencia o valor do imput
  const serieName = document.querySelector(".js-search__text");

  fetch(`http://api.tvmaze.com/search/shows?q=:${serieName.value}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      console.log(series);
      paintSeries();
    });
};

//1.4 Engadir eventListener o botón

buttonSearch.addEventListener("click", getDataFromApi);

//2. CREAMOS UNHA FUNCIÓN PARA PINTAR

const paintSeries = () => {
  let firstListCodeHTML = "";
  let secondListCodeHTML = "";
  let imgSerie;
  let favClass;

  //BULCE ARRAY SERIES
  for (let index = 0; index < series.length; index += 1) {
    if (!series[index].show.image) {
      imgSerie = `./images/gremlins.jpg`;
    } else {
      imgSerie = series[index].show.image.medium;
    }
    firstListCodeHTML += `<li id = "${series[index].show.id}" class = "${favClass} js__serieStyle">`;
    firstListCodeHTML += `<article>`;
    firstListCodeHTML += `<img src= "${imgSerie}" class ="card__img" alt="Foto de ${series[index].show.name}"/> `;
    firstListCodeHTML += `<p> ${series[index].show.name}</p>`;
    firstListCodeHTML += `</article>`;
    firstListCodeHTML += `</li>`;
  }

  // BUCLE ARRAY SERIES FAVORITAS

  //María, Miguel: Tenía este código preparado para que ocultase la lista de favoritos si estaba vacía pero creo que no es necesario.

  // if (favourites.length === 0) {
  //   favouriteList.classList.add("hidden");
  // } else {
  let imgfavourite;

  for (let index = 0; index < favourites.length; index += 1) {
    if (!favourites[index].show.image) {
      imgfavourite = `./images/gremlins.jpg`;
    } else {
      imgfavourite = favourites[index].show.image.medium;
    }

    secondListCodeHTML += `<li id = "${favourites[index].show.id}" class = "js__serieStyleFavourite">`;
    secondListCodeHTML += `<article>`;
    secondListCodeHTML += `<img src= "${imgfavourite}" class ="card__img" alt="Foto de ${favourites[index].show.name}"/> `;
    secondListCodeHTML += `<p> ${favourites[index].show.name}</p>`;
    secondListCodeHTML += `<input id="checkfavouriteSerie" type="checkbox" value = "selectFavourite" name ="favouriteOptions" />`;
    secondListCodeHTML += `</article>`;
    secondListCodeHTML += `</li>`;
  }
  const favouriteList = document.querySelector(".js__favouriteList");
  favouriteList.innerHTML = secondListCodeHTML;

  const cartSeries = document.querySelector(".js__elements");
  cartSeries.innerHTML = firstListCodeHTML;

  listenSeries();
};

//3. SELECCIONAR FAVORITA.

function listenSeries() {
  let selectSeries = document.querySelectorAll(".js__serieStyle");
  console.log(selectSeries);

  for (const serie of selectSeries) {
    serie.addEventListener("click", changeFavourite);
  }
}
function changeFavourite(ev) {
  let clickedSerie = parseInt(ev.currentTarget.id);
  for (let i = 0; i < series.length; i++) {
    console.log("hola", clickedSerie, series[i].show.id);
    if (clickedSerie === series[i].show.id) {
      favourites.push(series[i]);
    }
    updateLocalStorage();
  }

  paintSeries();
  console.log(favourites);
}

//LOCAL STORAGE

const updateLocalStorage = () => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("favourites"));
  if (data !== null) {
    favourites = data;
  }
};

getFromLocalStorage();
paintSeries();
