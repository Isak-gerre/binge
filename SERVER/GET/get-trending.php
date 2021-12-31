<?php
/*
    Kontaktat TMDB och hämtar trending
    movies, sedan skickar tillbaka dem.

    getTrending(){
        
    }
*/

include_once "../access-control.php";
include_once "../functions.php";

// Kontrollerar metod
checkMethod("GET");

// Hämtar trending från TMDB
$page = 1;
if (isset($_GET["page"])) {
    $page = $_GET["page"];
}
$trendingMovies = getTrending($page);

// Om hämtningen från TMDB inte fungerade skickas ett felmeddelande till klienten
if (isset($trendingMovies["success"]) && $trendingMovies["success"] == false) {
    sendJSON(
        ["message" => "Something went wrong"],
        400
    );
}

// Skickar trendingMovies (20st) till klient
sendJSON($trendingMovies);

function getTrending($page)
{
    $url = "http://api.themoviedb.org/3/trending/movie/week?api_key=f5c0e0db147d0e6434391f3ff153b6a8&page=$page";
    $data = file_get_contents($url, true);

    if ($data === false) {
        sendJSON(
            ["message" => "Something went wrong"],
            400
        );
    }

    $json = (array) json_decode($data);

    return $json["results"];
}
