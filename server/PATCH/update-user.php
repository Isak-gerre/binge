<?php 
    // * OM profilbilden är en avatar ta INTE bort, måste
    // kollas innan. 

    // Ta emot data och kontrollerar ändringar en gång till
    // Kolla metod 

    // follow(POST){

    // }

    // removeFollow(POST){

    // }

    // editReview(){
        
    // }

    require_once "../access-control.php";
    require_once "../functions.php";

    // HTTP-metod
    // Content-Type
    $method = $_SERVER["REQUEST_METHOD"];
    $contentType = $_SERVER["CONTENT_TYPE"];

    // Data that was sent to us by the client
    $data = file_get_contents("php://input");
    $requestData = json_decode($data, true);

    // If changing your profile this will be sent by the client
    // {
    //     "userID": "5",
    // }
    // If unfollowing or follows this will be sent by the client
    // {
    //     "userID": "5",
    //     "otherUserID": "2",
    //     "changeType": "follow/unfollow"
    // }

    
    // Checks the method
    if($method !== "PATCH") {
        $message = [
            "message" => "Method Not Allowed"
        ];
        sendJSON($message, 405);
    }

    // Loading data - activities
    $usersDB = loadJSON("../DATABASE/user.json");
    $users = $usersDB["users"];
    $userID = $requestData["userID"];
    

    if(isset($requestData["userID"], $requestData["otherUserID"])){
        // Changes the one you followed and otherwise
        $otherUserID = $requestData["otherUserID"];
        $changeType = $requestData["changeType"];

        if($changeType == "follow"){
            // Checks if the person already exists
            if(!in_array(intval($userID), $users[$otherUserID]["followers"])){
                // Adds to the person you followed 
                $users[$otherUserID]["followers"][] = intval($userID);
            } else {
                $message = [
                    "message" => "User already in array"
                ];
                sendJSON($message, 405);
            }
            // Checks if the person already exists
            if(!in_array(intval($otherUserID), $users[$userID]["following"])){
                // Adds to your followings
                $users[$userID]["following"][] = intval($otherUserID);
            } else {
                $message = [
                    "message" => "User already in array"
                ];
                sendJSON($message, 405);
            }
            
        } elseif ($changeType == "unfollow"){

            if(array_search($otherUserID, $users[$userID]["following"]) != false){
                $index = array_search($otherUserID, $users[$userID]["following"]);
                array_splice($users[$userID]["following"], $index, 1);
            } else {
                $message = [
                    "message" => "User does not exist"
                ];
                sendJSON($message, 405);
            }

            if(array_search($userID, $users[$otherUserID]["followers"]) != false){
                $index = array_search($userID, $users[$otherUserID]["followers"]);
                array_splice($users[$otherUserID]["followers"], $index, 1);
            } else {
                $message = [
                    "message" => "User does not exist"
                ];
                sendJSON($message, 405);
            }

        }

        // Saves the update
        $usersDB["users"] = $users;
        saveJSON("../DATABASE/user.json", $usersDB);
        $message = [
            "message" => "SUCCESS"
        ];
        sendJSON($message);

    } else {
        // Changes your own profile 
        // firstname, lastname, username, email, birthday, location, bio, streaming services 
        $executing = true;
        $message = [];

        // Om USERNAME nyckeln finns och inte tomt
        if (isset($requestData["username"]) && !empty($requestData["username"])) {
            $username = $requestData["username"];
            $alreadyTaken = alreadyTaken($users, "username", $username);

            // Kollar så att användarnamnet inte är upptaget
            if ($alreadyTaken) {
                $message["username"] = "Username already taken";
                send($message, 404);
                $executing = false;
            }
            // Kollar så att användarnamnet är längre än 2 bokstäver
            if (strlen($username) <= 2) {
                $message["username"] = "Username has to be more than 2 characters";
                $executing = false;
            }
            // Om inget fel upptäckts så ändra vi nyckeln
            if ($executing) {
                $users[$userID]["username"] = $requestData["username"];
                $message["username"] = "You succeded changing your username";
            }
        }

        // Om EMAIL nyckeln finns och inte tomt
        if (isset($requestData["email"]) && !empty($requestData["email"])) {
            $email = $requestData["email"];
            $alreadyTaken = alreadyTaken($users, "email", $email);

            // Kollar om email redan är taget
            if ($alreadyTaken) {
                $message["email"] = "Email already taken";
                $executing = false;
            }
            // Kollar så att emailen innehåller "@" och "."
            if (strpos($email, "@") === false && strpos($email, ".") === false) {
                $message["email"] = "Email has to contain ''@'' and ''.''";
                $executing = false;
            }
            // Om inget fel upptäckts så ändra vi nyckeln
            if ($executing) {
                $users[$userID]["email"] = $requestData["email"];
                $message["email"] = "You succeded changing your email";
            }
        }

        // Om PASSWORD är ifyllt och inte tomt
        if (isset($requestData["password"]) && !empty($requestData["password"])) {
            $users[$userID]["password"] = $requestData["password"];
            $usersDB["users"] = $users;
            saveJSON("DATABAS/users.json", $usersDB);
        }

        // Om BIRTHDAY är ifyllt och inte tomt
        if (isset($requestData["birthday"]) && !empty($requestData["birthday"])) {
            $birthday = $requestData["birthday"];

            $birthdayInteger = intval($birthday);
            // Kollar så att det är en siffra 
            if (!is_int($birthdayInteger) || $birthdayInteger === 1 || $birthdayInteger === 0) {
                $message["birthday_first"] = "It has to be an integer";
                $executing = false;
            }
            // Kollar så att det är ett rimligt år
            if ($birthdayInteger < 1850 && $birthdayInteger < 2002) {
                $message["birthday"] = "Insert a valid birthday";
                $executing = false;
            }
            // Om inget fel upptäckts så ändra vi nyckeln
            if ($executing) {
                $users[$userID]["birthday"] = $requestData["birthday"];
                $message["birthday"] = "You succeded changing your birthday";
            }
        }

        // Om FIRSTNAME är ifyllt och inte tomt
        if (isset($requestData["firstname"]) || isset($requestData["lastname"])) {
            if ($executing) {
                $users[$userID]["firstname"] = $requestData["firstname"];
                $message["firstname"] = "You succeded changing your firstname";

                $users[$userID]["lastname"] = $requestData["lastname"];
                $message["lastname"] = "You succeded changing your lastname";
            }
        }

        // Om BIO är ifyllt och inte tomt
        if (isset($requestData["bio"]) && !empty($requestData["bio"])) {
            if ($executing) {
                $users[$userID]["bio"] = $requestData["bio"];
                $message["bio"] = "You succeded changing your bio";
            }
        }
        
        // Om LOCATION är ifyllt och inte tomt
        if (isset($requestData["location"])) {
            if ($executing) {
                $users[$userID]["location"] = $requestData["location"];
                $message["location"] = "You succeded changing your location";
            }
        }

        // Om inte executing har ändrats till FALSE
        // kommer den att utföra ändringarna
        // annars skickar den alla felmeddelanden som kunnat uppstå 
        if ($executing) {
            $usersDB["users"] = $users;
            saveJSON("../DATABASE/user.json", $usersDB);
            sendJSON($message);
        } else {
            sendJSON($message, 400);
        }

    }