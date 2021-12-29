<?php

    // Tar emot data från ett inlogningsförsök
    // 1. Kollar metoden, JSON
    // 2. Sedan kolla så att uppgifterna stämmer
    // och finns i databasen
    // 3. returneran ett response och ID för att
    // spara i session

    require_once "../access-control.php";
    require_once "../functions.php";

    $method = $_SERVER["REQUEST_METHOD"];


    //Ladda hem alla inputs
    $rawLoginTry = file_get_contents("php://input");

    //Ladda hem databasen
    $db = loadJSON("../DATABASE/user.json");


    //Hittar användaren dy försökt logga in med användaren du laggt in
    foreach($db["users"] as $user => $key){
        if($_POST["username"] === $key["username"] || $_POST["username"] === $key["email"]){
            if(password_verify($_POST["password"], $key["password"])){

                //On sucess skickar tillbaka användarens ID
                sendJSON(
                    [
                    "message" => "Login was a success",
                    "SessionId" => $key["sessionId"]
                    ], 200);
            }
            //Error om det inte funkar
            else{
                sendJSON(["message" => "Password or username is wrong"], 406);
            }
        }
    }
    sendJSON(["message" => "Password or username is wrong"], 406);

?>