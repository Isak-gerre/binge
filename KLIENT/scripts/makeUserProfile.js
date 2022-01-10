"use strict";

// Inloggad användare
const loggedInUserId = getLoggedInUserID();

// Fasta html-variabler
const body = document.querySelector("body");

const proPicCont = document.getElementById("profilePic");
const uNameCont = document.getElementById("username");
const settingOrPlus = document.getElementById("settingOrPlus");
const followersDiv = document.getElementById("followersDiv");
const followingDiv = document.getElementById("followingDiv");
const followersCont = document.getElementById("followers");
const followingCont = document.getElementById("following");

const watchedBtn = document.getElementById("watched");
const watchlistBtn = document.getElementById("watchlist");
const statsBtn = document.getElementById("stats");

const wrapper = document.getElementById("profileWrapper");

createProfilePage();

// Funktion som skapar hela sidan
async function createProfilePage() {
    // Hämtar info om inloggad användare
    const loggedInUserInfo = await getUserInfo(loggedInUserId);

    // Hämtar id från url, ger 'null' om det inte finns
    let urlUserId = getParamFromUrl("userID");

    // Kontrollerar om id i url är samma som inloggad
    if (loggedInUserId == urlUserId) {
        window.location.href = "profile.php";
    }

    // Om id i url finns ska profilsida för andra laddas
    if (urlUserId !== null) {
        let userInfo = await getUserInfo(urlUserId);

        let loggedInUserFollow = loggedInUserInfo.following;
        let following = loggedInUserFollow.some((e) => e == urlUserId);

        createProfileHeader(userInfo, following);
        profileNav(urlUserId, userInfo.firstname);

    } else {
        createProfileHeader(loggedInUserInfo, null, true);
        profileNav(loggedInUserId);
    }
}

async function sortActivities(userId, whatActivities) {
    let allUserActivities = await getAllActivites(userId);
    let watchedActivities = [];
    let watchlist = [];

    allUserActivities.forEach((obj) => {
        if (obj.type == "watchlist") {
            watchlist.push(obj);
        } else {
            watchedActivities.push(obj);
        }
    });

    if (whatActivities == "watched") {
        return watchedActivities;
    } else if (whatActivities == "watchlist") {
        return watchlist;
    }
}

async function profileNav(userId, name = null) {

    if (getParamFromUrl("watchlist")) {
        watchlistBtn.classList.add("selected");
        let watchlist = await sortActivities(userId, "watchlist");
        createWatchlist(watchlist, "myProfile");
    } else {
        watchedBtn.classList.add("selected");
        let watchedActivities = await sortActivities(userId, "watched");
        wrapper.innerHTML = "";

        if (name != null && watchedActivities.length < 1) {
            noActivitiesInfo('watched', name);
        } else if (watchedActivities.length < 1) {
            noActivitiesInfo('watched');
        } else {
            let activities = watchedActivities.sort((a, b) => b.date - a.date);
            makeShowMoreForActis(makeShowMoreForActis, 'profile', "#profileWrapper", activities, 1);
        }
    }

    watchedBtn.addEventListener("click", async function () {
        let watchedActivities = await sortActivities(userId, "watched");

        if (watchedBtn.className !== "selected") {
            wrapper.innerHTML = "";
            document.querySelector(".selected").classList.remove("selected");
            watchedBtn.classList.add("selected");

            if (watchedActivities.length < 1) {
                noActivitiesInfo("watched", name);
            } else {
                if (userId == loggedInUserId) {
                    let activities = watchedActivities.sort((a, b) => b.date - a.date);
                    makeShowMoreForActis(makeShowMoreForActis, 'myProfile', "#profileWrapper", activities, 1);

                } else {
                    let activities = watchedActivities.sort((a, b) => b.date - a.date);
                    makeShowMoreForActis(makeShowMoreForActis, 'profile', "#profileWrapper", activities, 1);
                }
            }
        }
    });


    watchlistBtn.addEventListener("click", async function () {
        let watchlist = await sortActivities(userId, "watchlist");

        if (watchlistBtn.className !== "selected") {
            wrapper.innerHTML = "";
            document.querySelector(".selected").classList.remove("selected");
            watchlistBtn.classList.add("selected");

            if (watchlist.length < 1) {
                noActivitiesInfo("watchlist", name);
            } else {
                if (userId == loggedInUserId) {
                    createWatchlist(watchlist, "myProfile");
                } else {
                    createWatchlist(watchlist);
                }
            }
        }
    });

    statsBtn.addEventListener("click", async function () {
        let watchedActivities = await sortActivities(userId, "watched");
        if (statsBtn.className !== "selected") {
            wrapper.innerHTML = "";
            document.querySelector(".selected").classList.remove("selected");
            statsBtn.classList.add("selected");

            if (watchedActivities.length < 1) {
                noActivitiesInfo("stats", name);
            } else {
                renderChart(userId, name);
            }
        }
    });
}

