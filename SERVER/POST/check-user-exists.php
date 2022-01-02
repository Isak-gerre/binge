<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];
$db = loadJSON("../DATABASE/user.json");
$rawUserData = file_get_contents("php://input");
$userData = json_decode($rawUserData, true);

if ($method != "POST") {
    exit();
}

if(isset($userData["userexists"])){
    foreach($db["users"] as $key){
        if(strtolower($userData["userexists"]) === strtolower($key["username"])){
            sendJSON(["message" => "Username is already in use"], 409);    
        }
    }
    if(strlen($userData["userexists"]) < 4){
        sendJSON(["message" => "Username is too short, it needs to be atleast for characters"], 409);
    } 
    sendJSON(["message" => "Username is free to use"], 200);
};
?>