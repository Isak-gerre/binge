<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];

// Get a list of all genres
function getGenres($api_key)
{
    $url = "http://api.themoviedb.org/3/genre/movie/list?api_key=$api_key&language=en-US";
    $data = json_decode(file_get_contents($url), true);
    sendJSON($data);
}

if ($method == "GET") {
    getGenres($api_key);
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
}
?>

<!-- 
    1. Hämta alla genrer från TMDB
    2. Get med en query för varje genre,
    plockar ut URL för bilden
    5. Returnerar genre plus URL till bilden
 -->