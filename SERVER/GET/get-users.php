<?php


require_once "access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];


if ($method === "GET") {
    if (isset($_GET["ids"])) {
        $ids = explode(",", $_GET["ids"]);
        sendJSON(getUsersByIDs($ids));
    };
    sendJSON(getUsers());
} else {
    sendJSON(
        ["message" => "Method not allowed"],
        400
    );
};
