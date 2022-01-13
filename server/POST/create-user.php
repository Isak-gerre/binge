<?php

require_once "../access-control.php";
require_once "../functions.php";

$method = $_SERVER["REQUEST_METHOD"];
$db = loadJSON("../DATABASE/user.json");
saveJSON("../DATABASE/JSON_BACKUPS/user.json", $db);

//Lägger användaren som nästa ID
$nextID = nextHighestId($db["users"]);

if ($method != "POST") {
    exit();
}

//Kollar om användaren redan finns både användarnamn och även email (denna request bör skickas vid varje keypress och inte endast vist submit)
foreach ($db["users"] as $key) {
    if (strtolower($key["username"]) === strtolower($_POST["username"])) {
        sendJSON(["message" => "Username is already in use"], 409);
    } elseif(strtolower($key["email"]) === strtolower($_POST["email"])) {
        //MAke sure to let user know!
        sendJSON(["message" => "Email is already in use"], 409);
    }
    elseif(strlen($_POST["username"]) < 4){
        sendJSON(["message" => "Username is too short, it needs to be atleast for characters"], 409);
    }
}

//Kollar att lösenordet inte är för kort
//Kollar så att det är samma lösenord mellan password och confirm password
if(strlen($_POST["password"]) < 8){
    sendJSON(["message" => "Passwords needs to be atleast 8 characters"], 409);
}
if ($_POST["password"] != $_POST["confirm_password"]) {
    sendJSON(["message" => "Passwords do not match"], 409);
} else {
    //Hashar lösenordet
    $hashedPassword = password_hash($_POST['password'], PASSWORD_DEFAULT);
}

//Använder en foreach för att göra alla inskickade värden till ett object med användarens alla nycklar
foreach($_POST as $key => $value) {
    if ($key === "firstname" || $key === "lastname" || $key === "email" || $key === "username") {
        if ($value == ""){
            sendJSON(["message" => "All requiered fields have not been filled in"], 409);
        }
    }
    //Ser till att confirm password inte kommer med
    if ($key != "confirm_password" && $key != "profileImg" && $key != "fileToUpload") {
        $db["users"]["$nextID"][$key] = $value;
    }
    //Ändrar lösen till det hashade
    if ($key === "password") {
        $db["users"]["$nextID"][$key] = $hashedPassword;
    }
}

//Kollar om det finns en fileToUpload nyckeln finns med som är profilbilden. Om den finns skapas nyckeln. (Denna kommer ha en defult)

if (isset($_FILES["fileToUpload"])) {
    //Skapar ett unikt bildnamn
    $imgName = $_FILES["fileToUpload"]["name"];
    $time = (string) time();
    $newImgName = hash("sha256", $imgName . $time);
    
    //Kollar filtyp
    //OBS!!!!: INTE SÄKERT SÄTT ATT KOLLA FIL MEN BÄTTRE ÄN INGET
    if ($_FILES["fileToUpload"]["type"] === "image/jpeg") {
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "../DATABASE/IMAGES/PROFILE/$newImgName.jpg");
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/PROFILE\/$newImgName.jpg";
    }
} else {
    if ($_POST["fileToUpload"] === "profileImg1") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_1.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg2") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_2.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg3") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_3.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg4") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_4.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg5") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_5.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg6") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_6.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg7") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_7.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg8") {
        $db["users"]["$nextID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_8.png";
    }
}

if (!isset($_POST["active_streaming_services"])) {
    $db["users"]["$nextID"]["active_streaming_services"] = [];
}

//Skapar nycklarna followers och following
$db["users"]["$nextID"]["followers"] = [];
$db["users"]["$nextID"]["following"] = [];

//Skapar ett ID som är hashed och lägger in det under id nycklen
$hashedUserId = password_hash($nextID, PASSWORD_DEFAULT);
$db["users"]["$nextID"]["sessionId"] = $hashedUserId;
$db["users"]["$nextID"]["id"] = $nextID;

//Sparar användaren det i databasen
saveJSON("../DATABASE/user.json", $db);
sendJSON(
    [
        "message" => "User has been created",
        "session" => ["sessionID" => $db["users"]["$nextID"]['sessionId'], "userID" => $db["users"]["$nextID"]['id']],
    ],
    200
);

?>