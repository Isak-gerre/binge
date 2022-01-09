<?php
require_once "../access-control.php";
require_once "../functions.php";

checkMethod("PATCH");
checkContentType();

// Loading data - activities
$activitiesDB = loadJSON("../DATABASE/activities.json");
saveJSON("../DATABASE/JSON_BACKUPS/activities.json", $activitiesDB);

$activities = $activitiesDB["activities"];

// Variables - Data that was sent to us by the client
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);
$activityID = $requestData["activity"]["id"];
$updatedActivity = $requestData["activity"];

if (!array_key_exists($activityID, $activities)) {
    $message["message"] = "$activityID does not exist";
    sendJSON($message, 404);
}

// Updating the activity
date_default_timezone_set("Europe/Stockholm");

$activities[$activityID]["date"] = date("YmdHi");
$activities[$activityID]["comment"] = $updatedActivity["comment"];
$activities[$activityID]["rate"] = $updatedActivity["rate"];
$activities[$activityID]["updated"] = true;

// Saves the update
$activitiesDB["activities"] = $activities;
saveJSON("../DATABASE/activities.json", $activitiesDB);
$message = [
    "state" => "SUCCESS",
    "message" => "Activity was updated"
];
sendJSON($message);
