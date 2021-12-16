<!-- 
    Inkludera head.php 
    Script:
    - makeTrending
    - FriendsRecentlyWatched
    - MakeGenreBanners
    - makeNavigation.js

    Inkludera footer.php
 -->


<?php
require_once "head.php";
?>

<h1>Bingy</h1>
<div id="wrapper">
    <div id="trending">
        <div class="slideshow-container">
            <div class="slideshow">
                <!-- <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img>
                <img id="firstClone"> -->
            </div>
        </div>
    </div>
    <div id="frw"></div>
    <div id="genre"></div>
</div>

<script src="scripts/functions.js"></script>
<script src="scripts/makeMovieProfile.js"></script>
<script src="scripts/makeTrending.js"></script>
<script src="scripts/makeNavigation.js"></script>


<?php
require_once "footer.php";
?>