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
        activityContainerRight.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
        activityContainerRight.addEventListener("click", {
            // Kalla på makeMovieProfile med obj.movieID
        });

        //Appenda de två delarna till containern
        container.append(userContainer, activityContainer);
        activityContainer.append(activityContainerLeft, activityContainerRight);

        
        // användarnamn
        let userPic = document.createElement("div");
        userPic.classList.add("userPic");
        userPic.style.backgroundImage = `url('http://localhost:7001/${userInfo.profile_picture.filepath}')`;

        // Bilden ska komma in här
        userPic.addEventListener("click", {
            // Kalla på makeUserProfile med obj.userID
        });

        let username = document.createElement("div");
        username.classList.add("username");
        username.textContent = userInfo.username;
        username.addEventListener("click", {
            // gå till profile.php obj.userID
        });
        
        //datum
        let date = document.createElement("div");
        date.classList.add("date");
        date.textContent = howManyDaysAgo(obj.date);
        
        userContainer.append(userPic, username, date);
    
        
        // type
        let type = document.createElement("div");
        type.classList.add("type");

        let title = document.createElement("div");
        title.classList.add("title");
        title.textContent = movieInfo.message.title;
        title.addEventListener("click", {
            // Kalla på makeMovieProfile med obj.movieID
        });

        activityContainerLeft.append(type, title);
    
        //type text
        let typeText = document.createElement("div");
        typeText.classList.add("typeText");
        typeText.textContent = obj.type;

        //Type icon
        let typeIcon = document.createElement("img");
        typeIcon.classList.add("typeIcon");

        if(obj.type == "watchlist") {
            typeIcon.setAttribute("src", "../icons/watchlist.svg");
        }
        
        if(obj.type == "review") {
            typeIcon.setAttribute("src", "../icons/rate.svg");

            // stjärnor
            if(obj.rate !== "") {
                let rate = document.createElement("div");
                rate.classList.add("rate");

                for(let i = 0; i < obj.rate; i++) {
                    let star = document.createElement("img");
                    star.classList.add("star");
                    star.setAttribute("src", "../icons/star_gold.svg");            
                    rate.append(star);
                }

                let gStars = 5 - obj.rate;

                for(let i = 0; i < gStars; i++) {
                    let star = document.createElement("img");
                    star.classList.add("star");
                    star.setAttribute("src", "../icons/star_grey.svg");
                    rate.append(star);
                }
                activityContainerLeft.append(rate);
            }

            //kommentar om det finns
            if(obj.comment !== "") {
                let comment = document.createElement("div");
                comment.classList.add("comment");
                comment.textContent = `" ${obj.comment} " `;
                activityContainerLeft.append(comment);
            }
        }
        
        if(obj.type == "watched") {
            typeIcon.setAttribute("src", "../icons/watched.svg");
        }
        type.append(typeText, typeIcon);
    })

}
makeFeed();

function howManyDaysAgo(recievedDate) {

    const oneWeek = 24 * 60 * 60 * 1000 * 7; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(`${recievedDate[0]}${recievedDate[1]}${recievedDate[2]}${recievedDate[3]}, ${recievedDate[4]}${recievedDate[5]}, ${recievedDate[6]}${recievedDate[7]}`);
    const firstDateMS = firstDate.getTime();

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let todayMS = today.getTime();
    
    let currentDate = `${year}${month}${day}`;
    let daysAgo = currentDate - recievedDate;
    
    if(daysAgo === 0){
        return "today";
    }

    if(daysAgo < 7 && daysAgo !== 0) {
        return `${daysAgo} days ago`;
    }

    if(daysAgo > 7) {
        return Math.round(Math.abs((firstDateMS - todayMS) / oneWeek)) + " weeks ago";
    }
}