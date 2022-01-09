"use strict";

const wrapper = document.getElementById("wrapper");
const loggedInUserId = getLoggedInUserID();
// Get the logged in userobj
loadingScreen();
setTimeout(() => {
    makeFeed(loggedInUserId);
}, 1000)

// create feed
async function makeFeed(userID, counter = 1) {
    let activities = await getFriendsActivities(userID);
    activities = activities.sort((a, b) => b.date - a.date);

    if (activities.length < 1) {
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("msgDiv");

        let msgQuo = document.createElement("div");
        msgQuo.textContent = "Nothing here yet..";
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
    removeLoadingOverlay();
}