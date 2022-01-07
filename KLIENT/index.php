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

require "head.php";

//Skapar formuläret för inlogg alternativt skapar konto 
?>
<div class="previewWrapper">
    <div class="loginMoviePreviews"></div>
    <div class="loginMoviePreviewsOverlay"></div>
</div>
<div class="logoDiv">
    <div class="logoImg"></div>
    <div class="slogan">Explore, save and share your favourite movies. </div>
</div>
<div class="movie-profile-background"></div>

<div id="login" class="signInWrap">
    <div>
        <h1>Welcome!</h1>
        <p>Log in to your account.</p>
    </div>

    <form id="loginForm" class="signInForm" method="POST">
        <div id="input">
            <label for="username">Username or Email</label>
            <input class="signInInput" type="text" name="username">
        </div>
        <div id="input">
            <label for="password">Password</label>
            <input class="signInInput" type="password", name="password">
        </div>
        <button class="signButton">Login</button>
    </form>
    <div id="createAccount">
        <p>Don't have an account? <span id="registerButton">Sign up</span></p>
    </div>
    
    

</div>

<form id="signUpForm" class="signInForm" action="index.php" method="POST">
    <div>
        <h1>Sign Up</h1>
    </div>
    <fieldset id="createUserP1">
        <div id="input">
            <label>Firstname *</label>
            <input class="signInInput" type="text" name="firstname" placeholder="Firstname" required>
        </div>
        <div id="input">
            <label>Lastname *</label>
            <input class="signInInput" type="text" name="lastname" placeholder="Lastname" required>
        </div>
        <div id="input">
            <label>Username *</label>
            <input class="signInInput" type="text" id="username1" name="username" placeholder="Username" required>
        </div>
        <div id="input">
            <label>Password *</label>
            <input class="signInInput" type="password" id="password2" name="password" placeholder="Password" required>
        </div>
        <div id="input">
            <label>Confirm Password *</label>
            <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password" required>
        </div>
        <div id="input">
            <label>Email *</label>
            <input class="signInInput" type="text" name="email" placeholder="Email" required>
        </div>
        <div id="input">
            <label>Birthday</label>
            <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
        <button type="button" id="next1">Next</button>
        <button type="button" class="backLogin" onclick="window.location.href = `index.php`">Back to log in</button>
    </fieldset>
    <fieldset id="createUserP2">
        <p>Choose your streaming providers</p>
        <?php
        // echo "<script>";
        // include_once "scripts/createFormAPI.js";
        // echo "</script>";
        ?>
    </fieldset>
    <fieldset id="createUserP3">
        <div id="avatars">
            <p>Choose an avatar</p>
            <label class="profileImgSelected">
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
        </div>
        <div id="uploadProfilePic">
            <p>Or upload your own profile picture</p>
            <input type="file" id="fileToUpload" name="fileToUpload">
        </div>
        <button type="button" class="backLogin" onclick="window.location.href = `index.php`">Back to log in</button>
        <input type="submit" value="Create account" id="signInButton">

    </fieldset>

</form>

<script src="scripts/functions.js"></script>
<script src="scripts/formNavigation.js"></script>
<script src="scripts/stateManager.js"></script>
<script src="scripts/createFormAPI.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/logIn.js"></script>
<script src="scripts/signUp.js"></script>
<?php
// echo "<script>";
// include_once "scripts/signUp.js";
// echo "</script>";
?>