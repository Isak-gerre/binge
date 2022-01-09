"use strict";

document.addEventListener("DOMContentLoaded", function (event) {
  if (document.querySelector("#pWrapper") != null) {
    document.querySelector("#pWrapper").style.opacity = 1;
  }
  if (document.querySelector("#wrapper") != null) {
    document.querySelector("#wrapper").style.opacity = 1;
  }
});

// State Handlers
//_______________________________________________________________________________________
function ifSearchInState() {
  if ("state" in sessionStorage) {
    let state = getFromSession("state")[0];
    if (state.search) {
      makeSearchOverlay(state.search.search_word, state.search.search_by);
    }
  }
}
function removeLatestState() {
  if ("state" in sessionStorage) {
    let allStates = getFromSession("state");
    // Tar bort nyaste state
    allStates.splice(0, 1);
    saveToSession(allStates, "state");
  }
}
function toScroll() {
  let stateCheck = setInterval(() => {
    if (document.readyState === "complete") {
      if (getParamFromUrl("scroll")) {
        console.log(getParamFromUrl("scroll"));
        window.scrollTo(0, getParamFromUrl("scroll"));
      }
      clearInterval(stateCheck);
    }
  }, 100);
}
//_______________________________________________________________________________________

// SESSION FUNCTIONS
//_______________________________________________________________________________________

function checkSessionStorageSize() {
  var limit = 1024 * 1024 * 5; // 5 MB
  var remSpace = limit - unescape(encodeURIComponent(JSON.stringify(sessionStorage))).length;
  return remSpace;
}

function makeState(page, scrollHeight = 0, search = null) {
  return {
    page: page,
    scrollHeight: scrollHeight,
    search: search,
  };
}
function makeSearchState(searchword, searchBy) {
  let scrollDistance = document.querySelector("#search-results").scrollTop;
  console.log(scrollDistance);
  console.log(searchword);
  console.log(searchBy);
  return {
    search_word: searchword,
    search_by: searchBy,
    scroll_distance: scrollDistance,
    openSearch: true,
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
    } else {
      return false;
    }
  } catch (error) {
    // console.error(error);
  }
}

function removeLatestState() {
  let allStates = getFromSession("state");
  allStates.splice(0, 1);
  saveToSession(allStates, "state");
}

