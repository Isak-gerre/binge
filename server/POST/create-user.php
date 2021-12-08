
<?php
    /*
    * Dubbelkolla igen om det är en unik användare,
    är mailen och användarnamnet redan upptaget?
    Spara användaren(ID) eller skicka tillbaka uppgifterna 
    vid fel. 
    * alla nycklar ska läggas in oavsett om de är ifyllda eller tomma
    * Bilden ska sparas i mappen IMAGES > PROFILE 
    */

    require_once "../access-control.php";
    require_once "../functions.php";
    
    $method = $_SERVER["REQUEST_METHOD"];

    $rawUserData = file_get_contents("php://input");
    $userData = json_decode($rawUserData, true);

    
    $db = loadJSON("../DATABASE/user.json");

        if(alreadyTaken($db["users"], "username", $userData["username"])){
        sendJSON(["message" => "Username is already in use"], 409);
        exit();
    }
        else if(alreadyTaken($db["users"], "email", $userData["email"])){
            sendJSON(["message" => "Email is already in use"], 409);
            exit();
        }
        else{
            if(isset($_FILES["fileToUpload"])){

                $imgName = $_FILES["fileToUpload"]["name"];
                $imgName = hash("sha256", $imgName + time());

                //OBS!!!!: INTE SÄKERT SÄTT ATT KOLLA FIL MEN BÄTTRE ÄN INGET
                if($_FILES["fileToUpload"]["type"] === "image/jpeg"){
                    move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], "../DATABASE/IMAGES/PROFILE/$imgName.jpg");
                    $userData["profile_picture"]["filepath"] = "DATABASE\/IMAGES\/PROFILE\/$imgName.jpg";
                }
            }
              
            $nextID = nextHighestId($db["users"]);
            
            foreach($userData as $key => $value){
                $db["users"]["$nextID"][$key] = $value;
            }

            $db["users"]["$nextID"]["id"] = $nextID; 

            saveJSON("../DATABASE/user.json", $db);
            sendJSON(["message" => "User has been created"], 200);
        }
    
?>