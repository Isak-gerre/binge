// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";

// Hämta den inloggade användares id
let loggedInUserID = sessionStorage.getItem("loggedInUserID");

// Hämta den inloggade användares "following" (functions.php)
async function getFollowing(loggedInUserID) {
    let loggedInUser = await getUsersById(IDs); // returnerar en användaare

    // Hämta användarens following
    let following = loggedInUser.following;

    // Kalla på funktion som skapar aktiteterna med id arr
    makeFriendsActivities(following);
}

async function makeFriendsActivities(loggedInUserID){
    // Hämta aktiviteterna från db  (get-activitys.php)
    let activities = await getFriendsActivities(IDs);

    //stortera aktiviteterna efter datum
    activities.sort()

    activities.forEach(a => {
        // skapa divs
        
    });
    
}
