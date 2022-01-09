<?php
// Inkludera head.php 
// Script:
// - makeUserProfile

// Element som ska vara statiska, 
// skapas här

require_once "head.php";
?>
<div class="drop3"></div>
<div class="drop4"></div>
<div class="movie-profile-background"></div>

<div id="pWrapper">

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
        <p>Activities</p>
    </div>

        <div id="watchlist">
            <p>Watchlist</p>
        </div>

        <div id="stats">
            <p>Stats</p>
        </div>
    </nav>

<div id="profileWrapper">
</div>

<script src="Lib/node_modules/chart.js/dist/chart.js"></script>
<script src="Lib/pressure/pressure.min.js"></script>
<script src="Lib/moment/moment.min.js"></script>
<script src="scripts/functions.js"></script>
<script src="scripts/stateManager.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/search.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/stats.js"></script>
<script src="scripts/createFormAPIsettings.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js" async></script>
<script src="scripts/updateUser.js"></script>
<script src="scripts/makeUserProfile.js"></script>

<?php
require_once "footer.php";
?>