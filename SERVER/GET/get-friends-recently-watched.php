<?php 
// RETURNAR ETT MOVIE ID OCH ETT USER ID
// Hämtar via get-activities den inloggades kompisars aktiviteter.
// Filtrerar ut watched och reviewed så det blir de filmerna kompisar har sett
// Lägger in den aktivitetens movieID och userID i en array av objekt och returnerar objektet

    require_once "../access-control.php";
    require_once "../functions.php";

    $method = $_SERVER["REQUEST_METHOD"];

    checkMethod("GET");
    checkContentType();
    
    if(isset($_GET["followingIDs"])) {
        $followingIDs = $_GET["followingIDs"];
        getFriendsRecentlyWatched(getFiendsActivities($followingIDs));
    } else {
        sendJSON([
            "code" => 1,
            "message" => "Missing IDs"
        ], 400);
    }


    //Ska vi ha denna? OBS den funkar inte
    // if(empty($_GET["followingIDs"])){
    //     sendJSON([
    //         "code" => 1,
    //         "message" => "You have to give me an ID"
    //     ], 400);
    // }

    function getFriendsRecentlyWatched($friendsActivities){
        //Filtrera ut watched och review
        //Limita till det antal vi vill ha i swipen

        $friendsMovies = [];
        
        foreach($friendsActivities as $activity){
            if($activity["type"] !== "watchlist") {
                $activityObj = 
                    [
                        "userID" => $activity["userID"],
                        "movieID" => $activity["movieID"]

                    ];
                
                array_push($friendsMovies, $activityObj);
            }
        }
        
        sendJSON($friendsMovies);
    };
 
 
 
?>