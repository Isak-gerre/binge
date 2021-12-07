<?php

    require_once "../access-control.php";
    require_once "../functions.php";

    // HTTP-metod
    // Content-Type
    $method = $_SERVER["REQUEST_METHOD"];
    $contentType = $_SERVER["CONTENT_TYPE"];

    if($method != "GET") {
        $message = [
            "message" => "Method Not Allowed"
        ];    
        sendJSON($message, 405);
    } 

    // GET - parameters
    $userID = $_GET["userID"];
    $movieID = $_GET["movieID"];

    // Loading data - activities 
    $activities = loadJSON("../DATABASE/activities.json")["activities"];

    $message = [
        "watchlist" => false,
        "watched" => false,
        "review" => false
    ];

    foreach($activities as $activity){

        $currentMovieID = $activity["movieID"];
        $currentUserID = $activity["userID"];
        $type = $activity["type"];

        if($userID == $currentUserID && $movieID == $currentMovieID){
            if($type == "watchlist"){
                $message["watchlist"] = true;       
            };

            if($type == "watchlist"){
                $message["watched"] = true;         
            };

            if($type == "review"){
                $message["review"] = $activite; 
            };
        }
    }

    sendJSON($message);


 

