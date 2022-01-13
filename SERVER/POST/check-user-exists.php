<?php

require_once "../access-control.php";
require_once "../functions.php";

checkMethod("POST");

$db = loadJSON("../DATABASE/user.json");
$rawUserData = file_get_contents("php://input");
$userData = json_decode($rawUserData, true);

if ( !isset($userData["userexists"]) ) {
    sendJSON(["message" => "A key's missing from request body"], 400);
}

if(isset($userData["userexists"])){
    foreach($db["users"] as $key){
        if(strlen($userData["userexists"]) < 4){
            sendJSON(
                [
                    "message" => "Username is too short, it needs to be atleast for characters",
                    "error" => 2,
                ], 409);
        } 
        if(strtolower($userData["userexists"]) === strtolower($key["username"])){
            sendJSON(
                [
                    "message" => "Username is already in use",
                    "error" => 1,
                ], 409);    
        }
    }
    sendJSON(
        [
        "message" => "Username is already in use",
        "error" => 0,
        ], 200);
};
?>