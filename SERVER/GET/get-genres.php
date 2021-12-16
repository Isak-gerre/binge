<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];

// Get a list of all genres
function getGenres() {
    $url = 'http://api.themoviedb.org/3/genre/movie/list?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US';
    $data = json_decode(file_get_contents($url), true);
    sendJSON($data);
}

if($method == "GET") {
    getGenres();
} else {
    sendJSON(
        ["message" => "Method not allowed"], 400
    );
}
?>

<!-- 
    1. Hämta alla genrer från TMDB
    2. Get med en query för varje genre,
    plockar ut URL för bilden
    5. Returnerar genre plus URL till bilden
 -->
