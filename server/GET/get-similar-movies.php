<?php

/*
    * Vi får MovieID, kalla på TM-database
    * Skicka tillbaka data till klienten

*/

require_once "../access-control.php";
require_once "../functions.php";

if($method === "GET" && isset($_GET["movieID"])){
    if(!is_numeric($_GET["movieID"])){
        send(["message" => "Wrong method"], 400);
        exit();
    }
    else{
        getSimilarMovies();
    }
}


function getSimilarMovies(){
    
    $movieID = $_GET["movieID"];
    
    // The URL that we want to GET.
    $url = "https://api.themoviedb.org/3/movie/$movieID/similar?api_key=f5c0e0db147d0e6434391f3ff153b6a8&language=en-US&page=1";

    //Use file_get_contents to GET the URL in question.
    $contents = file_get_contents($url);

    if ($contents !== false) {
        //Print out the contents.
        send(
            ["message" => json_decode($contents, true)]
        );
    }
    else{
        send(
            ["message" => "something went wrong"], 404
        ); 
    }
}



?>
