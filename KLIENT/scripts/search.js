/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = "movie";
let searches = {};

// async function searchFunction(searchBy) {
//   console.log(searchBy);
//   let input = document.getElementById("searchField");
//   document.getElementById("search-results").innerHTML = "";
//   for (let i = 0; i < 20; i++) {
//     document.querySelector("#search-results").append(makePlaceholderMovieBanner());
//   }
//   let savedMovies = [];
//   let inputValue = input.value.toLowerCase();

//   // MOVIES
//   if (input.value !== "" && searchBy == "Movies") {
//     let searchResults = await getSearchResults(searchType, inputValue);
//     let movieList = document.querySelector("#search-results");
//     movieList.innerHTML = "";

//     searchResults.results.forEach(async function (result) {
//       addToMovies(result);
//     });
//     let allMovies = getFromSession("movies");
//     allMovies.forEach((movie) => {
//       let movieElement = makeMovieBannerFromMovie(movie);
//       movieElement.setAttribute("name", movie.title);
//       document.querySelector("#search-results").prepend(movieElement);
//     });

//     myFunction(inputValue);
//   }

//   // ACTORS
//   console.log(searchBy);
//   if (input.value !== "" && searchBy == "Actors") {
//     console.log(inputValue);
//     searchType = "cast";
//     console.log(searchType);
//     let searchResults = await getSearchResults(searchType, inputValue);
//     console.log(searchResults);
//     let movieList = document.querySelector("#search-results");
//     movieList.innerHTML = "";

//     let allMovies = [];
//     searchResults.results.forEach(async function (result) {
//       console.log(result);
//       if (result["known_for"].length != 0 && result["known_for_department"] == "Acting") {
//         result["known_for"].forEach((movie) => {
//           movie.actor = result.name;
//           addToMovies(movie);
//           allMovies.push(movie);
//         });
//       }
//     });

//     allMovies.forEach((movie) => {
//       // console.log(movie);
//       let movieElement = makeMovieBannerFromMovie(movie);
//       // console.log(movieElement);
//       movieElement.setAttribute("name", movie.title);
//       movieElement.setAttribute("actor", movie.actor);
//       document.querySelector("#search-results").prepend(movieElement);
//     });

//     myFunction(inputValue, "actor");
//   }

//   // USERS
//   if (input.value !== "" && searchBy == "Users") {
//     let searchResults = await getSearchResults(searchType, inputValue);
//     let movieList = document.querySelector("#search-results");
//     movieList.innerHTML = "";

//     searchResults.results.forEach(async function (result) {
//       addToMovies(result);
//     });
//     let allMovies = getFromSession("movies");
//     allMovies.forEach((movie) => {
//       let movieElement = makeMovieBannerFromMovie(movie);
//       movieElement.setAttribute("name", movie.title);
//       document.querySelector("#search-results").prepend(movieElement);
//       let title = movie.title || movie.name;
//     });

//     myFunction(inputValue, "users");
//   }
// }

function myFunction(searchResults, searchAttribute = "name") {
  // console.log(searchResults);
  var movie, text, i, txtValue;
  filter = searchResults.toUpperCase();
  movie = document.querySelectorAll("#search-results .movieBanner");

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

function makeSearchOverlay(searchWord = "", searchBy = "Movies") {
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
  let pills = ["Movies", "Genres", "Actors", "Users", "Directors"];
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
      // Ändrar grid layout från två kolumner till tre
      document.querySelector("#search-results").setAttribute("style", "grid-template-columns: repeat(3, 1fr);");
      if (pill == "Users") {
        // Om User => 2 kolumner
        // Ändrar grid layout från två kolumner till tre
        document.querySelector("#search-results").setAttribute("style", "grid-template-columns: repeat(2, 1fr);");
      }
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

  //OBS!! ELSA LAGT TILL!! om man kommer från genre på explore
  // scroll till top och displaya det vi får från keywords istället
  if (searchField.value == "") {
    searchField.value = searchWord;
    setTimeout(() => {
      searchResults.innerHTML = "";
      searchFunction(searchBy);
    }, 200);
  } else {
  }
  // setTimeout(() => {
  //   displayTrending();
  // }, 200);

  searchField.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      // Ändrar grid layout från två kolumner till tre
      document.querySelector("#search-results").setAttribute("style", "grid-template-columns: repeat(3, 1fr);");
      document.querySelector("#search-results-text").textContent =
        "Showing " + document.querySelector(".active").textContent;
      searchFunction(searchBy);
    }
  });
}

