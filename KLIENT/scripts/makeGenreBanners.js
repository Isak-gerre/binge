// Kallar på get-genres.php
// som returnerar URL till bild, genre
// Skapa element + appenda dem

"use strict";

let colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC'
];



async function makeGenreBanner(genre){
    let genres = await getGenres();
    console.log(genres);

    //create elements
    let genreBanner = document.createElement('div');
    let divider = document.createElement('div');
    let genreName = document.createElement('p');

    //classes
    genreBanner.className = "movieBanner";
    divider.className = "titleDiv";
    genreName.className = "genreName";

    
    //content
    genreName.textContent= genre.name;
    genreBanner.style.backgroundColor = colorArray[Math.floor(Math.random() * colorArray.length)];


    //append
    genreBanner.append(genreName);
    genreBanner.append(divider);
    document.getElementById("wrapper").append(genreBanner);

    return genres;
}

makeGenreBanner('horror');

// genres.forEach(genre => {
//     makeGenreBanner(genre);
// });