async function createProfileHeader(user, isFollowing, settings = null) {
    let username = user.username.toLowerCase();
    if (username.length > 7) {
        uNameCont.textContent = `@${user.username.substring(0, 7)}...`;
    } else {
        uNameCont.textContent = "@" + user.username;
    }

    // vi behöver ett url här va
    proPicCont.style.backgroundImage = `url("http://localhost:7001/${user.profile_picture.filepath}")`;
    proPicCont.style.backgroundSize = "cover";

    let followers = user.followers;
    let following = user.following;
    let nrOfFollowers = followers.length;
    let nrOfFollowing = following.length;

    let profileButtonText = document.createElement("p");
    let profileButtonIcon = document.createElement("img");

    if (isFollowing !== null) {
        if (isFollowing) {
            profileButtonText.textContent = "Unfollow";
            settingOrPlus.classList.add("unfollow");
            profileButtonIcon.src = "../icons/remove_circle_black.svg";
            profileButtonIcon.id = "unfollow";
        } else if (!isFollowing) {
            profileButtonText.textContent = "Follow";
            settingOrPlus.classList.add("follow");
            profileButtonIcon.src = "../icons/add_circle_black.svg";
            profileButtonIcon.id = "follow";
        }
    }

    if (settings == true) {
        profileButtonText.textContent = 'Edit';
        profileButtonIcon.src = '../icons/settings_black.svg';
        profileButtonIcon.id = 'settings';
        settingOrPlus.style.flexBasis = "70px";
        settingOrPlus.classList.add("follow");
    }

    settingOrPlus.addEventListener("click", async function () {
        let userId = user.id;

        if (profileButtonIcon.id == "unfollow") {
            settingOrPlus.classList.add("follow");
            settingOrPlus.classList.remove("unfollow");

            profileButtonText.textContent = "Follow";
            profileButtonIcon.id = "follow";
            isFollowing = false;

            profileButtonIcon.src = "../icons/add_circle_black.svg";
            let userIndex = followers.findIndex((id) => id == loggedInUserId);
            followers.splice(userIndex, 1);

            await followPatch(loggedInUserId, userId);

            nrOfFollowers -= 1;
            followersCont.textContent = nrOfFollowers;
        } else if (profileButtonIcon.id == "follow") {
            settingOrPlus.classList.remove("follow");

            settingOrPlus.classList.add("unfollow");

            profileButtonText.textContent = "Unfollow";
            profileButtonIcon.id = "unfollow";
            isFollowing = true;

            profileButtonIcon.src = "../icons/remove_circle_black.svg";
            followers.push(loggedInUserId);

            await followPatch(loggedInUserId, user.id);

            nrOfFollowers += 1;
            followersCont.textContent = nrOfFollowers;

        } else if (profileButtonIcon.id == "settings") {
            let settingsWindow = await openSettings(userId);
            body.prepend(settingsWindow);
        }
    });

    followersDiv.addEventListener("click", async function () {
        let closeTab = document.createElement("button");
        closeTab.id = "closeTab";
        closeTab.textContent = "x";
        closeTab.addEventListener("click", () => {
            followContainer.style.left = "100vw";
            setTimeout(() => {
                closeTab.remove();
                followContainer.remove();
            }, 1000);
        });

        let followContainer = await showUsers(user.id, "followers");
        followContainer.prepend(closeTab);
        body.prepend(followContainer);
    });

    followingDiv.addEventListener("click", async function () {
        let closeTab = document.createElement("button");
        closeTab.id = "closeTab";
        closeTab.textContent = "x";
        closeTab.addEventListener("click", () => {
            followContainer.style.left = "100vw";
            setTimeout(() => {
                closeTab.remove();
                followContainer.remove();
            }, 1000);
        });

        let followContainer = await showUsers(user.id, "following");
        followContainer.prepend(closeTab);
        body.prepend(followContainer);
    });

    settingOrPlus.append(profileButtonText, profileButtonIcon);
    followersCont.append(nrOfFollowers);
    followingCont.append(nrOfFollowing);
}

