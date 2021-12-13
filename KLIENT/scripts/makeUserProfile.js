"use strict";
// import "makeMovieBanner.js";
// import "makeFeed.js"

// Kontrollera i om det finns en get-parameter med en användares ID
// -> Om inte - hämta egen användares ID i sessionStorage
/*
Om det är någon annans profil:
-   Kolla om 
*/

// Hämta UserInfo by ID och placera i variabel
/* Gör html-element som ska placeras i profilbeskrivningen
    - username
    - followers
    - following
    - follor/unfollow eller settings 
*/


// * Hämtar acitivity feed
// * Skapar UserInfo ruta
// * Visa följ/avfölj eller settings utifrån ID



// Whatched:
// sortera bort watch later
// Anropar på makeFeed med userID

// Watchlist:
// välj ut watch later
// hämta film-informationen
// Anropar movieBanner med film idn

// Stats:
//

// Inloggad användare
const loggedInUserId = Number(sessionStorage.getItem('userID'));

// Fasta html-variabler
const proPicCont = document.getElementById('profilePic');
const uNameCont = document.getElementById('username');
const settingOrPlus = document.getElementById('settingOrPlus');
const followersCont = document.getElementById('followers');
const followingCont = document.getElementById('following');


createProfilePage();

async function createProfilePage() {
    const loggedInUserInfo = await getUserInfo(loggedInUserId);
    
    let urlUserId = getUserFromUrl();

    if (urlUserId !== null) {
        let userInfo = await getUserInfo(urlUserId);

        let loggedInUserFollow = loggedInUserInfo.following;
        let following = loggedInUserFollow.some(e => e == urlUserId);

        createProfileHeader(userInfo, following);
    } else {
        createProfileHeader(loggedInUserInfo, null, true);
    }


    // createProfileFeed()?


}

function getUserFromUrl() {
    let getParams = window.location.search;

    const urlParams = new URLSearchParams(getParams);
    const userId = urlParams.get('userID');
    
    return userId
}

async function getUserInfo(userId) {
    
    const request = new Request(`http://localhost:8001/GET/get-users.php?ids=${userId}`);
    const response = await fetch(request);
    const userInfo = await response.json();
    
    return userInfo[0];
}

async function createProfileHeader(user, isFollowing, settings = null) {

    let username = user.username.toLowerCase();
    uNameCont.textContent = "@" + username;
    let profilePic = document.createElement('img');

    // vi behöver ett url här va
    profilePic.src = `http://localhost:8001/${user.profile_picture.filepath}`;
    
    let followers = user.followers;
    let following = user.following;
    let nrOfFollowers = followers.length;
    let nrOfFollowing = following.length;
    let profileButton = document.createElement('button');

    if (isFollowing !== null) {
        if (isFollowing) {
            profileButton.textContent = "unfollow";
        } else if (!isFollowing) {
            profileButton.textContent = "follow";
        }   
    }
    
    if (settings == true) {
        profileButton.textContent = "settings";
    }

    profileButton.addEventListener('click', async function () {

        if (profileButton.textContent == "unfollow") {
            isFollowing = false;

            profileButton.textContent = "follow";
            let response = await followPatch(loggedInUserId, user.id);
            console.log(response);

            nrOfFollowers -= 1;
            followersCont.textContent = nrOfFollowers;
            

        } else if (profileButton.textContent == "follow") {
            isFollowing = true;

            profileButton.textContent = "unfollow";
            let response = await followPatch(loggedInUserId, user.id);
            console.log(response);

            nrOfFollowers += 1;
            followersCont.textContent = nrOfFollowers;
            

        } else if (profileButton.textContent == "settings") {
            openSettings(user.id);
        }
    })
    
    proPicCont.append(profilePic);
    settingOrPlus.append(profileButton);
    followersCont.append(nrOfFollowers);
    followingCont.append(nrOfFollowing);

}

async function followPatch(mainUserID, friendsUserID) {
    let infoToSend = {
        userID: mainUserID, 
        friendsUserID: friendsUserID
    }

    const response = await fetch(new Request("http://http://localhost:8001/PATCH/update-user.php", {
        method: "PATCH",
        body: JSON.stringify(infoToSend),
        headers: {
            "Content-type": "application/json"
        }
    }));

    let data = await response.json();
    console.log(data);
}

// async function getActivityInfo(userId) {


// }

function openSettings(userId) {
    console.log(userId);
}

