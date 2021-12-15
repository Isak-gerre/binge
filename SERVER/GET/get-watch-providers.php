<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    getWatchProviders();
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};

function
getWatchProviders()
{
    $watchProviders = "http://api.themoviedb.org/3/watch/providers/movie?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US";

    //Use file_get_contents to GET the URL in question.
    $contents = json_decode(file_get_contents($watchProviders), true);
    $contentsProviders = $contents["results"];

    $priorityProviders = loadJSON("../DATABASE/priorityProviders.json");

    $providerInfo = [];
    foreach ($contentsProviders as $provider) {
        if (in_array($provider["provider_id"], $priorityProviders["priority_providers-id"])) {
            $providerInfo[] = $provider;
        }
    }

    $message = [
        "providers" => $providerInfo,
    ];

    //If $contents is not a boolean FALSE value.
    if ($message !== false) {        //Print out the contents.
        sendJSON(
            ["message" => $message]
        );
    };
};
