<?php
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit();
}

// Alla är vällkommna
header("Access-Control-Allow-Origin: *");

function send($data, $statusCode = 200)
{
    header("Content-Type: application/json");
    http_response_code($statusCode);
    $json = json_encode($data);
    echo $json;
    exit();
}


// The URL that we want to GET.
$url = 'https://api.themoviedb.org/3/movie/550?api_key=f5c0e0db147d0e6434391f3ff153b6a8';

//Use file_get_contents to GET the URL in question.
$contents = file_get_contents($url);

//If $contents is not a boolean FALSE value.
if ($contents !== false) {
    //Print out the contents.
    send(
        ["message" => json_decode($contents, true)]
    );
}
