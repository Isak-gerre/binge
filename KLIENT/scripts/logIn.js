"use strict";

if (sessionStorage.getItem("session") !== null) {
  window.location.href = "feed.php";
}

let errorDiv = document.createElement("div");
errorDiv.setAttribute("id", "errorDiv");
document.getElementById("loginForm").prepend(errorDiv);

startUpScreen();

function startUpScreen() {
  let startUpOverlay = document.getElementById("startUpScreen");
  let logoStartUp = document.getElementById("logoStartUp");
  let preview = document.querySelector(".previewWrapper");
  let logo = document.querySelector(".logoDiv");
  let login = document.getElementById("login");

  setTimeout(() => {
    logoStartUp.style.transform = "scale(1)";
  }, 50);

  setTimeout(() => {
    startUpOverlay.style.opacity = "0";
  }, 1500);
  setTimeout(() => {
    startUpOverlay.remove();
    preview.style.opacity = "1";
    logo.style.opacity = "1";
    login.style.opacity = "1";
  }, 2000);
}

//trending top
async function trendingMovieBanners(page = 1) {
  let trendingMovies = await getTrending(page);

  trendingMovies.forEach(async function (result) {
    addToMovies(result);
    let movieElement = makeMovieBannerFromMovie(result);
    movieElement.setAttribute("name", result.title);
    movieElement.setAttribute("actor", result.actor);
    //   movieElement.classList.add("trending");
    document.querySelector(".loginMoviePreviews").append(movieElement);
  });
}

trendingMovieBanners();

const form = document.getElementById("loginForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  let error = 0;
  for (let [key, value] of formData.entries()) {
    if (key === "username" && value === "") {
      error += 1;
    } else if (key === "password" && value === "") {
      error += 2;
    }
  }

  let errorDiv = document.createElement("div");
  errorDiv.setAttribute("id", "errorDiv");
  document.getElementById("loginForm").prepend(errorDiv);

  document.getElementById("errorDiv").classList.add("animate");
  setTimeout(function () {
    document.getElementById("errorDiv").classList.remove("animate");
  }, 1000);

  if (error == 1) {
    errorDiv.innerHTML = "Please fill in your username";
  } else if (error == 2) {
    errorDiv.innerHTML = "Please fill in your password";
  } else if (error == 3) {
    errorDiv.innerHTML = "Please fill in your password and username";
  } else if (error == 0) {
    let object = {};
    for (let [key, value] of formData.entries()) {
      object[key] = value;
    }

    const req2 = new Request("https://api.bingy.se/POST/log-in-verification.php", {
      method: "POST",
      body: formData,
    });

    fetch(req2)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Password or username is wrong");
        }
      })
      .then((data) => {
        saveToSession(data, "session");
        window.location.replace("/feed.php");
      })
      .catch((error) => {
        document.getElementById("errorDiv").innerHTML = "Wrong combination of username and password";
        sessionStorage.clear();
        console.error(error);
      });
  }
});
