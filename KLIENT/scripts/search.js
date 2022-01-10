"use strict";

let searchType = "movie";
let searches = {};

if (getParamFromUrl("search_by")) {
  if (getParamFromUrl("open") == "true") {
    makeSearchOverlay(getParamFromUrl("search_word"), getParamFromUrl("search_by"));
  }
}

// Skapar hela overlayen
function makeSearchOverlay(searchWord = "", searchBy = "Title") {
  let page = window.location.href;

  if(page.includes("profile.php")){
    document.querySelector("#pWrapper").style.display = "none";
  } else if (page.includes("explore.php")){
    if(page.includes("?movieID=")){
      document.querySelector(".movie-profile").style.display = "none";
    } else {
      document.querySelector("#wrapper").style.display = "none";
    }
  } else if (page.includes("feed.php")){
    document.querySelector("#wrapper").style.display = "none";
  } 
  console.log(window.location.href);
  
  document.body.style.overflow = "hidden";
  let searchContainer = document.createElement("div");
  searchContainer.className = "search-container";

  // // Background
  let overlayBackground = document.createElement("div");
  overlayBackground.className = "movie-profile-background";

  // INPUT
  let searchField = document.createElement("input");
  searchField.setAttribute("id", "searchField");
  searchField.setAttribute("type", "text");
  searchField.setAttribute("placeholder", "Search by " + searchBy);
  searchField.className = "searchField";

  // PILLS
  let pillContainer = document.createElement("div");
  pillContainer.className = "pill-container";
  let pills = ["Title", "Genre", "Actor", "User"];
  pills.forEach((pill, index) => {
    let pillDiv = document.createElement("div");
    pillDiv.className = `pill ${pill == searchBy ? "active" : ""}`;
    let pillText = document.createElement("p");
    pillText.className = `pill-text`;

    pillText.textContent = pill;
    pillDiv.append(pillText);

    pillDiv.addEventListener("click", ({ target }) => {
      searchBy = pill;
      searchFunction(pill);
      let active = document.querySelectorAll(".active");

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
  let resultText = document.createElement("h4");
  resultText.setAttribute("id", "search-results-text");
  resultText.className = "search-results-text";
  // SEARCH RESULTS
  let searchResults = document.createElement("div");
  searchResults.setAttribute("id", "search-results");
  searchResults.className = "search-results";

  searchContainer.append(overlayBackground, searchField, pillContainer, resultText, searchResults);

  let currentTopPosition = window.pageYOffset.toFixed(0);
  searchContainer.style.top = `${currentTopPosition}px`;

  document.body.append(searchContainer);

  

  if (searchField.value == "") {
    searchField.value = searchWord;
    setTimeout(() => {
      searchResults.innerHTML = "";
      searchFunction(searchBy);
    }, 200);
  }

  searchField.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      "Showing " + document.querySelector(".active").textContent;
      searchFunction(searchBy);
    }
  });
}

async function searchFunction(searchBy) {
  let input = document.getElementById("searchField");
  document.getElementById("search-results").innerHTML = "";

  let inputValue = input.value.toLowerCase();

  // TITLE
  if (searchBy == "Title") {
    for (let i = 0; i < 20; i++) {
      document.querySelector("#search-results").append(makePlaceholderMovieBanner());
    }
    let page = 1;
    await searchByTitle(inputValue, page);
  }

  // GENRE
  if (searchBy == "Genre") {
    for (let i = 0; i < 20; i++) {
      document.querySelector("#search-results").append(makePlaceholderMovieBanner());
    }
    let page = 1;
    await searchByGenres(inputValue, page);
  }

  // ACTOR
  if (searchBy == "Actor") {
    for (let i = 0; i < 20; i++) {
      document.querySelector("#search-results").append(makePlaceholderMovieBanner());
    }
    let page = 1;
    await getAndShowMoviesByActors(inputValue, page);
  }

  // USER
  if (searchBy == "User") {
    let page = 1;
    await searchForUsers(inputValue, page);
  }

  function myFunction(searchWord, searchAttribute = "name", selector = "#search-results > div") {
    var movie, text, i;
    let filter = searchWord.toUpperCase();
    movie = document.querySelectorAll(selector);
    if (searchWord == "") {
      let length = movie.length > 20 ? 20 : movie.length;
      for (i = 0; i < length; i++) {
        movie[i].style.display = "";
      }
    } else {
      for (i = 0; i < movie.length; i++) {
        text = movie[i].getAttribute(searchAttribute);
        if (text != null) {
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
    }

    // Check if nothing is showing
    let noResults = true;
    document.querySelectorAll(selector).forEach((element) => {
      if (!element.style.display.includes("none")) {
        if (element.className.includes("placeholder")) {
          noResults = true;
        } else {
          noResults = false;
        }
      }
    });

    searchWord = document.getElementById("searchField").value;
    if (searchWord !== "") {
      if (noResults) {
        document.querySelector("#search-results-text").textContent = "No results for: " + searchWord;
        document.querySelector("#search-results").innerHTML = "";
      } else {
        document.querySelector("#search-results-text").textContent = "Showing results for: " + searchWord;
      }
    }
  }

  async function displayTrending(page = 1) {
    document.querySelector("#search-results-text").textContent = "Showing Trending Movies";
    let searchResults = await getTrending(page);

    if (document.getElementById("show-more-btn")) {
      document.querySelector(".showMoreDiv").remove();
    }

    searchResults.forEach(async function (result) {
      addToMovies(result);
      let movieElement = makeMovieBannerFromMovie(result);
      movieElement.setAttribute("name", result.title);
      movieElement.setAttribute("actor", result.actor);
      movieElement.classList.add("trending");
      document.querySelector("#search-results").append(movieElement);
    });

    if (!document.getElementById("show-more-btn")) {
      let showMoreDiv = document.createElement("div");
      showMoreDiv.className = "showMoreDiv";
      showMoreDiv.innerHTML = `<button id="show-more-btn">Show more</button>`;

      document.querySelector(".search-results").append(showMoreDiv);
      document.querySelector("#search-results-text").textContent = "Showing Trending Movies";
      document.getElementById("show-more-btn").addEventListener("click", () => {
        document.getElementById(
          "show-more-btn"
        ).innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;
        if (document.querySelectorAll(".trending").length == 20) {
          page = 2;
        }
        page++;
        displayTrending(page);
      });
    }
  }

  async function searchByTitle(inputValue = "", page = 1) {
    inputValue = document.getElementById("searchField").value;
    let searchType = "movie";

    let x = true;

    if (inputValue != "") {
      let searchResults = await getSearchResults(searchType, inputValue, page);

      if (page == searchResults["total_pages"] || searchResults["total_pages"] == 0) {
        x = false;
      }

      if (page == 1) {
        let movieList = document.querySelector("#search-results");
        movieList.innerHTML = "";
      }

      searchResults.results.forEach(async function (result) {
        addToMovies(result);
        let movieElement = makeMovieBannerFromMovie(result);
        movieElement.setAttribute("name", result.title);
        document.querySelector("#search-results").append(movieElement);
      });

      if (document.getElementById("show-more-btn-title")) {
        document.querySelector(".showMoreDiv").remove();
      }

      if (x) {
        let showMoreDiv = document.createElement("div");
        showMoreDiv.className = "showMoreDiv";
        showMoreDiv.innerHTML = `<button id="show-more-btn-title">Show more</button>`;

        document.querySelector(".search-results").append(showMoreDiv);

        document.getElementById("show-more-btn-title").addEventListener("click", () => {
          document.getElementById(
            "show-more-btn-title"
          ).innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;

          if (document.querySelectorAll(".movieBanner").length >= 20) {
            page += 1;
            searchByTitle(inputValue, page);
          }
        });
      }
    } else {
      if (page == 1) {
        let movieList = document.querySelector("#search-results");
        movieList.innerHTML = "";
      }
      displayTrending();
    }

    myFunction(inputValue, "name");
  }

  async function searchByGenres(inputValue = "", page = 1) {
    inputValue = document.getElementById("searchField").value;

    if (inputValue != "") {
      let searchResults = await searchResultsByGenre(inputValue);
      searchResults.forEach(async function (result) {
        addToMovies(result);
      });

      let x = false;

      if (searchResults.length !== 0) {
        x = true;

        if (page == 1) {
          let movieList = document.querySelector("#search-results");
          movieList.innerHTML = "";
        }

        for (let i = page - 1; i <= page + 19; i++) {
          let movieElement = makeMovieBannerFromMovie(searchResults[i]);
          movieElement.setAttribute("genre", inputValue);
          document.querySelector("#search-results").append(movieElement);

          let lastSearch = searchResults.length - 1;
          if (i == lastSearch) {
            if (document.querySelector(".showMoreDiv")) {
              document.querySelector(".showMoreDiv").remove();
            }
            x = false;
            break;
          }
        }
      }

      if (document.getElementById("show-more-btn-genres")) {
        document.querySelector(".showMoreDiv").remove();
      }

      if (x) {
        let showMoreDiv = document.createElement("div");
        showMoreDiv.className = "showMoreDiv";
        showMoreDiv.innerHTML = `<button id="show-more-btn-genres">Show more</button>`;

        document.querySelector(".search-results").append(showMoreDiv);

        document.getElementById("show-more-btn-genres").addEventListener("click", () => {
          document.getElementById(
            "show-more-btn-genres"
          ).innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;

          if (document.querySelectorAll(".movieBanner").length >= 20) {
            page += 21;
            searchByGenres(inputValue, page);
          }
        });
      }
    } else {
      if (page == 1) {
        let movieList = document.querySelector("#search-results");
        movieList.innerHTML = "";
      }
      displayTrending();
    }

    myFunction(inputValue, "genres");
  }

  async function getAndShowMoviesByActors(inputValue = "", page = 1) {
    inputValue = document.getElementById("searchField").value;
    searchType = "cast";

    let x = true;

    if (inputValue != "") {
      let searchResults = await getSearchResults(searchType, inputValue, page);

      if (page == searchResults["total_pages"] || searchResults["total_pages"] == 0) {
        x = false;
      }

      if (page == 1) {
        let movieList = document.querySelector("#search-results");
        movieList.innerHTML = "";
      }

      searchResults.results.forEach(function (result) {
        if (
          result["known_for"].length != 0 &&
          result["known_for_department"] == "Acting" &&
          Array.isArray(result["known_for"])
        ) {
          result["known_for"].forEach((movie) => {
            movie.actor = result.name;
            addToMovies(movie, true);

            let movieElement = makeMovieBannerFromMovie(movie);
            movieElement.setAttribute("name", movie.title);
            movieElement.setAttribute("actor", movie.actor);
            document.querySelector("#search-results").prepend(movieElement);
          });
        }
      });

      if (document.getElementById("show-more-btn-actors")) {
        document.querySelector(".showMoreDiv").remove();
      }

      if (x) {
        let showMoreDiv = document.createElement("div");
        showMoreDiv.className = "showMoreDiv";
        showMoreDiv.innerHTML = `<button id="show-more-btn-actors">Show more</button>`;

        document.querySelector(".search-results").append(showMoreDiv);

        document.getElementById("show-more-btn-actors").addEventListener("click", () => {
          document.getElementById(
            "show-more-btn-actors"
          ).innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;

          if (document.querySelectorAll(".movieBanner").length >= 20) {
            page += 1;
            getAndShowMoviesByActors(inputValue, page);
          }
        });
      }
    } else {
      if (page == 1) {
        let movieList = document.querySelector("#search-results");
        movieList.innerHTML = "";
      }

      displayTrending();
    }

    myFunction(inputValue, "actor");
  }

  async function searchForUsers(inputValue = "", counter = 1) {
    inputValue = document.getElementById("searchField").value.toLowerCase();
    searchType = "user";

    // Hämta alla användare + plocka bort den som är inlogagd
    let users = await getUsers();
    users = users.filter((user) => user.id != loggedInUserId);
    let newArray = [];

    // Om något är sökt på, gör ny array med användarna som matchar sökvärdet
    if (inputValue != "") {
      users.forEach((user) => {
        if (user.username.toLowerCase().includes(inputValue)) {
          newArray.push(user);
        }
      });
    }

    let x = true;
    // Loopa för att skapa element för användare
    for (let i = counter - 1; i <= counter + 7; i++) {
      if (inputValue == "") {
        // Om inget är sökt på, skapa element för ALLA användare
        // Om det finns färre än vad countern är, ta bort visa mer och bryt loop
        if (i >= users.length) {
          if (document.querySelector(".showMoreDiv")) {
            document.querySelector(".showMoreDiv").remove();
          }
          x = false;
          break;
        }
        await makeUserSearchDivs(users[i]);
      } else {
        // Om något är sökt på, skapa element för användarna som matchar sökn.
        // Om det finns färre än vad countern är, ta bort visa mer och bryt loop
        if (i >= newArray.length) {
          if (document.querySelector(".showMoreDiv")) {
            document.querySelector(".showMoreDiv").remove();
          }
          x = false;
          break;
        }
        await makeUserSearchDivs(newArray[i]);
      }
    }

    myFunction(inputValue, "user");

    if (document.querySelector(".showMoreDiv")) {
      document.querySelector(".showMoreDiv").remove();
    }

    if (x) {
      // Skapa show more knapp
      let showMoreDiv = document.createElement("div");
      showMoreDiv.className = "showMoreDiv";
      showMoreDiv.innerHTML = `<button id="show-more-btn">Show more</button>`;
      document.querySelector("#search-results").append(showMoreDiv);

      // Event för show-more-knapp
      document.getElementById("show-more-btn").addEventListener("click", () => {
        counter += 9;
        searchForUsers(inputValue, counter);

        // ladd ikon på show more knapp
        document.getElementById(
          "show-more-btn"
        ).innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;
      });
    }
  }

  async function makeUserSearchDivs(user) {
    const loggedInUserInfo = await getUserInfo(loggedInUserId);
    let loggedInFollowing = loggedInUserInfo.following;
    let relationText;
    let relationImg;

    if (loggedInFollowing.includes(user.id)) {
      relationText = "Unfollow";
      relationImg = "../icons/remove_circle_black.svg";
    } else {
      relationText = "Follow";
      relationImg = "../icons/add_circle_black.svg";
    }

    document.querySelector("#search-results-text").textContent = "Showing all users";

    let userDiv = document.createElement("div");
    userDiv.className = "userDiv";
    userDiv.setAttribute("user", user.username);

    let userImage = document.createElement("div");
    userImage.className = "userImage";
    userImage.style.backgroundImage = `url('http://localhost:7001/${user["profile_picture"].filepath}')`;
    userImage.addEventListener("click", () => {
      window.location.href = `http://localhost:2000/profile.php?userID=${user.id}`;
    });

    let userInfoDiv = document.createElement("div");
    userInfoDiv.className = "userInfoDiv";

    userDiv.append(userImage, userInfoDiv);

    let username = document.createElement("p");
    username.textContent = `@${user.username}`;
    username.setAttribute("id", "usernameP");
    username.addEventListener("click", () => {
      window.location.href = `http://localhost:2000/profile.php?userID=${user.id}`;
    });

    let followDiv = document.createElement("div");
    followDiv.setAttribute("id", "followDiv");
    if (relationText == "Unfollow") {
      followDiv.classList.add("unfollow");
    } else if (relationText == "Follow") {
      followDiv.classList.add("follow");
    }

    userInfoDiv.append(username, followDiv);

    let followImg = document.createElement("img");
    followImg.setAttribute("id", `${relationText.toLowerCase()}`);
    followImg.setAttribute("src", `${relationImg}`);

    let followText = document.createElement("p");
    followText.textContent = relationText;

    followDiv.append(followText, followImg);

    document.querySelector("#search-results").append(userDiv);

    // Eventlistern för att följa/avfölja folk härifrån
    followDiv.addEventListener("click", async function (e) {
      if (e.target.textContent == "Unfollow") {
        followText.textContent = "Follow";
        followText.setAttribute("id", "follow");
        followImg.setAttribute("src", "../icons/add_circle_black.svg");
        followDiv.classList.add("follow");
        followDiv.classList.remove("unfollow");

        // redigera db
        await followPatch(loggedInUserId, user.id);
      } else if (e.target.textContent == "Follow") {
        followText.textContent = "Unfollow";
        followText.setAttribute("id", "unfollow");
        followImg.setAttribute("src", "../icons/remove_circle_black.svg");
        followDiv.classList.add("unfollow");
        followDiv.classList.remove("follow");

        // redigera db
        await followPatch(loggedInUserId, user.id);
      }
    });
  }
}