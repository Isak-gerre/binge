"user strict";

const userID = getLoggedInUserID();

if(getParamFromUrl("movieID")){
    document.querySelector("#wrapper").innerHTML = "";
    makeMovieProfile(getParamFromUrl("movieID"));
} else {

    //SLIDESHOW
    makeTrending();
    setInterval(() => {
        if (loaded) {
            slide();
            loaded = false;
        }
    }, 1000);

    //FRIENDS RECENTLY WATCHED
    executeFriendsActivities(userID);

    //GENRED
    makeGenreBanner();



}