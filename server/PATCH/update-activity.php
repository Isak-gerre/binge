<?php
    // Tar emot ny data och gamla aktivitetsidet,
    // raderar den gamla aktiviteten, lägg till en ny

    require_once "../access-control.php";
    require_once "../functions.php";

    checkMethod("PATCH");
    checkContentType(); 

    // The keys that is sent by the client
    // {
    //     "activity": {
    //         "id": 2,
    //         "rate": 5,
    //         "comment": "YÄY"
    //     } 
    // }
    
    
    // Loading data - activities
    $activitiesDB = loadJSON("../DATABASE/activities.json");
    $activities = $activitiesDB["activities"];

    // Variables - Data that was sent to us by the client
    $data = file_get_contents("php://input");
    $requestData = json_decode($data, true);
    $activityID = $requestData["activity"]["id"];
    $updatedActivity = $requestData["activity"];
    inspect($updatedActivity);
    
    if(!array_key_exists($activityID, $activities)){
        $message["message"] = "$activityID does not exist";
        sendJSON($message, 404);
    }

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
