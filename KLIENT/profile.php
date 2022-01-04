<?php
// Inkludera head.php 
// Script:
// - makeUserProfile

// Element som ska vara statiska, 
// skapas här

// Kontrollera om inloggad -> Annars skicka till index.php

// Inkludera footer.php

if ($method === "OPTIONS") {
    // Tillåt alla (origins) och alla headers
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");
    exit();
}

// Alla är vällkommna
header("Access-Control-Allow-Origin: *");


require_once "head.php";
?>
<div class="movie-profile-background"></div>

<div id="topWrapperProfile">
    <div id="profilePic"></div>
    <div id="profileInfo">
        <div id="usernameDiv">
            <p id="username"></p>
            <div id="settingOrPlus"></div>
        </div>

        <div id="followInfo">
            <div id="followersDiv">
                <p>Followers</p>
                <p id="followers"></p>
            </div>
            <div id="followingDiv">
                <p>Following</p>
                <p id="following"></p>
            </div>
        </div>
    </div>
</div>

<nav id="profileNav">
    <div id="watched">
        <p>Watched</p>
    </div>

    <div id="watchlist">
        <p>Watchlist</p>
    </div>

    <div id="stats">
        <p>Stats</p>
    </div>
</nav>

<div id="profileWrapper">
    <!-- <canvas id="ctx" width="400" height="400"></canvas> -->
</div>


<form id="signUpForm" class="signInForm" action="index.php" method="POST">
    <div id="settingsh1">
        <h1>Settings</h1>
    </div>
    <fieldset id="createUserP3" style="display:none">
        <div id="avatars">
            <p>Choose an avatar</p>
            <label>
                <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg1" checked>
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_1.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg2">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_2.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg3">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_3.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg4">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_4.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg5">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_5.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg6">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_6.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg7">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_7.png" width="100" height="100" alt="">
            </label>
            <label>
                <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg8">
                <img src="http://localhost:7001/DATABASE\/IMAGES\/AVATAR\/avatar_8.png" width="100" height="100" alt="">
            </label>
        </div>
        <div id="uploadProfilePic">
            <p>Or upload your own profile picture</p>
            <input type="file" id="fileToUpload" name="fileToUpload">
        </div>
    </fieldset>
    <fieldset id="createUserP1">
        <div id="input">
            <label>Firstname</label>
            <input class="signInInput" type="text" name="firstname" placeholder="Firstname">
        </div>
        <div id="input">
            <label>Lastname</label>
            <input class="signInInput" type="text" name="lastname" placeholder="Lastname">
        </div>
        <!-- <div id="input">
            <label>Username</label>
            <input class="signInInput" type="text" id="username1" name="username" placeholder="Username" required>
        </div> -->
        <div id="input">
            <label>Old Password</label>
            <input class="signInInput" type="password" name="old_password" placeholder="Old Password">
        </div>
        <div id="input">
            <label>New Password</label>
            <input class="signInInput" type="password" id="password2" name="password" placeholder="New Password">
        </div>
        <div id="input">
            <label>Confirm Password</label>
            <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password">
        </div>
        <div id="input">
            <label>Email</label>
            <input class="signInInput" type="text" name="email" placeholder="Email">
        </div>
        <div id="input">
            <label>Birthday</label>
            <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
    </fieldset>
    <fieldset id="createUserP2">
        <p>Choose your streaming providers</p>
        <?php
        echo "<script>";
        include_once "scripts/createFormApiSettings.js";
        echo "</script>";
        ?>
    </fieldset>
    <input type="submit" value="Update account" id="signInButton">
</form>


<script src="Lib/node_modules/chart.js/dist/chart.js"></script>
<script src="Lib/moment/moment.min.js"></script>
<script src="Lib/pressure/pressure.min.js"></script>
<script src="scripts/functions.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/search.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/stats.js"></script>
<script src="scripts/formNavigationSettings.js"></script>
<script src="scripts/createFormApiSettings.js"></script>
<script src="scripts/updateUser.js"></script>
<script src="scripts/signUp.js"></script>
<script src="scripts/makeUserProfile.js"></script>

<?php

echo "<script>";
include_once "scripts/signUp.js";
echo "</script>";


require_once "footer.php";
?>