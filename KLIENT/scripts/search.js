/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = "movie";
let searches = {};

async function searchFunction(searchBy) {
  console.log(searchBy);
  let input = document.getElementById("searchField");
  document.getElementById("search-results").innerHTML = "";
  for (let i = 0; i < 20; i++) {
    document.querySelector("#search-results").append(makePlaceholderMovieBanner());
  }
  let savedMovies = [];
  let inputValue = input.value.toLowerCase();

  // MOVIES
  if (input.value !== "" && searchBy == "Movies") {
    let searchResults = await getSearchResults(searchType, inputValue);
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";

    searchResults.results.forEach(async function (result) {
      addToMovies(result);
    });
    let allMovies = getFromSession("movies");
    allMovies.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      movieElement.setAttribute("name", movie.title);
      document.querySelector("#search-results").prepend(movieElement);
    });

    myFunction(inputValue);
  }

  // ACTORS
  if (input.value !== "" && searchBy == "Actors") {
    searchType = "cast";
    let searchResults = await getSearchResults(searchType, inputValue);
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";

    searchResults.results.forEach(async function (result) {
      console.log(result);
      if (result["known_for"].length != 0 && result["known_for_department"] == "Acting") {
        result["known_for"].forEach((movie) => {
          movie.actor = result.name;
          addToMovies(movie);
        });
      }
    });
    let allMovies = getFromSession("movies");
    allMovies.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      movieElement.setAttribute("name", movie.title);
      movieElement.setAttribute("actor", movie.actor);
      document.querySelector("#search-results").prepend(movieElement);
    });

    myFunction(inputValue, "actor");
  }

  // USERS
  if (input.value !== "" && searchBy == "Users") {
    let searchResults = await getSearchResults(searchType, inputValue);
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";

    searchResults.results.forEach(async function (result) {
      addToMovies(result);
    });
    let allMovies = getFromSession("movies");
    allMovies.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      movieElement.setAttribute("name", movie.title);
      document.querySelector("#search-results").prepend(movieElement);
      let title = movie.title || movie.name;
    });

    myFunction(inputValue, "users");
  }
}

function myFunction(searchResults, searchAttribute = "name") {
  var movie, text, i, txtValue;
  filter = searchResults.toUpperCase();
  movie = document.querySelectorAll("#search-results .movieBanner");
  console.log(movie);
  for (i = 0; i < movie.length; i++) {
    text = movie[i].getAttribute(searchAttribute);
    // txtValue = text.textContent || text.innerText;
    if (text.toUpperCase().indexOf(filter) > -1) {
      movie[i].style.display = "";
    } else {
      movie[i].style.display = "none";
    }
    if (text.toUpperCase().indexOf(filter) > -1) {
      movie[i].style.display = "";
    } else {
      movie[i].style.display = "none";
    }
  }
}

function makeSearchOverlay(searchWord = "") {
  let searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  // // Background
  let overlayBackground = document.createElement("div");
  overlayBackground.className = "movie-profile-background";

  // INPUT
  let searchField = document.createElement("input");
  searchField.setAttribute("id", "searchField");
  searchField.setAttribute("type", "text");
  searchField.setAttribute("placeholder", "Search by Movies");
  searchField.className = "searchField";

  // SEARCH by
  let searchBy = "Movies";
  // PILLS
  let pillContainer = document.createElement("div");
  pillContainer.className = "pill-container";
  let pills = ["Movies", "Actors", "Users"];
  pills.forEach((pill, index) => {
    let pillDiv = document.createElement("div");
    pillDiv.className = `pill ${index == 0 ? "active" : ""}`;
    let pillText = document.createElement("p");
    pillText.className = `pill-text`;

    pillText.textContent = pill;
    pillDiv.append(pillText);

    pillDiv.addEventListener("click", ({ target }) => {
      searchBy = pill;
      console.log(searchBy);
      let active = document.querySelectorAll(".active");
      console.log(active);
      if (active.length != 0) {
        active[0].classList.remove("active");
      }
      let searchBar = document.querySelector("#searchField");
      if (searchBar.placeholder != "Search") {
        searchBar.placeholder = "Search";
        if (target.classList == "pill-text") {
          target.parentElement.classList.remove("active");
        } else {
          target.classList.remove("active");
        }
      }
      searchBar.placeholder = "Search by " + pill;
      if (target.classList == "pill-text") {
        target.parentElement.classList.add("active");
      } else {
        target.classList.add("active");
      }
    });

    pillContainer.append(pillDiv);
  });

  // SEARCH RESULTS
  let searchResults = document.createElement("div");
  searchResults.setAttribute("id", "search-results");
  searchResults.className = "search-results";

  searchContainer.append(overlayBackground, searchField, pillContainer, searchResults);
  document.body.append(searchContainer);

  //OBS!! ELSA LAGT TILL!! om man kommer från genre på explore
  // scroll till top och displaya det vi får från keywords istället
  if (searchField.value == "") {
    searchField.value = `${searchWord}`;
  }

  searchField.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      searchFunction(searchBy);
    }
  });
}
