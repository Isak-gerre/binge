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

function isMovieSaved(movieID) {
  if ("movies" in sessionStorage) {
     let allMovies = getFromSession("movies");
     let movie = allMovies.find((movie) => movie.id == movieID);
     return movie;
  }
  return false;
 
}
//_______________________________________________________________________________________

async function getMovieInfo(movieID) {
  let savedMovie = isMovieSaved(movieID);
  if (typeof savedMovie == "object") {
    return savedMovie;
  }
  try {
    let response = await fetch(`http://localhost:7001/GET/get-movie-info.php?movieID=${movieID}`);
    let data = await response.json();
    addToMovies(data.message, "movies");
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
