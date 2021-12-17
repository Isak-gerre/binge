// Hämta data om filmen från SESSIONSTORAGE
// SKAPA hela sidan
// 1. MOVIE description (including buttons)
// 2. Streaming Services (Kalla på endpoint - skicka med
// movieID)
// 3. Cast + Directory (Kalla på endpoint - skicka med
// movieID) kolla vilka streaming tjänster som användaren har
// 4. Hämtar reviews från get-activitys.php
// 5. Similar Movies (Kalla på endpoint - skicka me MovieID)

// Kolla om användaren har gjort en aktivitet först,
// hämta data om info gällande aktiviterna genom
// check-movie-user-relation.php som returnerar true/false/obj
// Klickevent på knapparna:
// 1. Watched: skickar till servern
// 2. Watch later: skickar till servern
// 3. Review: skickar till servern

/*

makeMovieProfile([movieID]){

}

*/

"use strict";

// Variabler för den inloggade?
let loggedInUser = 4;
let movieID = 35;


async function makeMovieProfile(movieID) {

    let overlay = document.getElementById("overlay");
    overlay.style.minHeight = "100vh";
    let data = await getMovieInfo(movieID);
    let movieInfo = data.message;
    // console.log(movieInfo);

    // TOP
    let movieHeader = document.createElement("div");
    movieHeader.className = "movie-profile-header";

    // Backdrop - Isak
    let backdrop = document.createElement("img");
    backdrop.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["backdrop_path"]}`);
    backdrop.className = "movie-profile-backdrop";

    // --INFO Divs
    // infoPoster & infoText
    let info = document.createElement("div");
    info.className = "movie-profile-info";

    // info > Poster
    let infoPoster = document.createElement("div");
    infoPoster.className = "movie-profile-info-poster";

    // info > Title, Buttons, Release, Rating, Runtime

    let infoText = document.createElement("div");
    infoText.className = "movie-profile-info-text";

    // Poster - Isak
    let poster = document.createElement("img");
    poster.setAttribute("src", `https://image.tmdb.org/t/p/w500${movieInfo["poster_path"]}`);
    poster.className = "movie-profile-poster";

    // Title - Isak
    let title = document.createElement("h3");
    title.textContent = movieInfo.title;
    title.className = "movie-profile-title";

    // Buttons - Niklas
    let buttons = document.createElement("div");
    buttons.setAttribute("id", "movie-profile-buttons");

    let relation = await getButtonRealtionStatus(loggedInUser, movieID);

    let watchList = document.createElement("button");
    watchList.className = "watched button";
    watchList.textContent = "watched";

    let watchLater = document.createElement("button");
    watchLater.className = "watch-later button";
    watchLater.textContent ="watch later";

    let review = document.createElement("button");
    review.className = "review button";
    review.textContent = "review";

    if(relation.watchlist == true){
        watchList.classList.add = "marked";
    } 
    if(relation.watchLater == true){
        watchLater.classList.add = "marked";
    } 
    if(relation.review !== false){
        review.textContent = "update review";
    }

    // Runtime, Rating & Release date - Isak
    let movieRsDiv = document.createElement("div");
    let movieRs = document.createElement("p");
    movieRs.textContent = `${movieInfo["vote_average"]} | ${movieInfo["release_date"]} | ${movieInfo["runtime"]} min`;

    // MIDDLE
    let middle = document.createElement("div");
    middle.className = "movie-profile-middle";

    // Description - Isak
    let description = document.createElement("div");
    description.className = "movie-profile-description";
    description.innerHTML = `
    <p>${movieInfo.overview}</p>
    `;

    // Streaming Services - Isak
    let streamingservices = document.createElement("div");
    streamingservices.className = "movie-profile-streamingservices";
    let streamingservicesText = document.createElement("h4");
    streamingservicesText.textContent = "Streaming Services";
    streamingservicesText.className = "streaming-services-text";

    let streamingservicesGrid = document.createElement("div");
    streamingservicesGrid.className = "movie-profile-streaming-services-grid";
    let allProviders = await getProviders();
    let providers = allProviders.message.providers;
    providers.forEach((provider) => {
        let providerDiv = document.createElement("img");
        providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w500${provider["logo_path"]}`);
        streamingservicesGrid.append(providerDiv);
    });

    // Credits - Niklas
    let credits = document.createElement("div");
    credits.className = "movie-profile-credits";
    
    let creditsData = await getCredits(movieID);

    // Cast - Niklas
    let cast = document.createElement("div");
    cast.className = "movie-profile-cast";

    for (let i = 0; i < 5; i++) {
        let castMember = createCreditDiv(creditsData.message.credits.cast[i]);
        cast.append(castMember);
    }

    // Directors - Niklas
    let director = document.createElement("div");
    director.className = "movie-profile-director";

    creditsData.message.credits.crew.forEach((crewMember) => {
        if(crewMember.job == "Director"){
            let crew = createCreditDiv(crewMember);
            director.append(crew);
        }
    })

    function createCreditDiv(person){
        let productionPeople = document.createElement("div");
        productionPeople.className = "production-people";

        let image = document.createElement("img");
        image.setAttribute("src", `https://image.tmdb.org/t/p/w500/${person.profile_path}`);

        let name = document.createElement("p");
        name.textContent = person.name

        productionPeople.append(image, name)
        return productionPeople;
    }

    // Reviews - Isak VÄNTAR PÅ FEED
    let reviews = document.createElement("div");
    reviews.className = "movie-profile-reviews";

    // Similar Movies - Niklas
    let similarMovies = document.createElement("div");
    similarMovies.className = "movie-profile-similarMovies";

    let similar = await getSimilar(movieID);

    await similar.message.results.forEach(async function (simMovie){
        let movie = await makeMovieBanner(simMovie.id);
        similarMovies.append(movie);
    })

    // APPENDS
    movieRsDiv.append(movieRs);
    movieHeader.append(backdrop);
    infoPoster.append(poster);
    infoText.append(movieRs, title, buttons);
    info.append(infoPoster, infoText);

    streamingservices.append(streamingservicesText);
    streamingservices.append(streamingservicesGrid);
    credits.append(cast, director);
    middle.append(description, streamingservices, credits, reviews, similarMovies);

    overlay.append(movieHeader, info, middle);


    
    buttons.append(review, watchLater, watchList);

    // Event for the buttons

    review.addEventListener("click", (e) => {
        let overlayFade = document.createElement("div");
        overlayFade.setAttribute("id", "overlay-fade");
        let messageWrapper = document.createElement("div");
        messageWrapper.setAttribute("id", "message-wrapper");
        // Position 
        overlayFade.style.top = "0";
        messageWrapper.style.top = "0";
        let object = e.target.className;
        // Content depending on what button is clicked
        if(object.includes("review")){
            // Top Div - 
            let topDiv = document.createElement("div");
            topDiv.className = "top";
            let exitButton = document.createElement("img");
            exitButton.className = "exit button";
            exitButton.setAttribute("src", "../icons/exit.svg");
            let title = document.createElement("h1");
            title.className = "titleComment";
            title.textContent = "Leave a review";
            
            // Middle Div -
            let middleDiv = document.createElement("div");
            middleDiv.className = "middle";

            // FORM
            let form = document.createElement("form");

            // Rating
            let labelRating = document.createElement("label");
            labelRating.textContent = "rating-comment";

            let stars = document.createElement("ul");

            for (let i = 0; i < 5; i++) {
                let star = document.createElement("")
            }

            // Comment
            let labelComment = document.createElement("label");
            labelComment.textContent = "label-comment";
            let input = document.createElement("input");
            input.setAttribute("type", "text-area");
            input.setAttribute("name", "comment");
            input.classname = "comment";
            input.value = relation.review.comment;

            // Submit-button
            let submitButton = document.createElement("button");
            submitButton.setAttribute("type", "submit");
            submitButton.className = "submit button";
            submitButton.textContent = "Submit";
            
            topDiv.append(exitButton, title);
            middleDiv.append();
            form.append(label, input);
            messageWrapper.append(topDiv, middleDiv, form, submitButton);
            
        };
        
        overlayFade.append(messageWrapper);
        overlay.append(overlayFade);

        // exit click
        document.querySelector(".exit").addEventListener("click", () => {
            overlayFade.remove();
        })

        // star click
        // const container = document.querySelector(".rating");
        // const stars = container.querySelectorAll(".rating-stars");
        // container.addEventListener("click", (e) => {
        //     const elClass = e.target.classList;
        //     if (!elClass.contains("active")){
        //         stars.forEach( item => item.classList.remove("active"));
        //     } 
        //     elClass.add(".active");
        // });

        // submit click

            
    });
    
}


makeMovieProfile(movieID);
