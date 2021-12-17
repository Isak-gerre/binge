<!-- 
    Inkludera head.php 
    Script:
    - makeUserProfile

    Element som ska vara statiska, 
    skapas här
    
    Kontrollera om inloggad -> Annars skicka till index.php

    Inkludera footer.php
 -->


<?php
require_once "head.php";
?>

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

<script src="node_modules/chart.js/dist/chart.js"></script>
<script src="scripts/functions.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/search.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/stats.js"></script>
<script src="scripts/createFormAPI.js"></script>
<script src="scripts/updateUser.js"></script>
<script src="scripts/makeUserProfile.js"></script>

<?php 
    require_once "footer.php";
?>
 
