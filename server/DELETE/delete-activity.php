<!-- ELSA -->

<?php
require_once "access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];
$activityData = loadJson("../DATABASE/activities.json");


if($method === "DELETE"){
    $data = file_get_contents("php://input");
    $requestData = json_decode($data, true);

    //Kolla så ett id skickats med
    if(isset($requestData["id"])) {
        $id = $requestData["id"];
        $found = false;

        foreach($activityData["activities"] as $index => $activity){
            //FRÅGA: Såhär har jag ju alltid gjort innan,
            //men då har vi inte haft id't som "namn" på objektet.
            //Ska det se annorlunda ut då? Behöver jag ens göra 
            //foreachen såhär då?
            if($activity["id"] == $id){
                $found = true;
                array_splice($activityData["activities"], $index, 1);
                break;
            }
        }

        //Borde jag göra såhär istället??
        // foreach($activityData["activities"] as $index => $activity) {
        //     if(in_array("$id", $activityData["activities"])){
        //         $found = true;
        //         array_splice($activityData["activities"], $index, 1);
        //         break;
        //     }
        // }

        //Om found är false så har inte aktiviteten hittats
        if($found === false) {
            sendJson([
                "code" => 2,
                "message" => "This activity does not exit"
            ], 404);            
        }

        // Spara ändringar + felmeddelanden
        saveJson("../DATABASE/activities.json", $activityData);
        sendJson("Removed activity $id.");
    } else {
        //Om inget id skickats med
        sendJson([
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