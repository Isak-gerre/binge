<?php
/*
    * Create an activite and adds the activite and array
    
    createActivite(){

    }

*/

include_once "../access-control.php";
include_once "../functions.php";

// Kontrollerar metod och contentType
checkMethod("POST");
checkContentType("application/json");

// Hämtar data från klienten
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Kontrollerar att viktiga nycklar finns med
if (!isset($requestData["userID"], $requestData["movieID"], $requestData["type"])) {
    sendJSON(
        [
            "message" => "A key is missing in body"
        ],
        400
    );
}

$userID = $requestData["userID"];
$movieID = $requestData["movieID"];
$type = $requestData["type"];
$comment = $requestData["comment"];
$rate = $requestData["rate"];

if ($userID == "" || $movieID == "" || $type == "") {
    sendJSON(
        [
            "message" => "userID, movieID or type is empty"
        ],
        400
    );
}

sendJSON(createActivity($userID, $movieID, $type, $comment, $rate));

function createActivity($userID, $movieID, $type, $comment, $rate) {
    
    $activitiesDB = loadJSON("../DATABASE/activities.json");
    $activities = $activitiesDB["activities"];
    
    $highestId = nextHighestId($activities);

    $newActivity = [
        "id" => $highestId,
        "userID" => $userID,
        "movieID" => $movieID,
        "type" => $type,
        "date" => date("Ymd"),
        "comment" => $comment,
        "rate" => $rate,
        "updated" => false
    ];
    
    $activities[] = $newActivity;

    saveJSON("../DATABASE/activities.json", $activities);

    return $newActivity;
}

?>