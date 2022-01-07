
<?php
require_once "../access-control.php";
require_once "../functions.php";


$method = $_SERVER["REQUEST_METHOD"];



// Gets movies by genre
function getMoviesByGenres($genre, $api_key)
{


    //Change keyword if it has a space between the words
    if ($genre == "Science Fiction") {
        $genre = "sci-fi";
    }

    if ($genre === "TV Movie") {
        $genre = "tv";
    }

    //Find keywords connected to the genre name
    $searchKeyword = "http://api.themoviedb.org/3/search/keyword?api_key=$api_key&query=$genre&page=1";
    $firstData =  json_decode(file_get_contents($searchKeyword), true);

    $movies = [];
    foreach ($firstData["results"] as $keyword) {
        //find movies with the keyword
        $keywordID = $keyword["id"];

        $getMovieByKeyword = "http://api.themoviedb.org/3/keyword/$keywordID/movies?api_key=$api_key&language=en-US&include_adult=false";


        $jsonData = json_decode(file_get_contents($getMovieByKeyword), true);
        foreach ($jsonData["results"] as $movie) {
            $movies[] = $movie;
        }
    };

    sendJSON($movies);
}


if ($method == "GET") {

    if (isset($_GET["genre"])) {
        $genre = $_GET["genre"];

        getMoviesByGenres($genre, $api_key);
    }
} else {

    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
}
