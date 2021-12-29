// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";

// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");

const wrapper = document.getElementById("wrapper");

const userID = getLoggedInUserID();
// Get the logged in userobj
makeFeed(userID);

async function makeFeed(userID) {
    // hämta id från session
    let activities = await getFriendsActivities(userID);
    createActivities(activities, "feed");
}