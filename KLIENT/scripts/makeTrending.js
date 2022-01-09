"use strict";

let loaded = false;

async function makeTrending() {
  let slideshowDiv = document.createElement("div");
  slideshowDiv.className = "slideshow-container";

  let slideshowSlider = document.createElement("div");
  slideshowSlider.className = "slideshow";

  let slideshowImages = await getTrending(1);
  slideshowImages.push(slideshowImages[0]);

  let counter = 0;
  slideshowImages.forEach((movie) => {
    let movieID = movie.id;

    let slideMovieDiv = document.createElement("div");
    slideMovieDiv.className = "slideMovieDiv";

    let slideshowImage = document.createElement("div");
    slideshowImage.className = "trending-movie-picture";
    slideshowImage.style.backgroundImage = `url('http://image.tmdb.org/t/p/w500${movie["backdrop_path"]}')`;
    slideshowImage.addEventListener("click", () => {
      window.location.href = `explore.php?movieID=${movieID}`;
    });

    let movieNameTr = document.createElement("div");
    movieNameTr.className = "movieNameTr";
    movieNameTr.innerHTML = `<p>${movie.title}</p>`;
    movieNameTr.style.color = "black";

    if (counter == slideshowImages.length - 1) {
      slideshowImage.setAttribute("id", "firstClone");
    }

    counter++;
    slideMovieDiv.append(slideshowImage, movieNameTr);
    slideshowSlider.append(slideMovieDiv);
  });

  slideshowDiv.append(slideshowSlider);
  document.querySelector("#trending").innerHTML = "";
  document.querySelector("#trending").innerHTML = "<h3>Now trending</h3>";
  document.querySelector("#trending").append(slideshowDiv);
  loaded = true;
}

function slide() {
  const carouselSlide = document.querySelector(".slideshow");
  const carouselImages = document.querySelectorAll(".slideshow .trending-movie-picture"); // div
  const size = carouselImages[0].clientWidth;
  let counter = 0;

  carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id === "lastClone") {
      carouselSlide.style.transition = "none";
      counter = carouselImages.length - 2;
      carouselSlide.style.transform = "translatex(" + -size * counter + "px)";
    }
    if (carouselImages[counter].id === "firstClone") {
      carouselSlide.style.transition = "none";
      counter = 0;
      carouselSlide.style.transform = "translatex(" + -size * counter + "px)";
    }
  });

  setInterval(() => {
    counter++;
    next(carouselSlide, counter, size);
  }, 5000);
}
function next(carouselSlide, counter, size) {
  carouselSlide.style.transition = "transform 0.7s ease-in-out";
  carouselSlide.style.transform = "translatex(" + -size * counter + "px)";
}
function prev(carouselSlide) {
  carouselSlide.style.transition = "transform 0.7s ease-in-out";
  counter--;
  carouselSlide.style.transform = "translatex(" + -size * counter + "px)";
}