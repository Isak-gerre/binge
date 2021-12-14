// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";


// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");


// Get the logged in userobj
async function getFollowing(id) {
    try {
        let response = await fetch(`http://localhost:7000/GET/get-users.php?ids=${id}`);
        let loggedInUser = await response.json();
        return loggedInUser; 
    } catch (err) {
        console.log(err);
    }  
}

async function getFriendsActivities(){
    // Get the users following
    let user = await getFollowing(3); // session stared id
    let following = user[0].following;

    // Get following activities från db
    let response = await fetch(`http://localhost:7000/GET/get-activities.php?followingIDs=${following}`);
    let data = await response.json();

    let friendsActivityInfo = await getFriendsActivityInfo(data);
    console.log(friendsActivityInfo);

    return friendsActivityInfo;
}


async function getFriendsActivityInfo(data) {

    let activitiesArray = [];

    // Get info about the activity
    await data.forEach(async function(acti){ 

        let movieInfo = await getMovieInfo(acti.movieID);
        let userInfo = await getUserInfo(acti.userID);

        let activity = {
            movie: movieInfo.message,
            username: userInfo.username,
            activity: acti
        }

        activitiesArray.push(activity);
        console.log(activity);
    });
    console.log(activitiesArray);

    return activitiesArray;
}

async function makeFeed() {
    let activities = await getFriendsActivities();

    activities.forEach(async function(obj) {
        console.log(obj);
    })
    console.log(activities);

    // activities.forEach(acti => {
    //     let container = document.createElement("div");
        
    //     let username = doucment.createElemnt("div");
    //     username.innerHtml = acti.username;
    //     container.append(username);
    //     document.getElementById("wrapper").append(container);
    

    // });

}
makeFeed();


