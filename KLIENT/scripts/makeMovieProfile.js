// Hämta data om filmen från SESSIONSTORAGE
// SKAPA hela sidan
// 1. MOVIE description (including buttons)
// 2. Streaming Services (Kalla på endpoint - skicka med
// movieID)
// 3. Cast + Directory (Kalla på endpoint - skicka med
// movieID) kolla vilka streaming tjänster som användaren har
// 4. Hämtar reviews från get-activitys.php
// 5. Similar Movies (Kalla på endpoint - skicka me MovieID)

// Kolla om användaren har gjort en aktivitet först,
// hämta data om info gällande aktiviterna genom
// check-movie-user-relation.php som returnerar true/false/obj
// Klickevent på knapparna:
// 1. Watched: skickar till servern
// 2. Watch later: skickar till servern
// 3. Review: skickar till servern

/*

makeMovieProfile([movieID]){

}

*/

"use strict";

async function makeMovieProfile(movieID) {
  let overlay = document.getElementById("overlay");
  overlay.style.minHeight = "100vh";
  let data = await getMovieInfo(movieID);
  let movieInfo = data.message;
    console.log(movieInfo);
    
    // Backdrop - Isak
    // Poster - Isak
    // Title - Isak
    // Buttons - Niklas
    // Release date - Isak
    // Rating - Isak
    // Description - Isak
    // Runtime - Isak
    // Streaming Services - Isak
    // Cast - Niklas
    // Directors - Niklas
    // Reviews - Isak
    // Similar Movies - Niklas

  overlay.append();
}

makeMovieProfile(550);
