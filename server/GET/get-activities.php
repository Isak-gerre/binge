<?php

require_once "access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];

// FUNCTIONS //

// Tar emot en array av userIDs
function getFiendsActivities($IDarr) {
  // Hämtar alla aktiviteter
  $activities = json_decode(file_get_contents("../DATABASE/activities.json"), true)["activities"];

  // Ny array som sks skickas tilllbaka
  $friendsActivities = [];

  // Går igenom alla aktiviteter
  foreach($activities as $activity) {

    // Om AKTIVITETENsss userID finns i $IDArr(som skickats med)
    // pusha in den aktuella aktiviteten i friendsActivities[]
    if(in_array($activity["userID"], $IDarr)) {
      array_push($friendsActivities, $activity);
    }
  }

  // SORT enligt datum? väl? Gör detta sen

  // Skicka tilllbaka array med aktiviter
  sendJson($friendsActivities);
}


// Tar emot ett filmID
// Det är väl bara en films id åt gången?
function getMovieReviews($movieID) {
  $activities = json_decode(file_get_contents("../DATABASE/activities.json"), true)["activities"];

  // Ny array som ska skickas tillbaka
  $movieReviews = [];

  // Gå igenom alla aktiviteter
  foreach($activities as $activity) {

    // Kolla om aktivitetes movieID är samma som det som skickats med
    if($activity["movieID"] == $movieID) {

      // Om ID stämmer, kolla så att typen är review
      // Vill vi även ha de som bara är en rating? Ska de isf displayas på samma sätt som reviews? 
      if($activity["type"] == "review") {
        // Om det stämmer pusha in i array
        array_push($movieReviews, $activity);
      } 
    }
  }

  // SORT
  // Skicka tillbaka
  sendJson($movieReviews);
}

if($method = "GET") {

  // If ids of people the user´s following => get the activities of following
  if(isset($_GET["followingIDs"])) {
    $followingIDs = $_GET["followingIDs"];

    $arrOfIDs = explode(",", $followingIDs);
    getFiendsActivities($arrOfIDs);
  }

  // If movie ids => get reviews for the movie
  if(isset($_GET["movieID"])) {
    getMovieReviews($_GET["movieID"]);
  }

} else {
  sendJSON(
    ["message" => "Method not allowed"],
    400
  );
}

 
 
?>