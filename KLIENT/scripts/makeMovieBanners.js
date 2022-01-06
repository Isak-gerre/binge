// Hämta filmbild + titel
// skapa element
// returnera det.

"use strict";

async function makeMovieBanner(movieID, activity) {

  let movieInfo = await getMovieInfo(movieID);

  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner";

  let movieImgPath = ``;

  if (movieInfo.message["poster_path"] == null) {
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["backdrop_path"]}')`;
  } else {
    movieImgPath = `url('https://image.tmdb.org/t/p/w500/${movieInfo.message["poster_path"]}')`;
  }

  //the background image
  movieBanner.style.backgroundImage = movieImgPath;

  if (window.location.search === "") {
    movieBanner.setAttribute("data-long-press-delay", "500");

    movieBanner.addEventListener("long-press", (e) => {
      e.preventDefault();

      // All movieBanners
      let allMovieBanner = document.querySelectorAll(".movieBanner");
  

      zoomIn(allMovieBanner, e);

      // Prevent scrolling
      document.body.style.overflow = "hidden";

      // Click-event på föräldern 
      let wrapper = document.querySelector("#profileWrapper");
      wrapper.addEventListener("click", () => {
        zoomOut(allMovieBanner);
      });

      // Options för vad du kan göra med den
      let options = document.createElement("div");
      options.className = "options";

      // Marked as watched - button
      let markedAsWatched = document.createElement("button");
      markedAsWatched.textContent = "Marked as watched";
      markedAsWatched.className = "button";

      markedAsWatched.addEventListener("click", (event) => {
        event.stopPropagation();

        // Här skickas den ändrade aktiviteten för att ändras.
        // Typ till watched och updatera datum

        let focusedMovie = document.querySelector(".zoomIn");

        deleteteActivity(activity.id);
        postNewActivity(activity.movieID, activity.userID, "watched");
      
        // Styles på den
        zoomOut(allMovieBanner);
        disappearingOfActivity(focusedMovie);

        let message = "You have successfully marked the movie as watched";
        setTimeout(() => {
          messageToUser(message);
        }, 1000)
      });

      // Remove from list - button
      let removeFromList = document.createElement("button");
      removeFromList.textContent = "Remove from list";
      removeFromList.className = "button";

      removeFromList.addEventListener("click", (event) => {
        event.stopPropagation();
        // Denna knappen ska radera den från aktiviteten och griden
        // deleteteActivity(activity.id);
        
        let focusedMovie = document.querySelector(".zoomIn");

        zoomOut(allMovieBanner);
        disappearingOfActivity(focusedMovie);

        let message = "You have succesfully delted this from your watchlist";
        setTimeout(() => {
          messageToUser(message);
        }, 1000)
      })

      // En delay på när knapparna skapas.
      options.append(markedAsWatched, removeFromList);
      setTimeout(() => {
        e.target.append(options);
      }, 1000);

      // Transition funktioner
      function zoomOut(allMovieBanner) {
        document.body.style.overflow = "visible";

        if(document.querySelector(".options")){
          document.querySelector(".options").remove();
        }

        allMovieBanner.forEach((movBan) => {
          if (movBan.className == "movieBanner"){
            movBan.style.filter = "blur(0px)";
            movBan.style.pointerEvents = 'auto';
          } else {
            movBan.className = "movieBanner";
          }
        })
      }

      function zoomIn(allMovieBanner, e) {

        // Prevent scrolling
        document.body.style.overflow = "hidden";

        e.target.className += " zoomIn";

        allMovieBanner.forEach((movBan) => {
          if (movBan.className == "movieBanner"){
            movBan.style.filter = "blur(8px)"; 
            movBan.style.pointerEvents = 'none';
          }
        });
      }

      function disappearingOfActivity(movie){
        movie.style.animation = "fadeOut 1.5s";
        setTimeout(() => {
          movie.remove();
        }, 1500);
      }

      function messageToUser(message){
        let messageDOM = document.createElement("div");
        messageDOM.className = "messageToUser";
        

        let p = document.createElement("p");
        p.textContent = message;

        messageDOM.append(p);
        messageDOM.style.animation = "fadeIn 1s";
        document.body.append(messageDOM);
        
        setTimeout(() => {
          messageDOM.style.animation = "fadeOut 1s";
          setTimeout(() => {
            messageDOM.remove();
          }, 1000)
        }, 2000)
      }

    });
  }

  //send to movieProfile
  movieBanner.addEventListener("click", (e) => {
    e.stopPropagation();
    goToPageAndAddToState(`explore.php?movieID=${movieID}`);
  });

  return movieBanner;
}

function makePlaceholderMovieBanner() {
  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner placeholder";

  return movieBanner;
}

function makeMovieBannerFromMovie(movie) {
  //create elements
  let movieBanner = document.createElement("div");

  //classes
  movieBanner.className = "movieBanner";

  //content
  movieBanner.style.backgroundImage = `url('https://image.tmdb.org/t/p/w500/${movie["poster_path"]}')`;

  // send to movieProfile
  movieBanner.addEventListener("click", () => {
    let input = document.getElementById("searchField").value;
    let searchBy = document.querySelector(".active").textContent;
    let search = makeSearchState(input, searchBy);
    goToPageAndAddToState(`explore.php?movieID=${movie.id}`, search);
  });

  //return it
  return movieBanner;
}

// makeMovieBanner(550);
// makeMovieBanner(123);
// makeMovieBanner(321);
