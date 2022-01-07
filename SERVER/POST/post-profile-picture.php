<?php

include_once "../access-control.php";
include_once "../functions.php";

checkMethod("POST");

if (isset($_FILES["fileToUpload"], $_POST["userID"])) {

    $db = loadJSON("../DATABASE/user.json");
    saveJSON("../DATABASE/JSON_BACKUPS/user.json", $db);


    // Kontrollera att allt gick bra med PHP
    // (https://www.php.net/manual/en/features.file-upload.errors.php)
    if ($_FILES["fileToUpload"]["error"] !== 0) {
        $message = ["message" => "Something went wrong with the picture"];
        sendJSON($message, 400);
    }

    // Filen får inte vara större än ~400kb
    if ($_FILES["fileToUpload"]["size"] > (0.4 * 1000 * 1000)) {
        $message = ["message" => "Too large"];
        sendJSON($message, 400);
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
        $db["users"][$_POST["userID"]]["profile_picture"]["filepath"] = "DATABASE/IMAGES/PROFILE/$uniqueFilename.jpg";
        saveJSON("../DATABASE/user.json", $db);
    }



    // JSON-svar när vi testade med att skicka formuläret via JS
    header("Content-Type: application/json");
    sendJSON(["message" => "Uploaded the file: $uniqueFilename"]);
} 



// file_exists($filename); -> Kontrollera om en fil finns eller inte
// unlink($filename);      -> Radera en fil
