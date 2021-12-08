<?php
/*
    Kontaktat TMDB och hämtar trending
    movies, sedan skickar tillbaka dem.

    getTrending(){
        
    }
*/

include_once "../functions.php";

// Kontrollerar metod
checkMethod("GET");

// Hämtar trending från TMDB
$trendingMovies = getTrending();

// Om hämtningen från TMDB inte fungerade skickas ett felmeddelande till klienten
if (isset($trendingMovies["success"]) && $trendingMovies["success"] == false) {
    sendJSON(
        ["message" => "Something went wrong"],
        400
    );
}

// Skickar trendingMovies (20st) till klient
sendJSON($trendingMovies);

function getTrending() {
    $url = "https://api.themoviedb.org/3/trending/movie/week?api_key=f5c0e0db147d0e6434391f3ff153b6a8";
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

?>