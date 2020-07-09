"use strict";

let series = [];
let favourites = [];

// Obter os datos da Api

//Creamos a referencia o botón

const buttonSearch = document.querySelector(".js-search-button");

//Función para coller os datos da Api

const getDataFromApi = () => {
  //Creamos unha referencia o valor do imput

  const serieName = document.querySelector(".js-search__text");

  fetch(`http://api.tvmaze.com/search/shows?q=:${serieName.value}`)
    .then((response) => response.json())
    .then((data) => {
      series = data;
      console.log(series);
      paintSeries();
    });
};

//Engadir eventListener o botón

buttonSearch.addEventListener("click", getDataFromApi);

//Creamos unha función para pintar

const paintSeries = () => {
  let codeHTML = "";
  let imgSerie;
  for (let index = 0; index < series.length; index += 1) {
    if (!series[index].show.image) {
      imgSerie = `./images/gremlins.jpg`;
    } else {
      imgSerie = series[index].show.image.medium;
    }
    codeHTML += `<li>`;
    codeHTML += `<article>`;
    codeHTML += `<img src= "${imgSerie}" class ="card__img" alt="Foto de ${series[index].show.name}"/> `;
    codeHTML += `<p> ${series[index].show.name}</p>`;
    codeHTML += `</article>`;
    codeHTML += `</li>`;
  }
  const cartSeries = document.querySelector(".js__elements");
  cartSeries.innerHTML = codeHTML;
};
