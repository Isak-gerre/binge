<?php
    session_start();
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
?>

<div id="login"  class="signInWrap">

    <form id="loginForm" class="signInForm" method="POST">
        <input class="signInInput" type="text", name="username", placeholder="Username or Email">
        <input class="signInInput" type="password", name="password", placeholder="Password">
        <button class="signButton">Login</button>
    </form>
    <div>Don't have an account <p id="registerButton">Register</p></div>

</div>


<?php
    echo "<script>";
    include_once "scripts/logIn.js"; 
    echo "</script>";
    
    if(isset($_GET["sessionID"])){
        $_SESSION["sessionID"] = $_GET["sessionID"];
    }
?>

<form id="signUpForm" class="signInForm" action="index.php" method="POST">
    <fieldset id="createUserP1">
        <div>
        <p>Firstname</p>
        <input class="signInInput" type="text" name="firstname" placeholder="Firstname">
        </div>
        <div>
        <p>Lastname</p>
        <input class="signInInput" type="text" name="lastname" placeholder="Lastname">
        </div>
        <div>
        <p>Username</p>
        <input class="signInInput" type="text" name="username" placeholder="Username">
        </div>
        <div>
        <p>Password</p>
        <input class="signInInput" type="password" name="password" placeholder="Password">
        </div>
        <div>
        <p>Confrim Password</p>
        <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password">
        </div>
        <div>
        <p>Email</p>
        <input class="signInInput" type="text" name="email" placeholder="Email">
        </div>
        <div>
        <p>Birthday</p>
        <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
        <button type="button" id="next1">Next</button>
    </fieldset>
    <fieldset id="createUserP2">
        <p>Choose your streaming providers</p>
    <?php
        echo "<script>";
        include_once "scripts/createFormAPI.js"; 
        echo "</script>";
    ?>
    </fieldset>
    <fieldset id="createUserP3">
        <label>
            <input name="prfoileImg" id="profileImg1" type="radio" value="profileImg1" checked>
            <img src="http://localhost:7001/DATABASE/IMAGES/PROFILE/ivankaa.jpg"  width="100" height="100" alt="">
        </label>
        <label>
            <input name="prfoileImg" id="profileImg2" type="radio" value="profileImg2">
            <img src="http://localhost:7001/DATABASE/IMAGES/PROFILE/izakiii.jpg"   width="100" height="100" alt="">
        </label>
        <label>
            <input name="prfoileImg" id="profileImg3" type="radio" value="profileImg3">
            <img src="http://localhost:7001/DATABASE/IMAGES/PROFILE/enismattis.jpg"  width="100" height="100" alt="">
        </label>
        <label>
            <input name="prfoileImg" id="profileImg4" type="radio" value="profileImg4">
            <img src="http://localhost:7001/DATABASE/IMAGES/PROFILE/nikokick.jpg"   width="100" height="100" alt="">
        </label>
        
        <input type="file" id="fileToUpload" name="fileToUpload">
        <input type="submit" value="submit" id="signInButton">
    </fieldset>
    
</form>

    

<!-- <form action="index.php" enctype="multipart/form-data" id="signUpFormImage" method="POST">
    <input type="file" id="fileToUpload" name="fileToUpload">
    <input type="submit" value="upload">
</form> -->

<script src="scripts/functions.js"></script>
<script src="scripts/formNavigation.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/stateManager.js"></script>
<script src="scripts/createFormAPI.js"></script>
<script src="scripts/logIn.js"></script>
<script src="scripts/signUp.js"></script>
<?php
    echo "<script>";
    include_once "scripts/signUp.js"; 
    echo "</script>";
?>