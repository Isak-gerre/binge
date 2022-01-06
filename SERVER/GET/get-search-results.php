<?php


require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    if (isset($_GET["query"])) {
        search();
    } else {
        sendJSON(["message" => "No query found"], 400);
    }
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};



function search()
{
    $page = 1;
    if (isset($_GET["page"]) && intval($_GET["page"]) > 0) {
        $page = intval($_GET["page"]);
    }
    $query = urlencode($_GET["query"]);
    $url = "http://api.themoviedb.org/3/search/multi?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&page=1&include_adult=false&query=$query&page=$page";
    $searchtype = "all";

    if (isset($_GET["searchtype"])) {
        //Checks if user wants to search by actors or by movie and changes $url accordingly. If not set: will search by both actors and movies[1]
        //[1] Searchword "Cruise" will give results "Jungle Cruise" and "Mission Impossible" (starring Tom Cruise)
        if ($_GET["searchtype"] == "cast") {
            $url = "http://api.themoviedb.org/3/search/person?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&include_adult=false&query=$query&page=$page";
            $searchtype = "cast";
        }
        if ($_GET["searchtype"] == "movie") {
            $url = "http://api.themoviedb.org/3/search/movie?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&include_adult=false&query=$query&page=$page";
        }
        // if ($_GET["searchtype"] == "users") {
        //     $url = "http://localhost:7001/SERVER/DATABASE/user.json";
        // }
    }




    //Use file_get_contents to GET the URL in question.
    $contents = json_decode(file_get_contents($url), true);
    if ($searchtype == "cast") {
        foreach ($contents["results"] as $actoryKey => $actor) {
            foreach ($actor["known_for"] as $movieKey => $movie) {
                if ($movie["media_type"] === "tv") {
                    unset($contents["results"][$actoryKey]["known_for"][$movieKey]);
                }
            }
        }
    }

    //If $contents is not a boolean FALSE value.
    if ($contents !== false) {
        //Print out the contents.
        sendJSON(
            $contents
        );
    };
};
