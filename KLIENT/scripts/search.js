/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = "movie";
let searches = {};

async function searchFunction() {
  let input = document.getElementById("searchField");
  document.getElementById("search-results").innerHTML = "";
  let savedMovies = [];
  let inputValue = input.value.toLowerCase();

  if (input.value !== "") {
    let searchResults = await getSearchResults(searchType, inputValue);
    let movieList = document.querySelector(".movieList");
    movieList.innerHTML = "";

    searchResults.results.forEach(async function (result) {
      addToMovies(result);
    });
    let allMovies = getFromSession("movies");
    allMovies.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      //   movieElement.style.display = "none";
      document.querySelector("#search-results").append(movieElement);
      let title = movie.title || movie.name;
      myFunction(inputValue);
    });
  }
}

function myFunction(searchResults) {
  var movie, text, i, txtValue;
  filter = searchResults.toUpperCase();
    movie = document.querySelectorAll(".movieBanner");
  for (i = 0; i < movie.length; i++) {
    text = movie[i];
    // txtValue = text.textContent || text.innerText;
    if (text.textContent.toUpperCase().indexOf(filter) > -1) {
      movie[i].style.display = "";
    } else {
      movie[i].style.display = "none";
    }
    if (text.innerText.toUpperCase().indexOf(filter) > -1) {
      movie[i].style.display = "";
    } else {
      movie[i].style.display = "none";
    }
  }
}

function makeSearchOverlay() {
  let searchOverlay = document.createElement("div");
  let movieList = document.createElement("div");
  let pillsDiv = document.createElement("div");
  let pillMovie = document.createElement("div");
  let pillCast = document.createElement("div");

  searchOverlay.className = "searchOverlay";
  movieList.className = "movieList";
  movieList.setAttribute("id", "search-results");
  pillsDiv.className = "pillsDiv";
  pillMovie.className = "pill pillMovie";
  pillCast.className = "pill pillCast";

  // searchOverlay.innerHTML = 'search by:'
  pillsDiv.innerHTML = "search by:";
  pillMovie.innerHTML = "Movies";
  pillCast.innerHTML = "Cast";

  searchOverlay.prepend(pillsDiv);
  pillsDiv.append(pillMovie, pillCast);
  searchOverlay.append(movieList);
  document.body.append(searchOverlay);

  pillMovie.addEventListener("click", () => {
    searchType = "movie";
    pillMovie.classList.toggle("filtered");
    setTimeout(() => {
      searchFunction();
    }, 500);
  });

  pillCast.addEventListener("click", () => {
    searchType = "cast";
    pillCast.classList.toggle("filtered");
    setTimeout(() => {
      searchFunction();
    }, 500);
  });
}
