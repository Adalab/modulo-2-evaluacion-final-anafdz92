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
  let codeHTML = "";
  let imgSerie;
  for (let index = 0; index < series.length; index += 1) {
    if (!series[index].show.image) {
      imgSerie = `./images/gremlins.jpg`;
    } else {
      imgSerie = series[index].show.image.medium;
    }
    codeHTML += `<li id = "${series[index].show.id}" class = "serieStyle">`;
    codeHTML += `<article>`;
    codeHTML += `<img src= "${imgSerie}" class ="card__img" alt="Foto de ${series[index].show.name}"/> `;
    codeHTML += `<p> ${series[index].show.name}</p>`;
    codeHTML += `</article>`;
    codeHTML += `</li>`;
  }
  const cartSeries = document.querySelector(".js__elements");
  cartSeries.innerHTML = codeHTML;
  listenSeries();
};

//3. SELECCIONAR FAVORITA.

function listenSeries() {
  let selectSeries = document.querySelectorAll(".serieStyle");
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
      favourites.push(series[i].show);
    }
  }
  console.log(favourites);
}
