"use strict";

//Creamos dous arrays valeiros.

let series = [];
let favourites = [];

// 1.OBTER DATOS DA API

//1.1Creamos a referencia o botón e engadimos o eventListener.
//Mellor nunha función para telo todo en paquetiños

// const listenSearchButton = () => {

//   const buttonSearch = document.querySelector(".js-search-button");
//   buttonSearch.addEventListener("click", getDataFromApi);

// }

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
  let favClass = `js__serieStyle`;

  //Se non hai series favoritas borramos "Mis series favoritas" e o reset
  showFavContainer();

  //BULCE ARRAY SERIES

  //Percorremos o array, se non ten imaxe poñemos a de Gremlins
  for (let index = 0; index < series.length; index += 1) {
    if (!series[index].show.image) {
      imgSerie = `./images/gremlins.jpg`;
    } else {
      imgSerie = series[index].show.image.medium;
    }
    //CONDICIONAL PARA QUE SE POÑA VERDE SE ESTÁ NO ARRAY DE FAVORITOS.
    //Necesitaría engadir favClass no HMTL indentado coma clase ${favClass}.

    let serie = series[index];
    const serieGreenFav = favourites.find(
      (favourite) => serie.show.id === favourite.show.id
    );
    if (serieGreenFav !== undefined) {
      favClass = `js__serieStyleFavourite`;
    } else {
      favClass = `js__serieStyle`;
    }

    firstListCodeHTML += `<li id = "${series[index].show.id}" class = ${favClass}>`;
    firstListCodeHTML += `<article>`;
    firstListCodeHTML += `<img src= "${imgSerie}" class ="card__img" alt="Foto de ${series[index].show.name}"/> `;
    firstListCodeHTML += `<p> ${series[index].show.name}</p>`;
    firstListCodeHTML += `</article>`;
    firstListCodeHTML += `</li>`;
  }

  // BUCLE ARRAY SERIES FAVORITAS

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
    secondListCodeHTML += `<label for="checkfavouriteSeries">`;
    secondListCodeHTML += `<input id="" type="radio" class="checkfavouriteSerie" value = "" name ="favouriteOptions" />`;
    secondListCodeHTML += `</label>`;
    secondListCodeHTML += `</article>`;
    secondListCodeHTML += `</li>`;
  }
  const favouriteList = document.querySelector(".js__favouriteList");
  favouriteList.innerHTML = secondListCodeHTML;

  const cartSeries = document.querySelector(".js__elements");
  cartSeries.innerHTML = firstListCodeHTML;

  listenSeries();
  listenReset();
  listenFavourites();
};

function showFavContainer() {
  if (favourites.length > 0) {
    const titleFav = document.querySelector(`.title`);
    titleFav.classList.remove(`hidden`);
    const ResetBtn = document.querySelector(`.resetBtn`);
    ResetBtn.classList.remove(`hidden`);
  }
}

//3. SELECCIONAR FAVORITA.

function listenSeries() {
  let selectSeries = document.querySelectorAll(
    ".js__serieStyle, .js__serieStyleFavourite"
  );
  console.log(selectSeries);

  for (const serie of selectSeries) {
    serie.addEventListener("click", changeFavourite);
  }
}

//VERSION CHANGE FAVOURITE SIMPLE
function changeFavourite(ev) {
  let clickedSerie = parseInt(ev.currentTarget.id);
  for (let i = 0; i < series.length; i++) {
    console.log("hola", clickedSerie, series[i].show.id);
    if (clickedSerie === series[i].show.id) {
      //Buscamos en favourites o obxecto cuxo id sexa igual co de series
      let serieFav = favourites.find(
        (favourite) => favourite.show.id == series[i].show.id
      );
      // Se o atopamos (se non é undefined) está dentro de favoritos
      if (serieFav !== undefined) {
        //Buscamos o index desa serie en favoritos e sacámolo do array
        let indexInFavourites = favourites.findIndex((fav) => serieFav === fav);
        favourites.splice([indexInFavourites], 1);
      }
      //Se non o atopamos non está en favoritos
      else {
        favourites.push(series[i]);
      }
    }
    updateLocalStorage();
  }

  paintSeries();
}

//4.LOCAL STORAGE

const updateLocalStorage = () => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

const getFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("favourites"));
  if (data !== null) {
    favourites = data;
  }
};

//5.O FACER CLICK NA "X" O ELEMENTO DESAPARECE DO LOCALSTORAGE E DA LISTA

//Devolve que selectCheckBox is not a function

//seleccionar imputx
function removeFavourite(ev) {
  let clickedCheckBox = parseInt(ev.currentTarget.value);
  for (let i = 0; i < favourites.length; i++) {
    if (clickedCheckBox === favourites[i].show.id) {
      favourites.splice([i], 1);
    }
    updateLocalStorage();
  }
  paintSeries();
}

function listenFavourites() {
  let selectCheckBoxes = document.querySelectorAll(".checkfavouriteSerie");
  for (let i = 0; i < favourites.length; i++) {
    selectCheckBoxes.addEventListener("click", removeFavourite);
  }
}

// RESET FAVOURITES

function listenReset() {
  //Seleccionamos o Botón
  const btnReset = document.querySelector(".btnReset");
  // Escoitamos
  btnReset.addEventListener("click", resetAll);
}

function resetAll() {
  favourites.length = 0;
  window.localStorage.clear();
  paintSeries();
  //reset e o título desaparecen?
}

getFromLocalStorage();
paintSeries();
listenFavourites();
