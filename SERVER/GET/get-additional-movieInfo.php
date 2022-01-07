<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    if (isset($_GET["movieID"])) {
        getAdditionalMovieInfo($api_key);
    } else {
        sendJSON(
            ["message" => "MovieID was not sent"],
            400
        );
    };
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        405
    );
};



function
getAdditionalMovieInfo($api_key)
{
    $movieID = $_GET["movieID"];
    $credits = "http://api.themoviedb.org/3/movie/$movieID/credits?api_key=$api_key";
    $providers = "http://api.themoviedb.org/3/movie/$movieID/watch/providers?api_key=$api_key";

    //Use file_get_contents to GET the URL in question.
    $contentsCredits = json_decode(file_get_contents($credits), true);
    $contentsProviders = json_decode(file_get_contents($providers), true);

    $message = [
        "credits" => $contentsCredits,
        "providers" => $contentsProviders,
    ];

    //If $contents is not a boolean FALSE value.
    if ($message !== false) {        //Print out the contents.
        sendJSON(
            ["message" => $message]
        );
    };
};
