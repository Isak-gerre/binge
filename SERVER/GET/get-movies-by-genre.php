<?php
require_once "../access-control.php";
require_once "../functions.php";


$method = $_SERVER["REQUEST_METHOD"];



// Gets movies by genre
function getMoviesByGenres($api_key)
{

    //Get genres
    $genres = "http://api.themoviedb.org/3/genre/movie/list?api_key=$api_key&language=en-US";
    $data = json_decode(file_get_contents($genres), true);

    $firstKeyword = [];
    foreach ($data["genres"] as $genre) {
        $genreName = $genre["name"];

        //Find keywords connected to the genre name
        $searchKeyword = "http://api.themoviedb.org/3/search/keyword?api_key=$api_key&query=$genreName&page=1";
        $firstData =  json_decode(file_get_contents($searchKeyword), true);

        //Change keyword if it has a space between the words
        if ($genreName == "Science Fiction") {
            $firstKeyword[] = [
                "name" => "sci-fi",
                "id" => 9950
            ];
        } elseif ($genreName === "TV Movie") {
            $firstKeyword[] = [
                "name" => "tv",
                "id" => 10770
            ];
        } else {
            //else get a result
            $firstKeyword[] = $firstData["results"][1];
        }
    }

    $key = [];
    foreach ($firstKeyword as $keyword) {
        //find movies with the keyword
        $keywordID = $keyword["id"];

        $getMovieByKeyword = "http://api.themoviedb.org/3/keyword/$keywordID/movies?api_key=$api_key&language=en-US&include_adult=false";

        $jsonData = json_decode(file_get_contents($getMovieByKeyword), true);
        $key[] = $jsonData;
    }


    sendJSON($key);
}


if ($method == "GET") {

    if (isset($_GET["genre"])) {
        $genre = $_GET["genre"];

        getMoviesByGenres($api_key);
    }
} else {

    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
}
