<?php
// If changing your profile this will be sent by the client
// {
//     "userID": "5",
// }
// If unfollowing or follows this will be sent by the client
// {
//     "userID": "5",
//     "otherUserID": "2",
// }

require_once "../access-control.php";
require_once "../functions.php";

checkMethod("PATCH");
checkContentType();

// Data that was sent to us by the client
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Loading data - activities
$usersDB = loadJSON("../DATABASE/user.json");
$users = $usersDB["users"];


if (isset($requestData["userID"], $requestData["friendsUserID"])) {
    // Changes the one you followed and otherwise
    $userID = $requestData["userID"];
    $friendsUserID = $requestData["friendsUserID"];

    echo "hej";

    if (!$users[$friendsUserID]) {
        sendJSON(
            [
                "message" => "User not found"
            ],
            404
        );
    }
   
    // Om vännen följer mig, ta bort. Ta bort mig själv från "vännens" array
    // Om jag finns i vännens followers = jag följer vännen (jag vill då avfölja vännen)
    if (in_array(intval($userID), $users[$friendsUserID]["followers"])) {
        $index = array_search($userID, $users[$friendsUserID]["followers"]);
        array_splice($users[$friendsUserID]["followers"], $index, 1);
        
        // Om vännen inte följer mig, lägg till (follow)    
    } else {
        $users[$friendsUserID]["followers"][] = intval($userID);
    }   
    
    // Om jag följer vännen. Ta bort "vännen" från min array
    if (in_array(intval($friendsUserID), $users[$userID]["following"])) {
        $index = array_search($friendsUserID, $users[$userID]["following"]);
        array_splice($users[$userID]["following"], $index, 1);  
        
        // Om jag inte följer vännen, lägg till vänne i min array
    } else {
        $users[$userID]["following"][] = intval($friendsUserID);  
    }

    // Saves the update
    $usersDB["users"] = $users;
    saveJSON("../DATABASE/user.json", $usersDB);
    $message = [
        "message" => "SUCCESS"
    ];
    sendJSON($message);


} else {
    // Changes your own profile, firstname, lastname, username, email, birthday, location, bio, streaming services 
    $userID = $requestData["userID"];
    $executing = true;
    $message = [];

    // Om USERNAME nyckeln finns och inte tomt
    if (isset($requestData["username"]) && !empty($requestData["username"])) {
        $username = $requestData["username"];
        $alreadyTaken = alreadyTaken($users, "username", $username);

        // Kollar så att användarnamnet inte är upptaget
        if ($alreadyTaken) {
            $message["username"] = "Username already taken";
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
        // saveJSON("DATABASE/users.json", $usersDB);
    }

    // Fortsätter på birthday om tid finns sen
    // Om BIRTHDAY är ifyllt och inte tomt
    // if (isset($requestData["birthday"]) && !empty($requestData["birthday"])) {
    //     $birthday = $requestData["birthday"];
    //     $birthdayInteger = intval($birthday);
    //     // Kollar så att det är en siffra 
    //     if (!is_int($birthdayInteger) || $birthdayInteger === 1 || $birthdayInteger === 0) {
    //         $message["birthday_first"] = "It has to be an integer";
    //         $executing = false;
    //     }
    //     // Kollar så att det är ett rimligt år
    //     if ($birthdayInteger < 1850 && $birthdayInteger < 2002) {
    //         $message["birthday"] = "Insert a valid birthday";
    //         $executing = false;
    //     }
    //     // Om inget fel upptäckts så ändra vi nyckeln
    //     if ($executing) {
    //         $users[$userID]["birthday"] = $requestData["birthday"];
    //         $message["birthday"] = "You succeded changing your birthday";
    //     }
    // }

    // Om FIRSTNAME är ifyllt och inte tomt
    if (isset($requestData["firstname"]) && isset($requestData["lastname"])) {
        if ($executing) {
            $users[$userID]["firstname"] = $requestData["firstname"];
            $message["firstname"] = "You succeded changing your firstname";

            $users[$userID]["lastname"] = $requestData["lastname"];
            $message["lastname"] = "You succeded changing your lastname";
        }
    }

    // Om LOCATION är ifyllt och inte tomt
    if (isset($requestData["region"])) {
        if ($executing) {
            $users[$userID]["region"] = $requestData["region"];
            $message["region"] = "You succeded changing your region";
        }
    }

    // Om active_streaming_services finns, uppdatera
    if(isset($requestData["active_streaming_services"])) {
        if ($executing) {
            $users[$userID]["active_streaming_services"] = $requestData["active_streaming_services"];
            $message["active_streaming_services"] = "You succeded changing your active streamingservices";
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