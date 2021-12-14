// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";


// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");


// Get the logged in userobj

async function makeFeed() {
    let activities = await getFriendsActivities();


    console.log(activities);

    activities.forEach(async function(obj)  {
        let movieInfo = await getMovieInfo(obj.movieID);
        let userInfo = await getUserInfo(obj.userID);

        let p = document.createElement("p");
        p.textContent = userInfo.username;
        let p2 = document.createElement("p");
        p2.textContent = movieInfo.message.title;

        document.body.append(p, p2);

        console.log(movieInfo);
    })

    // activities.forEach(acti => {
    //     let container = document.createElement("div");
        
    //     let username = doucment.createElemnt("div");
    //     username.innerHtml = acti.username;
    //     container.append(username);
    //     document.getElementById("wrapper").append(container);
    

    // });

}
makeFeed();


