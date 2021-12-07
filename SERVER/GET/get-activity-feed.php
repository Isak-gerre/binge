 <!-- 
    Hämta alla aktiviteter från
    de IDn som skickas till denna,
    Sortera efter datum 
    Skicka tillbaka

    getFriendsActivitieIDs(){
      return array
    }

    getActivityFeed(getFriendsActivitieIDs()){

    }
 -->


<!-- 
  1. Ta emot en array av id: [following]
  2. Gå igenom alla id och hämta id:ts aktiviteter från activitys.json
  3. Spara i activity ids i array
 -->
<?php

function getFriendsActivitieIDs($followingIDs) {
  $activities = json_decode(file_get_contents("acitivities.json"), true)["activities"];
  

}
 
 
?>