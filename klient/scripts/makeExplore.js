"user strict";

const loggedInUserId = getLoggedInUserID();

if (getParamFromUrl("movieID")) {
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
  executeFriendsActivities(loggedInUserId);

  //GENRED
  makeGenreBanner();
}

if (getParamFromUrl("scroll")) {
  console.log(getParamFromUrl("scroll"));
  window.scrollTo(0, getParamFromUrl("scroll"));
}
