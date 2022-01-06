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
  // if (typeof object != "object") {
  //   alert("You can only save objects to sessionStorage");
  // } else {
    sessionStorage.setItem(setter, JSON.stringify(object));
  // }
}

function getFromSession(getter) {
  return JSON.parse(sessionStorage.getItem(getter));
}

function getLoggedInUserID() {
  if (getFromSession("session") != undefined) { 
    if (userVarification()) {
      let userID = getFromSession("session").session.userID;
      // console.log(userID);
      return userID;
    } else {
      sessionStorage.clear();
      window.href = "/index.php";
    }
  } else {
    sessionStorage.clear();
    window.location.replace("http://localhost:2000");
  }
}

async function userVarification() {
  let userSession = getFromSession("session").session;
  let userID = userSession.userID;
  let sessionID = userSession.sessionID;
  try {
    let response = await fetch(`http://localhost:7001/GET/get-users.php?sessionID=${sessionID}&userID=${userID}`);
    let data = await response.json();
    if (data.ok) {
      return true;
    }
    else {
      return false
    }
  } catch (error) {
    console.error(error);
  }

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

function addToMovies(movie, update = false) {
  let isSaved = isMovieSaved(movie.id);
  if (isSaved) {
    if (update) {
      let allMovies = getFromSession("movies");
      let index = allMovies.findIndex((savedMovie) => savedMovie.id == movie.id);
      allMovies.splice(index, 1);
      allMovies.unshift(movie);
      saveToSession(allMovies, "movies");
    }
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
    console.log(searchType);
    let response = await fetch(
      `http://localhost:7001/GET/get-search-results.php?searchtype=${searchType}&query=${query}&page=${page}`
    );
    let data = await response.json();
    console.log(data);
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

async function getMoviesByGenre(genre) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-movies-by-genre.php?genre=${genre}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function searchResultsByGenre(genre) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-search-results-genres.php?genre=${genre}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getTrending(page) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-trending.php?page=${page}`);
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

async function getUsers() {
  const request = new Request(`http://localhost:7001/GET/get-users.php`);
  const response = await fetch(request);
  const users = await response.json();

  return users;
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
  let stringDate = recievedDate.toString();  
  // console.log(stringDate);
  let thisMagicMoment = moment(stringDate, "YYYYMMDD").fromNow();
  // console.log(thisMagicMoment);
  return thisMagicMoment;
}

// Skapat aktivteter till feed och profile
function createActivities(array, page, appendIn = "wrapper") {
  array.sort((a, b) => b.date - a.date);

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

    if (page == "feed" || page == "movie") {
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

    if (page == "myProfile") {
      let deleteActivityDropdown = document.createElement('img');
      deleteActivityDropdown.setAttribute('src', '../icons/expand_more_white.svg');

      let dropDown = document.createElement('div');
      dropDown.id = 'dropDown';
      let deleteActivity = document.createElement('p');
      deleteActivity.textContent = 'Delete activity';

      deleteActivityDropdown.addEventListener('click', (event) => {
        event.stopPropagation();
        dropDown.append(deleteActivity);
        
        body.addEventListener('click', (event) => {
          event.stopPropagation();
          dropDown.remove();
        });
        
        deleteActivity.addEventListener('click', function (event) {
          event.stopPropagation();
          deleteteActivity(obj.id);
          dropDown.remove();
          
          container.style.left = "100vw";
          setTimeout( () => {
            container.remove();
          }, 1000);
        });
        userContainer.append(dropDown);
      })

      userContainer.append(deleteActivityDropdown);
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
      window.location.href = `explore.php?movieID=${obj.movieID}`;
    });

    //Appenda de två delarna till containern
    container.append(activityContainer);

    if (page !== "movie") {
      activityContainer.append(activityContainerLeft, activityContainerRight);
    } else {
      activityContainer.append(activityContainerLeft);
    }

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
        // comment.style.height = '200px';
        comment.classList.add("comment");
        comment.textContent = `" ${obj.comment.substring(0, 30)}... " `;
        activityContainerLeft.append(comment);

        if (obj.comment.length > 30) {
          let expandComment = document.createElement("img");
          expandComment.setAttribute("src", "../icons/expand_more.svg");
          expandComment.id = "expandComment";

          expandComment.addEventListener("click", () => {
            activityContainer.classList.toggle("open");

            if (activityContainer.classList.contains("open")) {
              // console.log(activityContainer.scrollHeight);
              expandComment.setAttribute("src", "../icons/expand_less.svg");
              comment.textContent = `" ${obj.comment} " `;
              let expandHeight = comment.scrollHeight;
              comment.style.height = `${expandHeight}px`;
            } else {
              comment.removeAttribute('style');
              expandComment.setAttribute("src", "../icons/expand_more.svg");
              comment.textContent = `" ${obj.comment.substring(0, 30)}... " `;
              // comment.style.height = '200px';
            }
          });

          activityContainerLeft.append(expandComment);
        }
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

async function getAdditionalInfo(movieID) {
  try {
    // console.log(movieID);
    let response = await fetch(`http://localhost:7001/GET/get-additional-movieInfo.php?movieID=${movieID}`);
    // console.log(response);
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

async function postNewActivity(movieID, userID, type, comment = "", rate = "") {
  let msg = {
    userID: userID,
    movieID: movieID,
    type: type,
    comment: comment,
    rate: rate
  }


  let rqst = new Request("http://localhost:7001/POST/create-activity.php",
    {
      method: "POST",
      body: JSON.stringify(msg),
      headers: { "Content-type": "application/json" },
    }
  );

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function patchActivity(activity) {
  let rqst = new Request("http://localhost:7001/PATCH/update-activity.php",
    {
      method: "PATCH",
      body: JSON.stringify({ activity: activity }),
      headers: { "Content-type": "application/json" },
    }
  );

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteteActivity(activityID) {
  let rqst = new Request("http://localhost:7001/DELETE/delete-activity.php",
    {
      method: "DELETE",
      body: JSON.stringify({ id: activityID }),
      headers: { "Content-type": "application/json" },
    }
  );

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function followPatch(mainUserID, friendsUserID) {

  const response = await fetch(new Request("http://localhost:7001/PATCH/update-user.php", {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({userID: mainUserID, friendsUserID: friendsUserID})
  }));

  const data = await response;
}