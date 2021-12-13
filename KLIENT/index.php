<?php

    require_once "includes/head.php";
    
    
    //Skapar formuläret för inlogg alternativt skapar konto 
        ?><div class="signInWrap">
        
        <form class="signInForm" method="POST" action="sign-in.php">
            <input class="signInInput" type="text", name="user", placeholder="Username or Email">
            <input class="signInInput" type="password", name="password", placeholder="Password">
            <input class="signButton" type="submit", value="Login">
        </form>
        <div>Don't have an account <a href="/createUser.php?register">Register</a></div><?php
        if(isset($_GET["wrongPassword"])){
            echo "<a href='/sign-in.php?forgotpassword'>Forgot your password?</a>";
        }  
        ?></div><?php
    }
    // if(isset($_GET["forgotpassword"])){ //Om nyckeln för forgotpassword klickas så körs forgotpassword formuläret 
    //     echo forgotPasswordForm();
    // }
    // if(isset($_GET["resetpassword"])){ //Om nyckeln för resetpassword klickas så körs forgotpassword functionen som ändrar lösenord
    //     echo forgotPassword($dataUsers);
    // }


    //Ser till att alla fällt är ifyllda
    if(isset($_SESSION["id"]) && $_SESSION["login"] === "key123"){
        header("location:/index.php");
    }

    //Kollar vilket fält som inte är ifyllt för att informera användaren om vad som saknas 
    if(isset($_POST["user"]) && isset($_POST["password"])){
        if($_POST["user"] === "" && $_POST["password"] === ""){
          ?><script>alert("Missing Username and Password")</script><?php
        }
        else if($_POST["user"] === ""){
            ?><script>alert("Missing Username")</script><?php
          }
        else if($_POST["password"] === ""){
          ?><script>alert("Missing Password")</script><?php
        }
        else{

            // Laddar hem databasen
            $db = getUsers();
            $user = "";
            // Kollar så att en användare finns basserat på om mail eller användarnamn användes
            if(strpos($_POST["user"], "@")){
                if(array_search($_POST["user"], array_column($users, "email")) !== false){
                    $user = $users[array_search($_POST["user"], array_column($users, "email"))];
                }
            }
            else{
                if(array_search($_POST["user"], array_column($users, "username")) !== false){
                    $user = $users[array_search($_POST["user"], array_column($users, "username"))];

                }
            }
            if($user){
                //Ser till att lösenordet är rätt och sparar id på användaren
                if(password_verify($_POST["password"], $user["password"])){
                    $_SESSION["user"] = $user["username"];
                    $_SESSION["id"] = $user["id"];
                    header("location:list.php");
                    //Ser till att naven ändras och skickar användaren vidare
                }
                else{
                    //Om lösenordet inte stämmer får använadren felmedelande
                    ?><script>alert("The Password and Username did not Match")</script><?php
                    header("location:/sign-in.php?wrongPassword");
                    //Lägger till nyckeln worongPassword som används 
                    //högre upp i koden för att lägga till länken för glömt lösenord
                }
            }
            else{
                //Om användare inte finns får använadren felmedelande
                ?><script>alert("The Password and Username did not Match")</script><?php
                header("location:/sign-in.php?wrongPassword"); 
                //Lägger till nyckeln worongPassword som används 
                //högre upp i koden för att lägga till länken för glömt lösenord
            }
        }
    }

    require_once "includes/footer.php";
?>