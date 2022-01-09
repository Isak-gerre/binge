<?php

include_once "../access-control.php";
include_once "../functions.php";

checkMethod("POST");

if (isset($_FILES["fileToUpload"], $_POST["userID"])) {

    $userID = $_POST["userID"];
    $db = loadJSON("../DATABASE/user.json");
    saveJSON("../DATABASE/JSON_BACKUPS/user.json", $db);


    // Kontrollera att allt gick bra med PHP
    if ($_FILES["fileToUpload"]["error"] !== 0) {
        $message = ["message" => "Something went wrong with the picture"];
        sendJSON($message, 400);
    }

    // Filen får inte vara större än ~400kb
    if ($_FILES["fileToUpload"]["size"] > (0.4 * 1000 * 1000)) {
        $message = ["message" => "Too large"];
        sendJSON($message, 406);
    }
    $file = $_FILES["fileToUpload"];
    $filename = $file["name"];
    $tempname = $file["tmp_name"];

    // Hämta filinformation
    $info = pathinfo($filename);
    // Hämta ut filändelsen (och gör om till gemener)
    $ext = strtolower($info["extension"]);

    // Konvertera från int (siffra) till en sträng,
    // så vi kan slå samman dom nedan.
    $time = (string) time(); // Klockslaget i millisekunder
    // Skapa ett unikt filnamn
    $uniqueFilename = sha1("$time$filename");

    // Kolla om bilden är en avatar eller egen profilbild
    $profPicFilepath = $db["users"][$_POST["userID"]]["profile_picture"]["filepath"];
    // Om det är en egen profilbild, ta bort bilden
    if (strpos($profPicFilepath, 'PROFILE')) {
        unlink("../$profPicFilepath");
    }

    // Kollar formatet och sparar bilden
    if ($_FILES["fileToUpload"]["type"] === "image/jpeg") {
        //Laddar upp den nya bilden
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "../DATABASE/IMAGES/PROFILE/$uniqueFilename.jpg");
        $db["users"][$userID]["profile_picture"]["filepath"] = "DATABASE/IMAGES/PROFILE/$uniqueFilename.jpg";
        saveJSON("../DATABASE/user.json", $db);
        
        // JSON-svar när vi testade med att skicka formuläret via JS
        $filePath = $db["users"][$userID]["profile_picture"]["filepath"];
        sendJSON([
            "message" => "Uploaded the file",
            "filePath" => $filePath
            ]
        );
    }

}  else if ( isset($_POST["fileToUpload"], $_POST["userID"]) ) {

    $userID = $_POST["userID"];
    $db = loadJSON("../DATABASE/user.json");
    
    if ($_POST["fileToUpload"] === "profileImg1") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_1.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg2") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_2.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg3") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_3.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg4") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_4.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg5") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_5.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg6") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_6.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg7") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_7.png";
    } 
    else if ($_POST["fileToUpload"] === "profileImg8") {
        $db["users"]["$userID"]["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/AVATAR\/avatar_8.png";
    }

    $filePath = $db["users"]["$userID"]["profile_picture"]["filepath"];
    
    saveJSON("../DATABASE/user.json", $db);
    sendJSON([
        "message" => "Avatar is updated",
        "filePath" => $filePath
    ]); 
} 



// file_exists($filename); -> Kontrollera om en fil finns eller inte
// unlink($filename);      -> Radera en fil
