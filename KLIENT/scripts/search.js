/*

Fetch all relevant keys and display them
Add filter that actiate on button press

*/

let searchType = 'all';


async function searchFunction(){
    let input = document.getElementById('searchField');

    if (input.value !== '') {
        let searchResults = await getSearchResults(searchType, input.value);
        // console.log(searchResults);

        searchResults.results.forEach(result => {
            //Kalla på get movie banner?
            //Ska denna göras inuti denna funktion som kallas på keyup?
            //Dumt att göra en foreach här i?
            console.log(result.name);
        });
    }
}

function makeSearchOverlay(){
    let searchOverlay = document.createElement('div');
    let pillsDiv = document.createElement('div');
    let pillMovie = document.createElement('div');
    let pillCast = document.createElement('div');


    searchOverlay.className = "searchOverlay";

    pillsDiv.className = "pillsDiv";
    pillMovie.className = "pill pillMovie";
    pillCast.className = "pill pillCast";

    // searchOverlay.innerHTML = 'search by:'
    pillsDiv.innerHTML = 'search by:'
    pillMovie.innerHTML = 'Movies'
    pillCast.innerHTML = 'Cast'

    searchOverlay.append(pillsDiv);
    pillsDiv.append(pillMovie, pillCast);
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