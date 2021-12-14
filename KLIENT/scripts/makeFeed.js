// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";


// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");


// Hämta den inloggade användares "following" (functions.php)
async function getFollowing(id) {
    try {
        let response = await fetch(`http://localhost:7000/get-users.php?ids=${id}`);
        let loggedInUser = await response.json();
        return loggedInUser; 
    } catch (err) {
        console.log(err);
    }  
}


getFriendsActivities();

async function getFriendsActivities(){
    // Get the users following
    let user = await getFollowing(3);
    let following = user[0].following;

    // Hämta aktiviteterna från db  (get-activitys.php)
    let response = await fetch(`http://localhost:7000/get-activities.php?ids=${following}`);
    console.log(response);
    let data = await response.json();

    console.log(data);

    // createActivitieElements(data);


    // activities.sort((a,b) => b.date > a.date);
    // createActivitieElements(activities);
}

// async function createActivitieElements(data) {
//     let activities = await data;

//     console.log(activities);

//     // activities.forEach(acti => {
//     //     let container = docuement.createElement("div");

        
//     // });
// }


