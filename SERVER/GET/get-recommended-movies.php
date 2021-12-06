<?php

require_once "access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    getPopular();
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};



function getPopular()
{
    $page1 = "https://api.themoviedb.org/3/movie/popular?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&page=1";
    $page2 = "https://api.themoviedb.org/3/movie/popular?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&page=2";

    //Use file_get_contents to GET the URL in question.
    $contentsPage1 = file_get_contents($page1);
    $contentsPage2 = file_get_contents($page2);

    $allpages = [
        "page1" => json_decode($contentsPage1, true),
        "page2" => json_decode($contentsPage2, true)
    ];

    //If $contents is not a boolean FALSE value.
    if ($contentsPage1 !== false || $contentsPage2 !== false) {        //Print out the contents.
        sendJSON(
            $allpages
        );
    };
};
