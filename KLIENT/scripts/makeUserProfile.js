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

// const loggedInUser = sessionStorage.userId;

createProfilePage();

async function createProfilePage() {
    let userId = checkUser();
    // const userId = checkUser();

    let userInfo = await getUserInfo(userId); 
    createProfileHeader(userInfo);

    // createProfileFeed()?


}



function checkUser() {
    let getParams = window.location.search;
    
    if (getParams == "") {
        let userId = sessionStorage.userID;

        return userId
        
    } else {
        
        const urlParams = new URLSearchParams(getParams);
        const userId = urlParams.get('userID');
    
        return userId
    }
    
}

async function getUserInfo(userId) {
    
    const request = new Request(`http://localhost:8001/GET/get-users.php?ids=${userId}`);
    const response = await fetch(request);
    const userInfo = await response.json();
    
    return userInfo[0];
}

async function createProfileHeader(userInfo) {
    
    const proPicCont = document.getElementById('profilePic');
    const uNameCont = document.getElementById('usernameDiv');
    const followersCont = document.getElementById('followers');
    const followingCont = document.getElementById('following');

    let username = userInfo.username.toLowerCase();

    let profilePic = document.createElement('img');

    // vi behöver ett url här va
    profilePic.src = `http://localhost:8001${userInfo.profile_picture.filepath}`;
    
    let followers = userInfo.followers;
    let following = userInfo.following;
    let nrOffFollowers = followers.length;
    let nrOffFollowing = following.length;

    proPicCont.append(profilePic);
    uNameCont.append('@' + username);
    followersCont.append(nrOffFollowers);
    followingCont.append(nrOffFollowing);

}

async function getActivityInfo(userId) {


}

