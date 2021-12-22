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

    $rawLoginTry = file_get_contents("php://input");
    $loginTry = json_decode($rawLoginTry, true);

    $db = loadJSON("../DATABASE/user.json");

    foreach($db["users"] as $user => $key){
        if($loginTry["username"] === $key["username"] || $loginTry["username"] === $key["email"]){
            if(password_verify($loginTry["password"], $key["password"])){
                // Spara i sessions.json
                // "SessionId" => spara $key["id"]
                // userID => spara userID
                // password => spara hashed password
                sendJSON(
                    [
                    "message" => "Login was a success",
                    "SessionId" => $key["id"]
                    // userID => send userID
                    // password => send hashed password
                    ], 200);
            }
            else{
                sendJSON(["message" => "Password or username is wrong"], 406);
            }
        }
    }
    sendJSON(["message" => "Password or username is wrong"], 406);

?>