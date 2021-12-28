<?php

require_once "../access-control.php";
require_once "../functions.php";



if(isset($_FILES["fileToUpload"])){
    //Skapar ett unikt bildnamn
    $imgName = $_FILES["fileToUpload"]["name"];
    $imgName = hash("sha256", $imgName + time());
    //Kollar filtyp
    //OBS!!!!: INTE SÄKERT SÄTT ATT KOLLA FIL MEN BÄTTRE ÄN INGET
    if($_FILES["fileToUpload"]["type"] === "image/jpeg"){
        move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "../DATABASE/IMAGES/PROFILE/$imgName.jpg");
        $userData["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/PROFILE\/$imgName.jpg";
    }
}
else{
    $userData["profile_picture"]["filepath"] = $_POST["profileImg"];
}

?>