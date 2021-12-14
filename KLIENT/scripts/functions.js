// Allmänna funktioner som används överallt:

/*

function runLoadingAnimation(){

}

highestID(){

}

*/

"use strict";

async function getMovieInfo(movieID) {
  try {
    let response = await fetch(`http://localhost:7001/GET/get-movie-info.php?movieID=${movieID}`);
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

async function getFriendsActivities() {
  // Get the users following
  let user = await getFollowing(3); // session stared id
  let following = user[0].following;

  // Get following activities från db
  let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${following}`);
  let data = await response.json();

  return data;
}

