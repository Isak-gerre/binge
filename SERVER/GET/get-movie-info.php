<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    if (isset($_GET["movieID"])) {
        getMovie($api_key);
    } else {
        sendJSON(
            ["message" => "MovieID was not sent"],
            400
        );
    };
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};



function getMovie($api_key)
{
    $movieID = $_GET["movieID"];
    $url = "http://api.themoviedb.org/3/movie/$movieID?api_key=$api_key";

    //Use file_get_contents to GET the URL in question.
    $contents = file_get_contents($url);

    //If $contents is not a boolean FALSE value.
    if ($contents !== false) {        //Print out the contents.
        sendJSON(
            ["message" => json_decode($contents, true)]
        );
    };
};
