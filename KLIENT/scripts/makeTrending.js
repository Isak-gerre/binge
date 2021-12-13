// Hämtar trending
// Skapar element och appendas

"use strict";

let loaded = false;

async function makeTrending() {
  let slideshowDiv = document.createElement("div");
  slideshowDiv.className = "slideshow-container";

  let slideshowSlider = document.createElement("div");
  slideshowSlider.className = "slideshow";

  let slideshowImages = await getTrending();
  slideshowImages.push(slideshowImages[0]);
  console.log(slideshowImages);
  let counter = 0;
  slideshowImages.forEach((movie) => {
    let slideshowImage = document.createElement("img");
    slideshowImage.setAttribute("src", `https://image.tmdb.org/t/p/w500${movie["backdrop_path"]}`);
    if (counter == slideshowImages.length - 1) {
      slideshowImage.setAttribute("id", "firstClone");
    }
    counter++;
    slideshowSlider.append(slideshowImage);
  });

  slideshowDiv.append(slideshowSlider);
  document.querySelector("#trending").innerHTML = "";
  document.querySelector("#trending").append(slideshowDiv);
  loaded = true;
}

function slide() {
  const carouselSlide = document.querySelector(".slideshow");
  const carouselImages = document.querySelectorAll(".slideshow img");
  console.log(carouselImages);
  const size = carouselImages[0].clientWidth;

  //   const prevBtn = document.querySelector("#prevBtn");
  //   const nextBtn = document.querySelectorAll("#nextBtn");

  //   nextBtn.addEventListener("click", next);
  //   prevBtn.addEventListener("click", prev);

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
  console.log("test");
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

makeTrending();
setInterval(() => {
  if (loaded) {
    slide();
    loaded = false;
  }
}, 1000);
