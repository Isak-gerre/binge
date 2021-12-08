<?php

    require_once "../access-control.php";
    require_once "../functions.php";

    checkMethod("GET");
    checkContentType();
   

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

            if($type == "watched"){
                $message["watched"] = true;         
            };

            if($type == "review"){
                $message["review"] = $activity; 
            };
        }
    }

    sendJSON($message);


 

