
<?php
    /*
    * Dubbelkolla igen om det är en unik användare,
    är mailen och användarnamnet redan upptaget?
    Spara användaren(ID) eller skicka tillbaka uppgifterna 
    vid fel. 
    * alla nycklar ska läggas in oavsett om de är ifyllda eller tomma
    * Bilden ska sparas i mappen IMAGES > PROFILE 
    */


    //Kollar så att method är POST annars exitar den (Error bör läggas till)

    require_once "../access-control.php";
    require_once "../functions.php";
    
    $method = $_SERVER["REQUEST_METHOD"];

    if($method != "POST"){
        exit();
    }

    //Kollar alla imputs och laddat hem databasen

    $rawUserData = file_get_contents("php://input");
    $userData = json_decode($rawUserData, true);
    
    //Kollar om användaren redan finns både användarnamn och även email (denna request bör skickas vid varje keypress och inte endast vist submit)
    
    $db = loadJSON("../DATABASE/user.json");
        foreach($db["users"] as $key){
            if($key["username"] === $userData["username"]){
                sendJSON(["message" => "Username is already in use"], 409);
                exit();
            }
            else if($key["email"] === $userData["email"]){
                sendJSON(["message" => "Email is already in use"], 409);
                exit();
            }
        }
    
        //Kollar om det finns en fileToUpload nyckeln finns med som är profilbilden. Om den finns skapas nyckeln. (Denna kommer ha en defult)
            //Lägger användaren som nästa ID
            $nextID = nextHighestId($db["users"]);
            //Kollar så att det är samma lösenord mellan password och confirm password
            if ($userData["password"] != $userData["confirm_password"]){
                sendJSON(["message" => "Passwords do not match"], 409);
            }
            else{
                //Hashar lösenordet
                $hashedPassword = password_hash($userData['password'], PASSWORD_DEFAULT);
            }

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
            

            //Använder en foreach för att göra alla inskickade värden till ett object med användarens alla nycklar
            foreach($userData as $key => $value){
                if($key === "firstname" || $key === "lastname" || $key === "email" || $key === "username"){
                    if(empty($value)){
                        sendJSON(["message" => "All requiered fields have not been filled in"], 409);
                    } 
                }
                //Ser till att confirm password inte kommer med
                if($key != "confirm_password"){
                    $db["users"]["$nextID"][$key] = $value;
                }
                //Ändrar lösen till det hashade
                if($key === "password"){
                    $db["users"]["$nextID"][$key] = $hashedPassword;
                }                
            }

            //Skapar nycklarna followers och following
            $db["users"]["$nextID"]["followers"] = [];
            $db["users"]["$nextID"]["following"] = [];
            
            //Skapar ett ID som är hashed och lägger in det under id nycklen
            $hashedUserId = password_hash($nextID, PASSWORD_DEFAULT);
            $db["users"]["$nextID"]["sessionId"] = $hashedUserId;
            $db["users"]["$nextID"]["id"] = $nextID;
            $db["users"]["$nextID"]["profile_picture"] = $nextID;
            
            //Sparar användaren det i databasen
            saveJSON("../DATABASE/user.json", $db);
            sendJSON(["message" => "User has been created", "pictureID" => $nextID], 200);
    
?>