<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];

if($method != "GET"){
    sendJSON(["message" => "Method not allowed"]);
}

$url = "http://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8";

// https://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8
$fetch = file_get_contents($url);

$data = json_decode($fetch);

// inspect($data);

sendJSON($data);
