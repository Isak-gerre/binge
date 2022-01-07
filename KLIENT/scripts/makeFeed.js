// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";

// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");

const wrapper = document.getElementById("wrapper");


const loggedInUserId = getLoggedInUserID();
// Get the logged in userobj
makeFeed(loggedInUserId);



async function makeFeed(userID, counter = 1) {
    let activities = await getFriendsActivities(userID);
    activities = activities.sort((a, b) => b.date - a.date);

    if (activities.length < 1) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("msgDiv");

        let msgQuo = document.createElement("div");
        msgQuo.textContent = "Well, like you said there's no friends on Wall Street. Right? - Wolf of Wallstreet";
        msgQuo.classList.add("msgQuo");

        let msgBtn = document.createElement("button");
        msgBtn.textContent = "Find more friends to follow";
        msgBtn.classList.add("msgBtn");

        msgDiv.append(msgQuo, msgBtn);

        msgBtn.addEventListener("click", () => {
            makeSearchOverlay("", "User");
        });

        wrapper.append(msgDiv);
    } else {
        makeShowMoreForActis(makeFeed, "feed", "#wrapper", activities, counter);
    }
}

