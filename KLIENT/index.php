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

<div id="login" class="signInWrap">

    <form id="loginForm" class="signInForm" method="POST">
        <div>
            <label for="username">Username or Email</label>
            <input class="signInInput" type="text", name="username">
        </div>
        <div>
            <label for="password">Password</label>
            <input class="signInInput" type="password", name="password">
        </div>
        <button class="signButton">Login</button>
    </form>
    <div>Don't have an account <p id="registerButton">Register</p>
    </div>

</div>


<?php
echo "<script>";
include_once "scripts/logIn.js";
echo "</script>";

if (isset($_GET["sessionID"])) {
    $_SESSION["sessionID"] = $_GET["sessionID"];
}
?>

<form id="signUpForm" class="signInForm" action="index.php" method="POST">
    <fieldset id="createUserP1">
        <div>
            <label>Firstname *</label>
            <input class="signInInput" type="text" name="firstname" placeholder="Firstname" required>
        </div>
        <div>
            <label>Lastname *</label>
            <input class="signInInput" type="text" name="lastname" placeholder="Lastname" required>
        </div>
        <div>
            <label>Username *</label>
            <input class="signInInput" type="text" name="username" placeholder="Username" required>
        </div>
        <div>
            <label>Password *</label>
            <input class="signInInput" type="password" name="password" placeholder="Password" required>
        </div>
        <div>
            <label>Confrim Password *</label>
            <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password" required>
        </div>
        <div>
            <label>Email *</label>
            <input class="signInInput" type="text" name="email" placeholder="Email" required>
        </div>
        <div>
            <label>Birthday</label>
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
            <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg1" checked>
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_1.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg2">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_2.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg3">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_3.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg4">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_4.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg5">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_5.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg6">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_6.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg7">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_7.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg8">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_8.png" width="100" height="100" alt="">
        </label>

        <input type="file" id="fileToUpload" name="fileToUpload">
        <input type="submit" value="submit" id="signInButton">
    </fieldset>

</form>

<script src="scripts/functions.js"></script>
<script src="scripts/formNavigation.js"></script>
<script src="scripts/stateManager.js"></script>
<script src="scripts/createFormAPI.js"></script>
<script src="scripts/logIn.js"></script>
<script src="scripts/signUp.js"></script>
<?php
echo "<script>";
include_once "scripts/signUp.js";
echo "</script>";
?>