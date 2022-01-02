<?php
/*
    Skicka med:
    - userID
    - movieID
    - type
    - comment (lämnas tom om den inte finns)
    - rate (lämnas tom om den inte finns)

    Returnerar två nycklar vid lyckad hämtning:
    - status: success
    - activity: tillagd aktivitet

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

sendJSON([
    "status" => "success",
    "activity" => createActivity($userID, $movieID, $type, $comment, $rate)
    ]
);

function createActivity($userID, $movieID, $type, $comment, $rate) {
    
    $activitiesDB = loadJSON("../DATABASE/activities.json");
    $activities = $activitiesDB["activities"];
    
    $highestId = nextHighestId($activities);
    date_default_timezone_set("Europe/Stockholm");

    $newActivity = [
        "id" => $highestId,
        "userID" => $userID,
        "movieID" => $movieID,
        "type" => $type,
        "date" => date("YmdHi"),
        "comment" => $comment,
        "rate" => $rate,
        "updated" => false
    ];
    
    $activitiesDB["activities"][] = $newActivity;

    saveJSON("../DATABASE/activities.json", $activitiesDB);

    return $newActivity;

}

?>