// Öppnar en sida som visar alla followers/following
async function showUsers(userId, type) {
    let userInfo = await getUserInfo(userId);

    let ids = [];
    if (type == "followers") {
        ids = userInfo.followers;
    } else if (type == "following") {
        ids = userInfo.following;
    }

    let following = userInfo.following;

    let usersInfo = await Promise.all(ids.map((id) => getUserInfo(id)));
    usersInfo.sort((a, b) => (a.username > b.username ? 1 : -1));

    let followContainer = document.createElement("div");
    followContainer.id = "followContainer";
    setTimeout(() => {
        followContainer.style.left = 0;
    }, 50);

    let usersWrapper = document.createElement("div");
    usersWrapper.id = "usersWrapper";

    usersInfo.forEach((user) => {
        let userDiv = document.createElement("div");
        userDiv.id = "userDiv";
        let username = document.createElement("p");
        if (username.length > 10) {
            username.textContent = `@${user.username.substring(0, 10)}...`;
        } else {
            username.textContent = "@" + user.username;
        }

        let userProfilePic = document.createElement("div");
        userProfilePic.className = 'userProfilePic';
        userProfilePic.style.backgroundImage = `url('http://localhost:7001/${user.profile_picture.filepath}')`;
        userProfilePic.style.backgroundSize = 'cover';


        username.addEventListener("click", () => {
            window.location.href = `profile.php?userID=${user.id}`;
        });
        userProfilePic.addEventListener("click", () => {
            window.location.href = `profile.php?userID=${user.id}`;
        });

        let followOrUnfollow = document.createElement("button");

        let userFollowers = user.followers;

        // Kontrollerar om användaren följs av inloggad anvöndare
        let isFollowed = userFollowers.some((e) => e == loggedInUserId);

        // Beroende på om användaren följs av inloggad anv. eller ej visas olika texter
        if (isFollowed) {
            followOrUnfollow.classList.add("unfollow");
            followOrUnfollow.innerHTML =
                `<p>Unfollow</p>
                <img src="../icons/remove_circle_black.svg" id="unfollow"> `;

        } else if (!isFollowed) {
            followOrUnfollow.classList.add("follow");
            followOrUnfollow.innerHTML =
                `<p>Follow</p>
            <img src="../icons/add_circle_black.svg" id="follow">`;
        }

        let followingCont = document.getElementById("following");

        followOrUnfollow.addEventListener("click", async function () {
            // Om inloggad anv. inte följer så..
            if (!isFollowed) {
                isFollowed = true;
                followOrUnfollow.classList.add("unfollow");
                followOrUnfollow.classList.remove("follow");

                followOrUnfollow.innerHTML =
                `<p>Unfollow</p>
            <img src="../icons/remove_circle_black.svg" id="unfollow">`;

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
                followOrUnfollow.classList.add("follow");
                followOrUnfollow.classList.remove("unfollow");
                followOrUnfollow.removeAttribute("id");
                followOrUnfollow.innerHTML =
                `<p>Follow</p>
                <img src="../icons/add_circle_black.svg" id="follow">`;
                // Tar bort från followers
                await followPatch(loggedInUserId, user.id);

                if (userId == loggedInUserId) {
                    let userIndex = ids.findIndex((id) => id == user.id);
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
            let emptyDiv = document.createElement("div");
            userDiv.append(emptyDiv);
        }
    });

    return followContainer;
}

async function createWatchlist(watchlist, page = "profile") {
    let container = document.createElement("div");
    container.id = "watchlistContainer";

    watchlist.forEach(async function (activity) {
        let movieId = activity.movieID;
        let movieBanner = await makeMovieBanner(movieId, activity);
        container.append(movieBanner);
    });

    wrapper.append(container);
}

function noActivitiesInfo(tab, name = null) {
    if (document.getElementById("watchlistContainer")) {
        return;
    }
    let container = document.createElement("div");
    container.id = "messageWhenEmpty";
    let text = document.createElement("p");

    if (name == null) {
        let button = document.createElement("button");
        button.textContent = "Go explore movies";
        button.addEventListener("click", () => {
            window.location.href = "explore.php";
        });

        if (tab == "watched") {
            text.textContent = "You haven't watched any movies!";
        } else if (tab == "watchlist") {
            text.textContent = "You haven't added any movies to your watchlist.";
        } else if (tab == "stats") {
            text.textContent = "No stats since you have no activities on your profile.";
        }
        container.append(text, button);
    } else {
        if (tab == "watched") {
            text.textContent = `${name} haven't watched any movies!`;
        } else if (tab == "watchlist") {
            text.textContent = `${name} haven't added any movies to the watchlist.`;
        } else if (tab == "stats") {
            text.textContent = `No stats since ${name} has no activities.`;
        }

        container.append(text);
    }
    wrapper.append(container);
}