<?php

    require_once "../access-control.php";
    require_once "../functions.php";

    checkMethod("GET");
   

    // // Data that was sent to us by the client
    // $data = file_get_contents("php://input");
    // $requestData = json_decode($data, true);

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
                $message["watchlist"] = $activity["id"];       
            };

            if($type == "watched"){
                $message["watched"] = $activity["id"];         
            };

            if($type == "review"){
                // om man har gett en review så har man ju också sett filmen
                $message["watched"] = $activity["id"];         
                $message["review"] = $activity; 
            };
        }
    }

    sendJSON($message);


 

