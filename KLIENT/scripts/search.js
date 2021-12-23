/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = "movie";
let searches = {};

async function searchFunction() {
  let input = document.getElementById("searchField");
  document.getElementById("search-results").innerHTML = "";
  for (let i = 0; i < 20; i++) {
    document.querySelector("#search-results").append(makePlaceholderMovieBanner());
  }
  let savedMovies = [];
  let inputValue = input.value.toLowerCase();

  if (input.value !== "") {
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

    myFunction(inputValue);
  }
}

function myFunction(searchResults) {
  var movie, text, i, txtValue;
  filter = searchResults.toUpperCase();
  movie = document.querySelectorAll("#search-results .movieBanner");
  console.log(movie);
  for (i = 0; i < movie.length; i++) {
    text = movie[i].getAttribute("name");
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

function makeSearchOverlay() {
  let searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  // // Background
  let overlayBackground = document.createElement("div");
  overlayBackground.className = "movie-profile-background";

  let searchField = document.createElement("input");
  searchField.setAttribute("id", "searchField");
  searchField.setAttribute("type", "text");
  searchField.setAttribute("placeholder", "Search");
  searchField.className = "searchField";
  let searchResults = document.createElement("div");
  searchResults.setAttribute("id", "search-results");
  searchResults.className = "search-results";

  searchContainer.append(overlayBackground, searchField, searchResults);
  document.body.append(searchContainer);

  searchField.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      searchFunction();
    }
  });
}
