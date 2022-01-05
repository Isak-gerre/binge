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
const loggedInUserId = getLoggedInUserID();

// Fasta html-variabler
const body = document.querySelector('body');

const proPicCont = document.getElementById('profilePic');
const uNameCont = document.getElementById('username');
const settingOrPlus = document.getElementById('settingOrPlus');
const followersCont = document.getElementById('followers');
const followingCont = document.getElementById('following');

const watchedBtn = document.getElementById('watched');
const watchlistBtn = document.getElementById('watchlist');
const statsBtn = document.getElementById('stats');

const wrapper = document.getElementById('profileWrapper');

watchedBtn.click();
createProfilePage();

// Funktion som skapar hela sidan
async function createProfilePage() {
    // Hämtar info om inloggad användare
    const loggedInUserInfo = await getUserInfo(loggedInUserId);
    
    // Hämtar id från url, ger 'null' om det inte finns
    let urlUserId = getParamFromUrl('userID');

    // Kontrollerar om id i url är samma som inloggad
    if (loggedInUserId == urlUserId) {
        window.location.href = "profile.php";
    }

    // Om id i url finns ska profilsida för andra laddas
    if (urlUserId !== null) {
        let userInfo = await getUserInfo(urlUserId);

        let loggedInUserFollow = loggedInUserInfo.following;
        let following = loggedInUserFollow.some(e => e == urlUserId);

        createProfileHeader(userInfo, following);

        let allUserActivities = await getAllActivites(urlUserId);
        let watchedActivities = [];
        let watchlist = [];

        allUserActivities.forEach(obj => {
            if (obj.type == "watchlist") {
                watchlist.push(obj);
            } else {
                watchedActivities.push(obj);
            }
        });
        
        profileNav(watchedActivities, watchlist, urlUserId, userInfo.firstname);

        if (watchedActivities.length < 1) {
            noActivitiesInfo('watched', userInfo.firstname);
        } else {
            createActivities(watchedActivities, 'profile', "profileWrapper");
        }
        

    } else {
        createProfileHeader(loggedInUserInfo, null, true);

        let allUserActivities = await getAllActivites(loggedInUserId);
        // console.log(allUserActivities);
        let watchedActivities = [];
        let watchlist = [];

        allUserActivities.forEach(obj => {
            if (obj.type == "watchlist") {
                watchlist.push(obj);
            } else {
                watchedActivities.push(obj);
            }
        });

        profileNav(watchedActivities, watchlist, loggedInUserId);
        
        if (watchedActivities.length < 1) {
            noActivitiesInfo('watched');
        } else {
            createActivities(watchedActivities, 'myProfile', "profileWrapper");
        }
    }

}

function profileNav(watchedActivities, watchlist, userId, name = null) {
    watchedBtn.classList.add('selected');
    watchedBtn.addEventListener('click', () => {
        if (watchedBtn.className !== 'selected') {
            wrapper.innerHTML = "";
            document.querySelector('.selected').classList.remove('selected');
            watchedBtn.classList.add('selected');

            if (watchedActivities.length < 1) {
                noActivitiesInfo('watched', name);
            } else {
                if (userId == loggedInUserId) {
                    createActivities(watchedActivities, "myProfile", "profileWrapper");
                } else {
                    createActivities(watchedActivities, "profile", "profileWrapper");
                }
            }
        }
    });

    watchlistBtn.addEventListener('click', () => {
        if (watchlistBtn.className !== 'selected') {
            wrapper.innerHTML = "";
            document.querySelector('.selected').classList.remove('selected');
            watchlistBtn.classList.add('selected');

            if (watchlist.length < 1) {
                noActivitiesInfo('watchlist', name);
            } else {
                if(userId == loggedInUserId) {
                    createWatchlist(watchlist, "myProfile");
                } else {
                    createWatchlist(watchlist);
                }
            }
        }
    });

    statsBtn.addEventListener('click', () => {
        if (statsBtn.className !== 'selected') {
            wrapper.innerHTML = "";
            document.querySelector('.selected').classList.remove('selected');
            statsBtn.classList.add('selected');

            if (watchedActivities.length < 1 && watchlist.length < 1) {
                noActivitiesInfo('stats', name);
            } else {
                renderChart(userId);
            }
        }
    });
}

