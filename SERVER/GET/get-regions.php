<?php

require_once "../access-control.php";
require_once "../functions.php";

checkMethod("GET");


$url = "http://api.themoviedb.org/3/watch/providers/regions?api_key=$api_key";

if(isset($_GET["watch_region"]) && $_GET["watch_region"] != ""){
    $watch_region = $_GET["watch_region"];
    $url = "http://api.themoviedb.org/3/watch/providers/movie?watch_region=$watch_region&api_key=f5c0e0db147d0e6434391f3ff153b6a8";
}

$fetch = file_get_contents($url);

$data = json_decode($fetch);

sendJSON($data);
