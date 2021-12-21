// Allmänna funktioner som används överallt:

/*

function runLoadingAnimation(){

}

highestID(){

}

*/

"use strict";
// SESSION FUNCTIONS
//_______________________________________________________________________________________

function checkSessionStorageSize() {
  var limit = 1024 * 1024 * 5; // 5 MB
  var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
  return remSpace;
}

function makeState(movieID, page, scrollHeight = 0) {
  return {
    movie: movieID,
    page: page,
    scrollHeight: scrollHeight,
  };
}

function saveToSession(object, setter) {
  if (typeof object != "object") {
    alert("You can only save objects to sessionStorage");
  } else {
    sessionStorage.setItem(setter, JSON.stringify(object));
  }
}

function getFromSession(getter) {
  return JSON.parse(sessionStorage.getItem(getter));
}

function removeLatestState() {
  let allStates = getFromSession("state");
  allStates.splice(0, 1);
  saveToSession(allStates, "state");
}

function addToState(movieID, page, scrollHeight = 0) {
  if ("state" in sessionStorage) {
    let allStates = getFromSession("state");
    let newState = makeState(movieID, page, (scrollHeight = 0));
    allStates.unshift(newState);
    saveToSession(allStates, "state");
  } else {
    let allStates = [];
    let newState = makeState(movieID, page, (scrollHeight = 0));
    allStates.unshift(newState);
    saveToSession(allStates, "state");
  }
}

function addToMovies(movie) {
  let isSaved = isMovieSaved(movie.id);
  if (isSaved) {
    return true;
  }
  if ("movies" in sessionStorage) {
    let allMovies = getFromSession("movies");
    allMovies.unshift(movie);
    saveToSession(allMovies, "movies");
  } else {
    let allMovies = [];
    allMovies.unshift(movie);
    saveToSession(allMovies, "movies");
  }
}
async function saveMultipleMovies(array) {
  let fetches = array.map((id) => fetch(`http://localhost:7001/GET/get-movie-info.php?movieID=${id}`));
  const resultArray = await Promise.all(fetches);
  resultArray.map(async function (resp) {
    let movie = await resp.json();
    addToMovies(movie.message);
  });
}

function isMovieSaved(movieID) {
  if ("movies" in sessionStorage) {
    let allMovies = getFromSession("movies");
    let movie = allMovies.find((movie) => Number(movie.id) == Number(movieID));
    if (typeof movie == "object") {
      return movie;
    } else {
      return false;
    }
  }
  return false;
}
//_______________________________________________________________________________________