function addToState(page, scrollHeight = 0, search) {
  if ("state" in sessionStorage) {
    let allStates = getFromSession("state");
    let newState = makeState(page, scrollHeight, search);
    allStates.unshift(newState);
    saveToSession(allStates, "state");
  } else {
    let allStates = [];
    let newState = makeState(page, scrollHeight, search);
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
  // Get the users following
  let user = await getFollowing(id); // session stared id
  let following = user[0].following;

  // Get following activities från db
  let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${following}`);
  let data = await response.json();

  return data;
}

async function getActivityByMovieID(movieID) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-activities.php?movieID=${movieID}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function howManyDaysAgo(recievedDate) {
  // console.log(moment("202201011402", "YYYYMMDDhmm").fromNow());
  let stringDate = recievedDate.toString();
  let thisMagicMoment = moment(stringDate, "YYYYMMDDhmm").fromNow();
  return thisMagicMoment;
}

// Skapat aktivteter till feed och profile
async function createActivities(obj, page, appendIn = "#wrapper") {

  let movieInfo = await getMovieInfo(obj.movieID);
  let userInfo = await getUserInfo(obj.userID);

  // Aktivitets containern
  let container = document.createElement("div");
  container.classList.add("container");

  document.querySelector(appendIn).append(container);

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

  //datum
  let date = document.createElement("div");
  date.classList.add("date");
  date.textContent = howManyDaysAgo(obj.date);
  userContainer.append(date);

  // Bottom av aktivitetens container, innehåller titel + aktiviteten
  let activityContainer = document.createElement("div");
  activityContainer.classList.add("activityContainer");

  // LONG-PRESS BUTTON
  if (window.location.search === "") {
    activityContainer.setAttribute("data-long-press-delay", "500");

    activityContainer.addEventListener("long-press", (e) => {
      e.stopPropagation();

      // Den du trycker på kommer att få klassen zoomIn
      e.currentTarget.className += " zoomIn";
      container.style.animation = "marginScale 1s forwards";

      // Variabel för alla aktiviteter som är i profileWrapper
      let allActivities = document.querySelectorAll("#profileWrapper > .container");

      // Click-event på föräldern som gör att du går ur fokus-perspektivet
      let wrapper = document.querySelector("#profileWrapper");

      // Prevent scrolling
      // wrapper.style.overflow = "hidden";

      wrapper.addEventListener("click", (e) => {
        e.stopPropagation();
        // wrapper.style.overflow = "scroll";

        if (document.querySelector(".options")) {
          document.querySelector(".options > button:first-child").style.animation = "scaleFromNormal 0.5s forwards";
          document.querySelector(".options > button:last-child").style.animation = "scaleFromNormal 0.5s forwards";
          setTimeout(() => {
            if(document.querySelector(".options") != null){
              document.querySelector(".options").remove();

            }
          },500)
         
        }

        allActivities.forEach((activitieContainer) => {
          if (activitieContainer.children[1].className == "activityContainer") {
            activitieContainer.style.filter = "blur(0px)";
            activitieContainer.style.pointerEvents = 'auto';
            container.style.animation = "marginScaleReverse 1s forwards";
          } else {
            activitieContainer.children[1].className = "activityContainer";
            container.style.animation = "marginScaleReverse 1s forwards";
          }
        })
      });

      // För varje aktivitet som  finns på displayen
      allActivities.forEach((element) => {

        // om en activityContainer inte innehåller zoomIn lägg på blur
        if (!element.children[1].classList.contains("zoomIn")) {
          element.style.filter = "blur(8px)";
          element.style.pointerEvents = "none";

          // om en aktivitet innehåller zoomIn
        } else if (element.children[1].classList.contains("zoomIn")) {

          // Options för vad du kan göra med den
          let options = document.createElement("div");
          options.className = "options";

          // Remove from list - button
          let removeFromList = document.createElement("button");
          removeFromList.textContent = "Remove from list";
          removeFromList.className = "button";

          removeFromList.addEventListener("click", (event) => {
            event.stopPropagation();

            wrapper.style.overflow = "scroll";

            deleteteActivity(obj.id);

            if (document.querySelector(".options")) {
              document.querySelector(".options").remove();
            }

            allActivities.forEach((activitieContainer) => {
              if (activitieContainer.children[1].className == "activityContainer") {
                activitieContainer.style.filter = "blur(0px)";
                activitieContainer.style.pointerEvents = 'auto';
              } else {
                activitieContainer.children[1].className = "activityContainer";
              }
            })

            setTimeout(() => {
              container.style.left = "100vw";
              setTimeout(() => {
                container.remove();
              }, 1000);
            }, 1000);

            let message = "You have succesfully delted this from your activities";
            setTimeout(() => {
              messageToUser(message);
            }, 2000)
          })

          let makeOrUpdate;
          if (obj.type == "watched") {
            makeOrUpdate = "Make review";
          } else if (obj.type == "review") {
            makeOrUpdate = " Update review";
          }

          let reviewDiv = document.createElement("button");
          reviewDiv.textContent = makeOrUpdate;
          reviewDiv.className = "button";
          reviewDiv.style.display = "none";

          reviewDiv.addEventListener("click", (event) => {
            event.stopPropagation();

            wrapper.style.overflow = "scroll";


          })
          // En delay på när knapparna skapas.
          removeFromList.style.animation = "scaleFromZero 1s forwards";
          reviewDiv.style.animation = "scaleFromZero 1s forwards";
          options.append(removeFromList);
          setTimeout(() => {

            element.append(options);
          }, 100);

          // Fucntions 
          // function disappearingOfActivity(activityDOM) {
          //   activityDOM.style.animation = "fadeOut 1.5s";
          //   setTimeout(() => {
          //     movie.remove();
          //   }, 1500);
          // }

          function messageToUser(message) {
            let messageDOM = document.createElement("div");
            messageDOM.className = "messageToUser";


            let p = document.createElement("p");
            p.textContent = message;

            messageDOM.append(p);
            messageDOM.style.animation = "fadeIn 1s";
            document.body.append(messageDOM);

            setTimeout(() => {
              messageDOM.style.animation = "fadeOut 1.5s";
              setTimeout(() => {
                messageDOM.remove();
              }, 1000)
            }, 2000)
          }
        }
      })
    })
  }

  let activityContainerLeft = document.createElement("div");
  activityContainerLeft.classList.add("activityContainerLeft");

  let activityContainerRight = document.createElement("div");
  activityContainerRight.classList.add("activityContainerRight");
  activityContainerRight.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
  activityContainerRight.addEventListener("click", (e) => {
    e.stopPropagation();
    goToPageAndAddToState(`explore.php?movieID=${obj.movieID}`);
    // window.location.href = `explore.php?movieID=${obj.movieID}`;
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
  title.addEventListener("click", (e) => {
    e.stopPropagation();
    goToPageAndAddToState(`explore.php?movieID=${obj.movieID}`);
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
            comment.removeAttribute("style");
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
    rate: rate,
  };

  let rqst = new Request("http://localhost:7001/POST/create-activity.php", {
    method: "POST",
    body: JSON.stringify(msg),
    headers: { "Content-type": "application/json" },
  });

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function patchActivity(activity) {
  let rqst = new Request("http://localhost:7001/PATCH/update-activity.php", {
    method: "PATCH",
    body: JSON.stringify({ activity: activity }),
    headers: { "Content-type": "application/json" },
  });

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteteActivity(activityID) {
  let rqst = new Request("http://localhost:7001/DELETE/delete-activity.php", {
    method: "DELETE",
    body: JSON.stringify({ id: activityID }),
    headers: { "Content-type": "application/json" },
  });

  try {
    let response = await fetch(rqst);
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function followPatch(mainUserID, friendsUserID) {
  const response = await fetch(
    new Request("http://localhost:7001/PATCH/update-user.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: mainUserID, friendsUserID: friendsUserID }),
    })
  );

  // const data = await response;
}

async function getAllActivites(userId) {
  // console.log(userId);
  let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${userId}`);
  let userActivites = await response.json();
  userActivites.sort((a, b) => b.date - a.date);

  return userActivites;
}

