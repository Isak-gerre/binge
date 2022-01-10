<?php
require_once "../access-control.php";
require_once "../functions.php";

checkMethod("GET");

if (file_exists("../DATABASE/user.json") && file_exists("../DATABASE/activities.json")) {
    sendJSON(["message" => "Database Exists"], 200);
} else {
    sendJSON(["message" => "Sorry! Something went wrong"], 409);
}
