<?php


require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    if (isset($_GET["ids"])) {
        $ids = explode(",", $_GET["ids"]);
        sendJSON(getUsersByIDs($ids));
    };
    if (isset($_GET["sessionID"], $_GET["userID"])) {
        $sessionID = $_GET["sessionID"];
        $userID = $_GET["userID"];
        $users = getUsers();
        $foundUser = false;
        foreach($users as $user) {
        if($user["sessionId"] == $sessionID && $user["id"] == $userID){
            $foundUser = true;
        };
    };
    if($foundUser == false) {
        sendJSON(["message" => "No User Found"], 404);
    }
    sendJSON(["message" => "User Found"], 200);;
    };
    sendJSON(getUsers());
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};
