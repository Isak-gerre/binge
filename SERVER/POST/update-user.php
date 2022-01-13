<?php
require_once "../access-control.php";
require_once "../functions.php";

checkMethod("POST");

// Data that was sent to us by the client
$data = file_get_contents("php://input");
$requestData = json_decode($data, true);

// Loading data - activities
$usersDB = loadJSON("../DATABASE/user.json");
saveJSON("../DATABASE/JSON_BACKUPS/user.json", $usersDB);
$users = $usersDB["users"];


if (isset($requestData["userID"], $requestData["friendsUserID"])) {
    // Changes the one you followed and otherwise
    $userID = $requestData["userID"];
    $friendsUserID = $requestData["friendsUserID"];

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
    $userID = $_POST["id"];
    $executing = false;
    $message = [];
    $nothingChanged = true;

    getUsersById($userID);

    // Om EMAIL nyckeln finns och inte tomt
    if (isset($_POST["email"]) && $_POST["email"] !== "") {
        $email = $_POST["email"];

        if ($email !== $users[$userID]["email"]) {
            $executing = true;
            $nothingChanged = false;


            $alreadyTaken = alreadyTaken($users, "email", $email);

            // Kollar om email redan är taget
            if ($alreadyTaken) {
                $message["email"] = "Email already taken";
                $executing = false;
                $nothingChanged = false;
            }

            // Kollar så att emailen innehåller "@" och "."
            if (strpos($email, "@") == false or strpos($email, ".") == false) {
                $message["emailError"] = "Email has to contain ''@'' and ''.''";
                $executing = false;
                $nothingChanged = false;
            }
            // Om inget fel upptäckts så ändra vi nyckeln
            if ($executing) {
                $users[$userID]["email"] = $_POST["email"];
                $message["email"] = "You succeded changing your email";
            }
        }
    } else {
        $message["email"] = "Email's emty";
    }

    // // Om BIRTHDAY är ifyllt och inte tomt
    // if (isset($_POST["birthday"]) && $_POST["birthday"] !== "") {
    //     $birthday = $_POST["birthday"];

    //     if ( $birthday !== $users[$userID]["birthday"] ) {
    //         $executing = true;
    //         $nothingChanged = false;

    //         $birthdayInteger = intval($birthday);

    //         // Kollar så att det är ett rimligt år
    //         if ($birthdayInteger < 1850 || $birthdayInteger > 2015) {
    //             $message["birthdayError"] = "Insert a valid birthday";
    //             $executing = false;
    //         }
    //         // Om inget fel upptäckts så ändra vi nyckeln
    //         if ($executing) {
    //             $users[$userID]["birthday"] = $_POST["birthday"];
    //             $message["birthday"] = "You succeded changing your birthday";
    //         }
    //     }
    // } else {
    //     $message["birthday"] = "Birthday's emty";
    // }

    // Om FIRSTNAME är ifyllt och inte tomt
    if (isset($_POST["firstname"]) && $_POST["firstname"] !== "") {
        if ($_POST["firstname"] !== $users[$userID]["firstname"]) {
            $executing = true;
            $nothingChanged = false;

            $users[$userID]["firstname"] = $_POST["firstname"];
            $message["firstname"] = "You succeded changing your firstname";
        }
    } else {
        $message["fistname"] = "Firstname's emty";
    }

    if (isset($_POST["lastname"]) && $_POST["lastname"] !== "") {
        if ($_POST["lastname"] !== $users[$userID]["lastname"]) {
            $executing = true;
            $nothingChanged = false;

            $users[$userID]["lastname"] = $_POST["lastname"];
            $message["lastname"] = "You succeded changing your lastname";
        }
    } else {
        $message["lastname"] = "Lastname's empty";
    }

    // Om LOCATION är ifyllt och inte tomt
    if (isset($_POST["region"]) && $_POST["region"] !== "") {
        if ($users[$userID]["region"] !== $_POST["region"]) {
            $executing = true;
            $nothingChanged = false;

            $users[$userID]["region"] = $_POST["region"];
            $message["region"] = "You succeded changing your region";
        }
    } else {
        $message["region"] = "Region's emty";
    }

    // Om PASSWORD är ifyllt och inte tomt
    if (isset($_POST["old_password"]) && $_POST["old_password"] !== "") {
        if (password_verify($_POST["old_password"], $users[$userID]["password"])) {
            if (strlen($_POST["password"]) < 8) {
                sendJSON(["message" => "Passwords needs to be atleast 8 characters"], 409);
            }
            if ($_POST["password"] != $_POST["confirm_password"]) {
                sendJSON(["message" => "Passwords do not match"], 409);
            } else {
                //Hashar lösenordet
                $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);

                $executing = true;
                $nothingChanged = false;

                $users[$userID]["password"] = $hashedPassword;
                $message["password"] = "You succeded changing your password";
            }
        } else {
            $nothingChanged = false;
            sendJSON(["message" => "Wrong Password"], 409);
        }
    } else {
        $message["password"] = "Password's Empty";
    }

    // Om active_streaming_services finns, uppdatera
    if (isset($_POST["active_streaming_services"])) {

        if ($users[$userID]["active_streaming_services"] !== $_POST["active_streaming_services"]) {
            $executing = true;
            $nothingChanged = false;

            $users[$userID]["active_streaming_services"] = [];
            foreach ($_POST["active_streaming_services"] as $key) {
                $users[$userID]["active_streaming_services"][] = $key;
            }
            $message["active_streaming_services"] = "You succeded changing your active streamingservices";
        }
    } else {
        $message["active_streaming_service"] = "Active_streaming_service's emty";
    }

    // Om inte executing har ändrats till FALSE
    // kommer den att utföra ändringarna
    // annars skickar den alla felmeddelanden som kunnat uppstå 
    if ($executing) {
        $usersDB["users"] = $users;
        saveJSON("../DATABASE/user.json", $usersDB);
        sendJSON($message);
    } else {
        if ($nothingChanged) {
            sendJSON(["message" => "Nothing was changed"], 400);
        } else {
            sendJSON($message, 406);
        }
    }
}
