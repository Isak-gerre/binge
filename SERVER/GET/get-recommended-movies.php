<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    getPopular($api_key);
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};



function getPopular($api_key)
{
    $page = 1;
    if (isset($_GET["page"]) && intval($_GET["page"]) > 0) {
        $page = intval($_GET["page"]);
    }
    $url = "https://api.themoviedb.org/3/movie/popular?api_key=$api_key&language=en-US&page=$page";

    //Use file_get_contents to GET the URL in question.
    $contents = json_decode(file_get_contents($url), true);

    //If $contents is not a boolean FALSE value.
    if ($contents !== false) {        //Print out the contents.
        sendJSON(
            $contents
        );
    };
};
