<?php
require_once "../access-control.php";
require_once "../functions.php";


$method = $_SERVER["REQUEST_METHOD"];



// Gets movies by genre
function getMoviesByGenres() {

    $genres = 'http://api.themoviedb.org/3/genre/movie/list?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US';
    $data = json_decode(file_get_contents($genres), true);

    $firstKeyword = [];
    foreach($data["genres"] as $genre) {
        $genreName = $genre["name"];
        
        $searchKeyword = "http://api.themoviedb.org/3/search/keyword?api_key=f5c0e0db147d0e6434391f3ff153b6a8&query=$genreName&page=1";
        $firstData =  json_decode(file_get_contents($searchKeyword), true);
        
        if($genreName == "Science Fiction"){
            $firstKeyword[] = [
                "name"=> "sci-fi",
                "id"=> 9950
            ];
        } elseif($genreName === "TV Movie") {
            $firstKeyword[] = [
                "name"=> "tv",
                "id"=> 10770
            ];
        } else {
            $firstKeyword[] = $firstData["results"][1];
            
        }
    }


    $key = [];
    foreach($firstKeyword as $keyword){

        // inspect($keysword);
        $keywordID = $keyword["id"];
        $getMovieByKeyword = "http://api.themoviedb.org/3/keyword/$keywordID/movies?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&include_adult=false";
        
        $jsonData = json_decode(file_get_contents($getMovieByKeyword), true);
        $key[]= $jsonData;
    }

    // inspect($key);


    // inspect($key);
    $jsonData =  json_decode(file_get_contents($getMovieByKeyword), true);
    sendJSON($key);

}

getMoviesByGenres();


if($method == "GET") {

    if(isset($_GET["genre"])) {
        $genre = $_GET["genre"];

        getMoviesByGenres();
    }

} else {

    sendJSON(
        ["message" => "Method not allowed"], 400
    );
}
