"user strict";

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

    //GENRED
    makeGenreBanner();


}