async function searchFunction(searchBy) {
  let input = document.getElementById("searchField");
  document.getElementById("search-results").innerHTML = "";
  for (let i = 0; i < 20; i++) {
    document.querySelector("#search-results").append(makePlaceholderMovieBanner());
  }
  let savedMovies = [];
  let inputValue = input.value.toLowerCase();

  // MOVIES
  if (searchBy == "Movies") {
    document.querySelector("#search-results-text").textContent = "Showing Movies";
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";
    if (inputValue != "") {
      let searchResults = await getSearchResults(searchType, inputValue);
      searchResults.results.forEach(async function (result) {
        addToMovies(result);
      });
      let allMovies = getFromSession("movies");
      allMovies.forEach((movie) => {
        let movieElement = makeMovieBannerFromMovie(movie);
        movieElement.setAttribute("name", movie.title);
        document.querySelector("#search-results").prepend(movieElement);
      });
    } else {
      displayTrending();
    }

    myFunction(inputValue);
  }
  // GENRES
  if (searchBy == "Genres") {
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";
    let searchResults = await getMoviesByGenre(inputValue);
    searchResults[1].results.forEach(async function (result) {
      addToMovies(result);
    });
    searchResults[1].results.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      movieElement.setAttribute("genre", inputValue);
      document.querySelector("#search-results").prepend(movieElement);
    });
    myFunction(inputValue, "genre");
  }

  // ACTORS
  if (searchBy == "Actors") {
    let page = 1;
    await getAndShowMoviesByActors(inputValue, page);
  }

  // USERS
  if (searchBy == "Users") {
    let page = 1;

    
    await searchForUsers(inputValue, page);
}

