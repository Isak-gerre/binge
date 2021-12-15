<!-- 
    Inkludera head.php 
    Script:
    - makeUserProfile

    Element som ska vara statiska, 
    skapas här
    

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
        <p>Wacthed</p>
    </div>

    <div id="watchlist">
        <p>Wacthlist</p>
    </div>

    <div id="stats">
        <p>Stats</p>
    </div>
</nav>

<div id="profileWrapper">
    
</div>


<script src="scripts/makeMovieProfile.js"></script>
<script src="scripts/makeNavigation.js"></script>


<?php 
    require_once "footer.php";
?>
 