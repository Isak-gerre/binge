// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";

// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");

const wrapper = document.getElementById("wrapper");

// Get the logged in userobj
makeFeed();

async function makeFeed() {
    // hämta id från session
    let activities = await getFriendsActivities(1);
    activities.sort((a, b) => b.date - a.date);
    createActivities(activities, "feed");
}