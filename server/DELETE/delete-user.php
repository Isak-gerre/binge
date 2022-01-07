<?php
include_once "../access-control.php";
include_once "../functions.php";

checkMethod("DELETE");
checkContentType();

$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

if (!isset($requestData["userID"])) {
    sendJSON(
        [
            "status" => "error",
            "message" => "Missing userID in body request"
        ],
        400
    );
}

$userID = $requestData["userID"];

sendJSON(
    [
        "status" => "success",
        "deletedUser" => deleteUser($userID)
    ]
);

function deleteUser($userId) {
    $usersDB = loadJSON("../DATABASE/user.json");
    saveJSON("../DATABASE/JSON_BACKUPS/user.json", $usersDB);

    $users = $usersDB["users"];

    $found = false;

    foreach ($users as $key => $user) {
        if ($user["id"] == $userId) {
            $found = true;
            $deletedUser = $user;
            
            // Kolla om bilden är en avatar eller egen profilbild
            $profPicFilepath = $user["profile_picture"]["filepath"];
            // Om det är en egen profilbild, ta bort bilden
            if (strpos($profPicFilepath, 'PROFILE')) {
                unlink("../$profPicFilepath");
            }

            deleteActivities($user["id"]);

            unset($usersDB["users"][$key]);
        }
    }

    // Om användaren inte hittas skickas ett felmeddelande
    if ($found == false) {
        sendJSON(
            [
                "status" => "error",
                "message" => "User was not found"
            ],
            404
        );
    }

    saveJSON("../DATABASE/user.json", $usersDB);

    return $deletedUser;
}

function deleteActivities($userId) {

    $activityData = loadJSON("../DATABASE/activities.json");
    $activities = $activityData["activities"];
    
    // Tar bort de aktiviteter med userID som tillhör den raderade användaren
    foreach ($activities as $key => $activity) {
        if ($activity["userID"] == $userId) {
            unset($activityData["activities"][$key]);
        }
    }
    
    // Sparar den nya databasen
    saveJSON("../DATABASE/activities.json",$activityData);
}
