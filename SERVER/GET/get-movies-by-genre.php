<?php
require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];

// Gets movies by genre
function getMoviesByGenres($genre) {
    $page1 = "http://api.themoviedb.org/3/discover/movie?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language&language=en-US&sort_by=popularity.desc&with_genres=$genre&page=1";
    $page2 = "http://api.themoviedb.org/3/discover/movie?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language&language=en-US&sort_by=popularity.desc&with_genres=$genre&page=2";

    $dataPage1 = file_get_contents($page1);
    $dataPage2 = file_get_contents($page2);

    $allPages = [
        "page1" => json_decode($dataPage1, true),
        "page2" => json_decode($dataPage2, true)
    ];

    sendJSON($allPages);
}

if($method == "GET") {

    if(isset($_GET["genre"])) {
        $genre = $_GET["genre"];

        getMoviesByGenres($genre);
    }

} else {

    sendJSON(
        ["message" => "Method not allowed"], 400
    );
}