async function createProfileHeader(user, isFollowing, settings = null) {
    // console.log(user);

    let username = user.username.toLowerCase();
    if (username.length > 7) {
        console.log('bigger');
        uNameCont.textContent = `@${user.username.substring(0, 7)}...`;
    } else {
        console.log('smaller');
        uNameCont.textContent = "@" + user.username;
    }
    // uNameCont.textContent = "@" + username;
    let profilePic = document.createElement('div');

    // vi behöver ett url här va
    profilePic.style.backgroundImage = `url("http://localhost:7001/${user.profile_picture.filepath}")`;
    
    let followers = user.followers;
    let following = user.following;
    let nrOfFollowers = followers.length;
    let nrOfFollowing = following.length;

    let profileButtonText = document.createElement('p');
    let profileButtonIcon = document.createElement('img');

    if (isFollowing !== null) {
        if (isFollowing) {
            profileButtonText.textContent = 'Unfollow';
            profileButtonIcon.src = '../icons/remove_circle_black.svg';
            profileButtonIcon.id = 'unfollow';
        } else if (!isFollowing) {
            profileButtonText.textContent = 'Follow';
            profileButtonIcon.src = '../icons/add_circle_black.svg';
            profileButtonIcon.id = 'follow';
        }   
    }
    
    if (settings == true) {
        profileButtonText.textContent = 'Settings';
        profileButtonIcon.src = '../icons/settings_black.svg';
    }

    settingOrPlus.addEventListener('click', async function () {
        let userId = user.id;

        if (profileButtonIcon.id == 'unfollow') {
            profileButtonText.textContent = 'Follow';
            profileButtonIcon.id = 'follow';
            isFollowing = false;

            profileButtonIcon.src = '../icons/add_circle_black.svg';
            let userIndex = followers.findIndex(id => id == loggedInUserId);
            followers.splice(userIndex, 1);

            await followPatch(loggedInUserId, userId);

            nrOfFollowers -= 1;
            followersCont.textContent = nrOfFollowers;
            

        } else if (profileButtonIcon.id == 'follow') {
            profileButtonText.textContent = 'Unfollow';
            profileButtonIcon.id = 'unfollow';
            isFollowing = true;

            profileButtonIcon.src = '../icons/remove_circle_black.svg';
            followers.push(loggedInUserId);

            await followPatch(loggedInUserId, user.id);

            nrOfFollowers += 1;
            followersCont.textContent = nrOfFollowers;
            
        } else if (profileButtonIcon.textContent == "settings") {
            let settingsWindow = openSettings(user);
            body.prepend(settingsWindow);
        }
    });

    followersCont.addEventListener('click', async function () {
        // console.log(followers)
        let closeTab = document.createElement('button');
        closeTab.id = 'closeTab';
        closeTab.textContent = "x";
        closeTab.addEventListener('click', () => {
            followContainer.style.left = '100vw';
            setTimeout(() => {
                closeTab.remove();
                followContainer.remove(); 
            }, 1000);
        });

        let followContainer = await showUsers(user.id, 'followers');
        followContainer.prepend(closeTab);
        body.prepend(followContainer);
    });

    followingCont.addEventListener('click', async function () {
        let closeTab = document.createElement('button');
        closeTab.id = 'closeTab';
        closeTab.textContent = "x";
        closeTab.addEventListener('click', () => {
            followContainer.style.left = '100vw';
            setTimeout(() => {
                closeTab.remove();
                followContainer.remove(); 
            }, 1000);
        });
        
        let followContainer = await showUsers(user.id, 'following');
        followContainer.prepend(closeTab);
        body.prepend(followContainer);
    });
    
    proPicCont.append(profilePic);
    settingOrPlus.append(profileButtonText, profileButtonIcon);
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
}

