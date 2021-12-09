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

async function makeFeedElement() {
  
}