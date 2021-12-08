<?php
    // Tar emot ny data och gamla aktivitetsidet,
    // raderar den gamla aktiviteten, lägg till en ny

    require_once "../access-control.php";
    require_once "../functions.php";

    // HTTP-metod
    // Content-Type
    $method = $_SERVER["REQUEST_METHOD"];
    $contentType = $_SERVER["CONTENT_TYPE"];

    // Data that was sent to us by the client
    $data = file_get_contents("php://input");
    $requestData = json_decode($data, true);

    // The keys that is sent by the client
    // {
    //     "activity": {
    //         "id": 2,
    //         "rate": 5,
    //         "comment": "YÄY"
    //     } 
    // }

    
    // Checks the method
    if($method !== "POST") {
        $message = [
            "message" => "Method Not Allowed"
        ];
        sendJSON($message, 405);
    }
    
    // Checks so that the data is given in JSON,
    // do we need this?
    if ($contentType !== "application/json"){
        $message = [
            "message" => "The API only accepts JSON"
        ];
        sendJSON($message, 404);
    }
    
    // Checks if the keys are set - is this necessary? Or do we do this in JS?
    // if(!isset($requestData["movieID"], $requestData["userID"], $requestData["activity"])){
    //     $message = [
    //         "message" => "Keys not set / Missing body"
    //     ];
    //     sendJSON($message, 404);
    // }
    
    // Loading data - activities
    $activitiesDB = loadJSON("../DATABASE/activities.json");
    $activities = $activitiesDB["activities"];

    // Variables
    $activityID = $requestData["activity"]["id"];
    $updatedActivity = $requestData["activity"];
    
    // Updating the activity
    $activities[$activityID]["date"] = date("Ymd");
    $activities[$activityID]["comment"] = $updatedActivity["comment"];
    $activities[$activityID]["rate"] = $updatedActivity["rate"];
    $activities[$activityID]["updated"] = true;

    // Saves the update
    $activitiesDB["activities"] = $activities;
    saveJSON("../DATABASE/activities.json", $activitiesDB);
    $message = [
        "message" => "SUCCESS"
    ];
    sendJSON($message);

    // IDE: en update nyckel = false eller true
    // datum uppdateras och flyttas

    // Det ska bara finns review
    // På klient sidan skriver vi ut olika,
    // om det inte finns någon kommentar så kallas den för en rating
    // annars en review