function myFunction(searchWord, searchAttribute = "name", selector = "#search-results > div") {
  var movie, text, i, txtValue;
  filter = searchWord.toUpperCase();
  movie = document.querySelectorAll(selector);
  if (searchWord == "") {
    let length = movie.length > 20 ? 20 : movie.length;
    for (i = 0; i < length; i++) {
      movie[i].style.display = "";
    }
  } else {
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
  // Check if nothing is showing
  let noResults = true;
  document.querySelectorAll(selector).forEach((element) => {
    if (!element.style.display.includes("none")) {
      noResults = false;
    }
  });
  searchWord = document.getElementById("searchField").value;
  if (!searchWord == "") {
    if (noResults) {
      document.querySelector("#search-results-text").textContent = "No results for: " + searchWord;
    } else {
      document.querySelector("#search-results-text").textContent = "Showing results for: " + searchWord;
    }
  }
}

async function displayTrending(page = 1) {
  document.querySelector("#search-results-text").textContent = "Showing Trending Movies";
  let searchResults = await getTrending(page);
  // console.log(searchResults);

  if(document.getElementById("show-more-btn")){
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
    showMoreDiv.innerHTML = `
    <button id="show-more-btn">Show more</button>
    `;

    document.querySelector(".search-results").append(showMoreDiv);
    document.querySelector("#search-results-text").textContent = "Showing Trending Movies";
    document.getElementById("show-more-btn").addEventListener("click", () => {
      document.getElementById("show-more-btn").innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
      if (document.querySelectorAll(".trending").length == 20) {
        // console.log(true);
        page = 2;
      }
      console.log(page);
      page++;
      displayTrending(page);
      
    });
  }
}

async function getAndShowMoviesByActors(inputValue = "", page = 1) {
  inputValue = document.getElementById("searchField").value;
  searchType = "cast";

  if(document.getElementById("show-more-btn-actors")){
    document.querySelector(".showMoreDiv").remove();
  }

  document.querySelector("#search-results-text").textContent = "Showing Movies by Actors";
  if (page == 1) {
    let movieList = document.querySelector("#search-results");
    movieList.innerHTML = "";
  }

  if (inputValue != "") {
    console.log(page);
    let searchResults = await getSearchResults(searchType, inputValue, page);
    searchResults.results.forEach(function (result) {
      if (
        result["known_for"].length != 0 &&
        result["known_for_department"] == "Acting" &&
        Array.isArray(result["known_for"])
      ) {
        console.log(result);
        result["known_for"].forEach((movie) => {
          movie.actor = result.name;
          addToMovies(movie, true);
        });
      }
    });

    let allMovies = getFromSession("movies");
    console.log(allMovies);
    document.getElementById("search-results").innerHTML = "";
    allMovies.forEach((movie) => {
      let movieElement = makeMovieBannerFromMovie(movie);
      movieElement.setAttribute("name", movie.title);
      movieElement.setAttribute("actor", movie.actor);
      document.querySelector("#search-results").prepend(movieElement);
    });

    if (!document.querySelector("#show-more-btn-actors")) {
      // console.log(true);
      let showMoreDiv = document.createElement("div");
      showMoreDiv.className = "showMoreDiv";
      showMoreDiv.innerHTML = `
        <button id="show-more-btn-actors">Show more</button>
        `;

      document.querySelector(".search-results").append(showMoreDiv);

      document.getElementById("show-more-btn-actors").addEventListener("click", () => {
        document.getElementById("show-more-btn-actors").innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
        if (document.querySelectorAll(".movieBanner").length >= 20) {
          page += 1;
          getAndShowMoviesByActors(inputValue, page);
          myFunction(inputValue, "actor");
        }
      });
    }
  } else {
    document.querySelector("#search-results-text").textContent = "Showing Trending Movies";
    displayTrending();
  }
  myFunction(inputValue, "actor");
}

async function searchForUsers(inputValue = "") {
  inputValue = document.getElementById("searchField").value;
  searchType = "users";

  //Skapar en counter som ska börja på 8
  let counter = 8;

  //Hämtar användare och skapar divvar
  document.querySelector("#search-results").innerHTML = "";
  
  let users = await getUsers();
  let newArray = [];
  
  users.forEach(user => {
    if(user.username.includes(inputValue)){
      newArray.push(user);
    } 
  })
  
  for(let i = 0; i < counter; i++) {
    if(inputValue == ""){
      if (i >= users.length){
        //TA BORT SHOW MORE
        break;
      };

      makeUserSearchDivs(users[i]);

    } else{
      if (i >= newArray.length){
        //TA BORT SHOW MORE
        break;
      };
      makeUserSearchDivs(newArray[i]);
    }

  };
  
  if(document.getElementById("show-more-btn")){
    document.querySelector(".showMoreDiv").remove();
  }

  let showMoreDiv = document.createElement("div");
  showMoreDiv.className = "showMoreDiv";
  showMoreDiv.innerHTML = `
      <button id="show-more-btn">Show more</button>
  `;
  
  document.querySelector(".search-results").append(showMoreDiv);
        
  document.getElementById("show-more-btn").addEventListener("click", () => {
    document.getElementById("show-more-btn").innerHTML = `<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`;
    document.getElementById("search-results").innerHTML = "";

    counter += 8;

    for(let i = 0; i < counter; i++) {
      if(inputValue == ""){
        if (i >= users.length){
          //TA BORT SHOW MORE
          break;
        };

        makeUserSearchDivs(users[i]);

      } else{
        if (i >= newArray.length){
          //TA BORT SHOW MORE
          break;
        };
        makeUserSearchDivs(newArray[i]);
      }

    };
    
  });
  

}
  async function makeUserSearchDivs(user) {
      document.querySelector("#search-results-text").textContent = "Showing all users";
      document.querySelector("#search-results").setAttribute("style", "grid-template-columns: repeat(2, 1fr);");    

      // users.forEach((user) => {
        let userDiv = document.createElement("div");
        userDiv.className = "userDiv";
        userDiv.setAttribute("user", user.username);
        userDiv.addEventListener("click", () => {
          window.location.href = `http://localhost:2000/profile.php?userID=${user.id}`;
        });

        let userImage = document.createElement("div");
        userImage.className = "userImage";
        // console.log(user["profile_picture"].filepath);
        userImage.style.backgroundImage = `url('http://localhost:7001/${user["profile_picture"].filepath}')`;

        let userInfoDiv = document.createElement("div");
        userInfoDiv.className = "userInfoDiv";
        userInfoDiv.innerHTML = `
        <div id="usernameDiv">
              <p id="username">@${user.username}</p>
              <div id="settingOrPlus"></div>
          </div>`;

        let followDiv = document.createElement("div");
        followDiv.className = "followDiv";
        followDiv.innerHTML = `
        <div id="followInfo">
              <div id="followersDiv">
                  <p>Followers</p>
                  <p id="followers">${user.followers.length}</p>
              </div>
              <div id="followingDiv">
                  <p>Following</p>
                  <p id="following">${user.following.length}</p>
              </div>
          </div>`;

        userDiv.append(userImage, userInfoDiv, followDiv);
        document.querySelector("#search-results").append(userDiv);

        // if (!document.getElementById("show-more-btn")) {
        //   let showMoreDiv = document.createElement("div");
        //   showMoreDiv.className = "showMoreDiv";
        //   showMoreDiv.innerHTML = `
        //   <button id="show-more-btn">Show more</button>
        //   `;
        //   document.querySelector(".search-container").append(showMoreDiv);
        //   document.getElementById("show-more-btn").addEventListener("click", () => {
        //     if (document.querySelectorAll(".userDiv").length == 6) {
        //     }
        //   });
        // }
      // });
      myFunction(inputValue, "user");
  }
}

