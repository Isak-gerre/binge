<?php

    session_start();

    require "head.php";
    require "functions.php";
    
    $method = $_SERVER["REQUEST_METHOD"];

    if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit();
    }

    // Alla är vällkommna
    header("Access-Control-Allow-Origin: *");
    
    
    
    //Skapar formuläret för inlogg alternativt skapar konto 
    ?><div class="signInWrap">
    
    <form id="loginForm" class="signInForm" method="POST">
        <input class="signInInput" type="text", name="username", placeholder="Username or Email">
        <input class="signInInput" type="password", name="password", placeholder="Password">
        <button class="signButton">Login</button>
    </form>
    <div>Don't have an account <a href="/createUser.php?register">Register</a></div><?php
    if(isset($_GET["wrongPassword"])){
        echo "<a href='/sign-in.php?forgotpassword'>Forgot your password?</a>";
    }  
    ?></div><?php

    

    echo "<script>";
    include_once "scripts/logIn.js"; 
    echo "</script>";
    
    if(isset($_GET["sessionID"])){
        $_SESSION["sessionID"] = $_GET["sessionID"];
    }

    ?><div class="signInWrap">
    
    <form id="signUpForm" class="signInForm" method="POST">
        <p>Firstname</p>
        <input class="signInInput" type="text", name="firstname", placeholder="Firstname">
        <p>Lastname</p>
        <input class="signInInput" type="text", name="lastname", placeholder="Lastname">
        <p>Username</p>
        <input class="signInInput" type="text", name="username", placeholder="Username">
        <p>Password</p>
        <input class="signInInput" type="password", name="password", placeholder="Password">
        <p>Confrim Password</p>
        <input class="signInInput" type="password", name="confirm-password", placeholder="Confirm Password">
        <p>Email</p>
        <input class="signInInput" type="text", name="email", placeholder="Email">
        <p>Birthday</p>
        <input class="signInInput" type="date" name="birthday", placeholder="Birthday">
        <?php
        echo "<script>";
        include_once "scripts/createFormAPI.js"; 
        echo "</script>";
        // echo "<input class='signInInput' type='date' name='birthday', placeholder='Birthday'>";
        
        // <!-- active services -->
        ?>
        <button class="signButton">Sign Up</button>
    </form>
    <?php

    echo "<script>";
    include_once "scripts/signUp.js"; 
    echo "</script>";


    require "footer.php";
?>