async function getMovieInfo(movieID) {
  if (typeof movieID === "object") {
    let savedMovies = [];
    let notSavedMovies = [];
    movieID.forEach((id) => {
      let movie = isMovieSaved(id);
      if (!movie) {
        notSavedMovies.push(id);
      }
    });
    await saveMultipleMovies(notSavedMovies);
    console.log(notSavedMovies);
    movieID.forEach((id) => {
      savedMovies.push(isMovieSaved(id));
    });
    return savedMovies;
  } else {
    let savedMovie = isMovieSaved(movieID);
    if (typeof savedMovie == "object") {
      return { message: savedMovie };
    }
    try {
      let response = await fetch(`http://localhost:7001/GET/get-movie-info.php?movieID=${movieID}`);
      let data = await response.json();
      addToMovies(data.message, "movies");
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

async function getSearchResults(searchType, query, page = 1) {
  try {
    let response = await fetch(
      `http://localhost:7001/GET/get-search-results.php?searchtype=${searchType}&query=${query}&page=${page}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getProviders() {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-watch-providers.php`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getGenres() {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-genres.php`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getTrending() {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-trending.php`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getButtonRealtionStatus(userID, movieID) {
  try {
    let response = await fetch(
      `http://localhost:7001/GET/check-movie-user-relation.php?movieID=${movieID}&userID=${userID}`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserInfo(userId) {
  const request = new Request(`http://localhost:7001/GET/get-users.php?ids=${userId}`);
  const response = await fetch(request);
  const userInfo = await response.json();

  return userInfo[0];
}

async function getFollowing(id) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-users.php?ids=${id}`);
    let loggedInUser = await response.json();
    return loggedInUser;
  } catch (err) {
    console.log(err);
  }
}

async function getFriendsActivities(id) {
  console.log(id);
  // Get the users following
  let user = await getFollowing(id); // session stared id
  let following = user[0].following;

  // Get following activities från db
  let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${following}`);
  let data = await response.json();

  return data;
}

function howManyDaysAgo(recievedDate) {
  const oneWeek = 24 * 60 * 60 * 1000 * 7; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(
    `${recievedDate[0]}${recievedDate[1]}${recievedDate[2]}${recievedDate[3]}, ${recievedDate[4]}${recievedDate[5]}, ${recievedDate[6]}${recievedDate[7]}`
  );
  const firstDateMS = firstDate.getTime();

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let todayMS = today.getTime();

  let currentDate = `${year}${month}${day}`;
  let daysAgo = currentDate - recievedDate;

  if (daysAgo === 0) {
    return "today";
  }

  if (daysAgo < 7 && daysAgo !== 0) {
    return `${daysAgo} days ago`;
  }

  if (daysAgo > 7) {
    return Math.round(Math.abs((firstDateMS - todayMS) / oneWeek)) + " weeks ago";
  }
}

// Skapat aktivteter till feed och profile
function createActivities(array, page, appendIn = "wrapper") {
  array.forEach(async function (obj) {
    let movieInfo = await getMovieInfo(obj.movieID);
    let userInfo = await getUserInfo(obj.userID);

    // Aktivitets containern
    let container = document.createElement("div");
    container.classList.add("container");
    
    document.getElementById(appendIn).append(container);

    // Top av aktivitets container, innehåller användarnamn + datum
    let userContainer = document.createElement("div");
    userContainer.classList.add("userContainer");
    container.append(userContainer);

    if (page == "feed") {
      // användarnamn
      let userPic = document.createElement("div");
      userPic.classList.add("userPic");
      userPic.style.backgroundImage = `url('http://localhost:7001/${userInfo.profile_picture.filepath}')`;

      userPic.addEventListener("click", () => {
        window.location.href = `profile.php?userID=${obj.userID}`;
      });

      let username = document.createElement("div");
      username.classList.add("username");
      username.textContent = userInfo.username;
      username.addEventListener("click", () => {
        window.location.href = `profile.php?userID=${obj.userID}`;
      });

      userContainer.append(userPic, username);
    }

    //datum
    let date = document.createElement("div");
    date.classList.add("date");
    date.textContent = howManyDaysAgo(obj.date);
    userContainer.append(date);

    // Bottom av aktivitetens container, innehåller titel + aktiviteten
    let activityContainer = document.createElement("div");
    activityContainer.classList.add("activityContainer");

    let activityContainerLeft = document.createElement("div");
    activityContainerLeft.classList.add("activityContainerLeft");

    let activityContainerRight = document.createElement("div");
    activityContainerRight.classList.add("activityContainerRight");
    activityContainerRight.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
    activityContainerRight.addEventListener("click", () => {
      makeMovieProfile(obj.movieID);
    });

    //Appenda de två delarna till containern
    container.append(activityContainer);
    activityContainer.append(activityContainerLeft, activityContainerRight);

    // type
    let type = document.createElement("div");
    type.classList.add("type");

    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = movieInfo.message.title;
    title.addEventListener("click", () => {
      makeMovieProfile(obj.movieID);
    });

    activityContainerLeft.append(type, title);

    //type text
    let typeText = document.createElement("div");
    typeText.classList.add("typeText");
    typeText.textContent = obj.type;

    //Type icon
    let typeIcon = document.createElement("img");
    typeIcon.classList.add("typeIcon");

    if (obj.type == "watchlist") {
      typeIcon.setAttribute("src", "../icons/watchlist.svg");
    }

    if (obj.type == "review") {
      typeIcon.setAttribute("src", "../icons/rate.svg");

      // stjärnor
      if (obj.rate !== "") {
        let rate = document.createElement("div");
        rate.classList.add("rate");

        for (let i = 0; i < obj.rate; i++) {
          let star = document.createElement("img");
          star.classList.add("star");
          star.setAttribute("src", "../icons/star_gold.svg");
          rate.append(star);
        }

        let gStars = 5 - obj.rate;

        for (let i = 0; i < gStars; i++) {
          let star = document.createElement("img");
          star.classList.add("star");
          star.setAttribute("src", "../icons/star_grey.svg");
          rate.append(star);
        }
        activityContainerLeft.append(rate);
      }

      //kommentar om det finns
      if (obj.comment !== "") {
        let comment = document.createElement("div");
        comment.classList.add("comment");
        comment.textContent = `" ${obj.comment} " `;
        activityContainerLeft.append(comment);
      }
    }

    if (obj.type == "watched") {
      typeIcon.setAttribute("src", "../icons/watched.svg");
    }
    type.append(typeText, typeIcon);
  });
}
async function getUserActivities(id) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${id}`);
    let activities = await response.json();
    return activities;
  } catch (err) {
    console.log(err);
  }
}

async function getSimilar(movieID) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-similar-movies.php?movieID=${movieID}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getCredits(movieID) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-additional-movieInfo.php?movieID=${movieID}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function getParamFromUrl(get) {
  let getParams = window.location.search;

  const urlParams = new URLSearchParams(getParams);
  const id = urlParams.get(get);

  return id;
}
