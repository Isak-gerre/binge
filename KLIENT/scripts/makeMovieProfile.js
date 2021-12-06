// Hämta data om filmen från SESSIONSTORAGE
// SKAPA hela sidan
// 1. MOVIE description (including buttons)
// 2. Streaming Services (Kalla på endpoint - skicka med
// movieID)
// 3. Cast + Directory (Kalla på endpoint - skicka med
// movieID) kolla vilka streaming tjänster som användaren har
// 4. Review
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
async function getMovieInfo() {
  try {
    let response = await fetch(`http://localhost:7000/get-movie-info.php`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

console.log(getMovieInfo());
