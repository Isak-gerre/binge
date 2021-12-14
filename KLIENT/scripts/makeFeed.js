// Hämtar alla aktiviteter som användarens vänner gjort från get-activitys.php
// Sortera aktiviterna enligt datum
// Skapa elementen, appenda dem 
// Kallar på makeMovie profile vid klick. Movie Profile kommer upp.

"use strict";


// Hämta den inloggade användares id
// let loggedInUserID = sessionStorage.getItem("loggedInUserID");

const wrapper = document.getElementById("wrapper");

// Get the logged in userobj

async function makeFeed() {
    let activities = await getFriendsActivities();

    activities.sort((a, b) => b.date - a.date);


    activities.forEach(async function(obj) {
        let movieInfo = await getMovieInfo(obj.movieID);
        let userInfo = await getUserInfo(obj.userID);

        // Aktivitets containern
        let container = document.createElement("div");
        container.classList.add("container");
        wrapper.append(container);


        // Top av aktivitets container, innehåller användarnamn + datum
        let userContainer = document.createElement("div");
        userContainer.classList.add("userContainer");

        // Bottom av aktivitetens container, innehåller titel + aktiviteten
        let activityContainer = document.createElement("div");
        activityContainer.classList.add("activityContainer");

        let activityContainerLeft = document.createElement("div");
        activityContainerLeft.classList.add("activityContainerLeft");

        let activityContainerRight = document.createElement("div");
        activityContainerRight.classList.add("activityContainerRight");
        activityContainerRight.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`


        //Appenda de två delarna till containern
        container.append(userContainer, activityContainer);
        activityContainer.append(activityContainerLeft, activityContainerRight);

        
        
        // användarnamn
        let username = document.createElement("div");
        username.classList.add("username");
        username.textContent = userInfo.username;
        
        //datum
        let date = document.createElement("div");
        date.classList.add("date");
        date.textContent = obj.date;
        
        userContainer.append(username, date);
        
        
        let type = document.createElement("div");
        type.classList.add("type");
        type.textContent = obj.type;
        
        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = movieInfo.message.title;
        
        activityContainerLeft.append(type, title);


        if(obj.type == "watchlist") {
            //ikon

        }

        if(obj.type == "review") {
            //ikon
            // stjärnor om det finns
            //kommentar om det finns
        }

        if(obj.type == "watched") {
            //ikon
        }



        console.log(movieInfo);
    })

}
makeFeed();


