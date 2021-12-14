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
    let response = await fetch(`http://localhost:7001/get-movie-info.php?movieID=${movieID}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
async function getTrending() {
  try {
    let response = await fetch(`http://localhost:7001/get-trending.php`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getUserInfo(userId) {
    
  const request = new Request(`http://localhost:8001/GET/get-users.php?ids=${userId}`);
  const response = await fetch(request);
  const userInfo = await response.json();
  
  return userInfo[0];
}