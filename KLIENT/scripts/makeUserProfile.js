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
sessionStorage.setItem('userID', 5)
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

    if (loggedInUserId == urlUserId) {
        window.location.href = "profile.php";
    }

    if (urlUserId !== null) {
        let userInfo = await getUserInfo(urlUserId);

        let loggedInUserFollow = loggedInUserInfo.following;
        let following = loggedInUserFollow.some(e => e == urlUserId);

        createProfileHeader(userInfo, following);
        createProfileFeed(userInfo);
    } else {
        createProfileHeader(loggedInUserInfo, null, true);
        createProfileFeed(loggedInUserInfo);
    }




}

function getUserFromUrl() {
    let getParams = window.location.search;

    const urlParams = new URLSearchParams(getParams);
    const userId = urlParams.get('userID');
    
    return userId
}

async function createProfileHeader(user, isFollowing, settings = null) {
    console.log(user);

    let username = user.username.toLowerCase();
    uNameCont.textContent = "@" + username;
    let profilePic = document.createElement('img');

    // vi behöver ett url här va
    profilePic.src = `http://localhost:7001/${user.profile_picture.filepath}`;
    
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
        let userId = user.id;

        if (profileButton.textContent == "unfollow") {
            isFollowing = false;

            profileButton.textContent = "follow";
            await followPatch(loggedInUserId, userId);

            nrOfFollowers -= 1;
            followersCont.textContent = nrOfFollowers;
            

        } else if (profileButton.textContent == "follow") {
            isFollowing = true;

            profileButton.textContent = "unfollow";
            await followPatch(loggedInUserId, userId);

            nrOfFollowers += 1;
            followersCont.textContent = nrOfFollowers;
            
        } else if (profileButton.textContent == "settings") {
            // openSettings(user.id);
        }
    });

    followersCont.addEventListener('click', async function () {
        await showUsers(followers);
    });

    followingCont.addEventListener('click', async function () {
        await showUsers(following);
    });
    
    proPicCont.append(profilePic);
    settingOrPlus.append(profileButton);
    followersCont.append(nrOfFollowers);
    followingCont.append(nrOfFollowing);

}

async function followPatch(mainUserID, friendsUserID) {

    const response = await fetch(new Request("http://localhost:7001/PATCH/update-user.php", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userID: mainUserID, friendsUserID: friendsUserID})
    }));

    const data = await response;
    console.log(data);
}

function openSettings(userId) {
    console.log(userId);
}

async function showUsers(ids) {
    let usersInfo = await Promise.all(ids.map(id => getUserInfo(id)));
    usersInfo.sort((a, b) => a.username > b.username ? 1 : -1);

    let followContainer = document.createElement('div');
    followContainer.id = "followContainer";
    setTimeout(() => {
        followContainer.style.left = 0;
    }, 50);

    let closeTab = document.createElement('button');
    closeTab.textContent = "x";
    closeTab.addEventListener('click', () => {
        followContainer.style.left = '100vw';
        setTimeout(() => {
            followContainer.remove(); 
        }, 1000);
    })

    followContainer.append(closeTab);

    usersInfo.forEach(user => {
        let userDiv = document.createElement('div');
        let username = document.createElement('p');
        username.textContent = "@" + user.username;

        let userProfilePic = document.createElement('img');
        userProfilePic.src = `http://localhost:8001/${user.profile_picture.filepath}`;

        username.addEventListener('click', () => {
            window.location.href = `profile.php?userID=${user.id}`;
        });

        followContainer.append(userDiv);
        userDiv.append(userProfilePic, username);
    });

    document.querySelector('body').prepend(followContainer);
}

// async function getActivityInfo(userId) {


// }