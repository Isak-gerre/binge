
<?php
// Elsa

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];
$activityData = loadJSON("../DATABASE/activities.json");

error_reporting(-1);


if($method === "DELETE"){
    $data = file_get_contents("php://input");
    $requestData = json_decode($data, true);

    //Kolla så ett id skickats med
    if(isset($requestData["id"])) {
        $activityID = $requestData["id"];


        
        if(array_key_exists("$activityID", $activityData["activities"])) {
            unset($activityData["activities"]["$activityID"]);
        } else {
            sendJSON([
                "code" => 2,
                "message" => "This activity does not exit"
            ], 404);
        }

        // Spara ändringar + felmeddelanden
        saveJSON("../DATABASE/activities.json", $activityData);
        sendJSON("Removed activity $activityID.");
    } else {
        //Om inget id skickats med
        sendJSON([
            "code" => 3,
            "message" => "Id is required if you want to delete activity"
        ], 400);
    }

} else {
    // Fel metod
    sendJson([
        "code" => 1,
        "message" => "Method not allowed"
    ], 400);
}


?>