/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = 'all';


async function searchFunction(){
    let input = document.getElementById('searchField');

    if (input.value !== '') {
        let searchResults = await getSearchResults(searchType, input.value);
        let movieList = document.querySelector('.movieList');
        movieList.innerHTML = '';
        // console.log(searchResults);

        searchResults.results.forEach(async function(result){
            // getMovieDOMElement(result);
            
            let movieBanner = await makeMovieBanner(result.id);
            movieBanner.classList.add(input.value);
            movieList.append(movieBanner);
        });
    }
}

function makeSearchOverlay(){
    let searchOverlay = document.createElement('div');
    let movieList = document.createElement('div');
    let pillsDiv = document.createElement('div');
    let pillMovie = document.createElement('div');
    let pillCast = document.createElement('div');


    searchOverlay.className = "searchOverlay";
    movieList.className = "movieList";
    pillsDiv.className = "pillsDiv";
    pillMovie.className = "pill pillMovie";
    pillCast.className = "pill pillCast";

    // searchOverlay.innerHTML = 'search by:'
    pillsDiv.innerHTML = 'search by:'
    pillMovie.innerHTML = 'Movies'
    pillCast.innerHTML = 'Cast'

    searchOverlay.prepend(pillsDiv);
    pillsDiv.append(pillMovie, pillCast);
    searchOverlay.append(movieList);
    document.getElementById('wrapper').append(searchOverlay);


    pillMovie.addEventListener('click', () => {
        searchType = 'movie';
        pillMovie.classList.toggle('filtered');
    })

    pillCast.addEventListener('click', () => {
        searchType = 'cast';
        pillCast.classList.toggle('filtered');
    })

}