async function makeShowMoreForActis(whatFunc, page, appendIn, actis, counter) {
  let x = true;
  let y = 8;

  if (page == "movieProfile") {
    y = 1;
  }

  for (let i = counter - 1; i <= counter + y; i++) {

    if (i >= actis.length) {
      if (document.querySelector(".showMoreDiv")) {
        document.querySelector(".showMoreDiv").remove();
      }
      x = false;
      break;
    }

    await createActivities(actis[i], page, appendIn);
  }

  if (document.querySelector(".showMoreDiv")) {
    document.querySelector(".showMoreDiv").remove();
  }

  if (x) {
    // Skapa show more knapp
    let showMoreDiv = document.createElement("div");
    showMoreDiv.className = "showMoreDiv";
    showMoreDiv.innerHTML = `<button id="show-more-btn">Show more</button>`;
    document.querySelector(appendIn).append(showMoreDiv);

    // Event för show-more-knapp
    document.getElementById("show-more-btn").addEventListener("click", () => {   
      // ladd ikon på show more knapp   
      document.getElementById("show-more-btn").innerHTML = `<div class="loading-dots"><div></div><div></div><div></div><div></div></div>`;

      if (page == "feed") {
        counter += 10;
        whatFunc(loggedInUserId, counter);
      }
      if (page == "profile") {
        counter += 10;
        whatFunc(makeShowMoreForActis, "profile", "#profileWrapper", actis, counter);
      }
      if (page == "movieProfile") {
        counter += 3;
        whatFunc(makeShowMoreForActis, "movieProfile", "#movie-profile-reviews", actis, counter);
      }
    });
  }
}