// Öppnar en sida som visar alla followers/following
async function showUsers(userId, type) {
    let userInfo = await getUserInfo(userId);

    let ids = [];
    if (type == 'followers') {
        ids = userInfo.followers;
    } else if (type == 'following') {
        ids = userInfo.following;
    }
    
    let following = userInfo.following;

    let usersInfo = await Promise.all(ids.map(id => getUserInfo(id)));
    usersInfo.sort((a, b) => a.username > b.username ? 1 : -1);

    
    let followContainer = document.createElement('div');
    followContainer.id = "followContainer";
    setTimeout(() => {
        followContainer.style.left = 0;
    }, 50);

    let usersWrapper = document.createElement('div');
    usersWrapper.id = 'usersWrapper';
    
    usersInfo.forEach(user => {
        let userDiv = document.createElement('div');
        userDiv.id = "userDiv";
        let username = document.createElement('p');
        if (username.length > 10) {
            console.log('bigger');
            username.textContent = `@${user.username.substring(0, 10)}...`;
        } else {
            console.log('smaller');
            username.textContent = "@" + user.username;
        }

        
        let userProfilePic = document.createElement('img');
        userProfilePic.src = `http://localhost:7001/${user.profile_picture.filepath}`;
        
        username.addEventListener('click', () => {
            window.location.href = `profile.php?userID=${user.id}`;
        });
        userProfilePic.addEventListener('click', () => {
            window.location.href = `profile.php?userID=${user.id}`;
        });
        
        let followOrUnfollow = document.createElement('button');

        let userFollowers = user.followers;

        // Kontrollerar om användaren följs av inloggad anvöndare
        let isFollowed = userFollowers.some(e => e == loggedInUserId);

        // Beroende på om användaren följs av inloggad anv. eller ej visas olika texter
        if (isFollowed) {
            followOrUnfollow.textContent = 'Unfollow';  
            followOrUnfollow.id = "noGradient";
        } else if (!isFollowed) {
            followOrUnfollow.textContent = 'Follow';
        }

        let followingCont = document.getElementById('following');
        
        followOrUnfollow.addEventListener('click',  async function () {
            // Om inloggad anv. inte följer så..
            if (!isFollowed) {
                
                isFollowed = true;
                followOrUnfollow.textContent = 'Unfollow';
                followOrUnfollow.id = "noGradient";
                // Lägger till användare i followers
                await followPatch(loggedInUserId, user.id);

                if (userId == loggedInUserId) {
                    following.push(user.id);
                    followingCont.textContent = ids.length;
                }

                // Om inloggad anv. följer så..
            } else if (isFollowed) {

                isFollowed = false;
                followOrUnfollow.textContent = 'Follow';
                followOrUnfollow.removeAttribute('id');
                // Tar bort från followers
                await followPatch(loggedInUserId, user.id);
                
                if (userId == loggedInUserId) {
                    let userIndex = ids.findIndex(id => id == user.id);
                    following.splice(userIndex, 1);
                    followingCont.textContent = following.length;
                }
            }
            
        });

        followContainer.append(usersWrapper);
        usersWrapper.append(userDiv);
        userDiv.append(userProfilePic, username);
        if (user.id !== loggedInUserId) {
            userDiv.append(followOrUnfollow);
        } else {
            let emptyDiv = document.createElement('div');
            userDiv.append(emptyDiv);
        }
    });

    return followContainer;
}

async function getAllActivites(userId) {
    // console.log(userId);
    let response = await fetch(`http://localhost:7001/GET/get-activities.php?followingIDs=${userId}`);
    let userActivites = await response.json();
    userActivites.sort((a, b) => b.date - a.date);

    return userActivites;
}

async function createWatchlist(watchlist, page = "profile") {
    let container = document.createElement('div');
    container.id = 'watchlistContainer';

    watchlist.forEach(async function (activity) {
        let movieId = activity.movieID;

        let movieBanner = await makeMovieBanner(movieId, page);

        // movieBanner.addEventListener('click', (event) => {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     window.location.href = `explore.php?movieID=${movieId}`;
        // });

        container.append(movieBanner);   
    });
    
    wrapper.append(container);
}

function noActivitiesInfo(tab, name = null) {

    let container = document.createElement('div');
    container.id = "messageWhenEmpty";
    let text = document.createElement('p');
    
    if (name == null) {
        let button = document.createElement('button');
        button.textContent = "Go explore movies";
        button.addEventListener('click', () => {
            window.location.href = "explore.php";
        });

        if (tab == 'watched') {
            text.textContent = "You haven't watched any movies!";
        } else if (tab == 'watchlist') {
            text.textContent = "You haven't added any movies to your watchlist.";
        } else if (tab == 'stats') {
            text.textContent = "No stats since you have no activities on your profile.";
        }
        container.append(text, button);
    } else {
        if (tab == 'watched') {
            text.textContent = `${name} haven't watched any movies!`;
        } else if (tab == 'watchlist') {
            text.textContent = `${name} haven't added any movies to your watchlist.`;
        } else if (tab == 'stats') {
            text.textContent = `No stats since ${name} have no activities.`;
        }

        container.append(text);
    }

    wrapper.append(container);
}