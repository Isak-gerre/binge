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
<div class="movie-profile" id="overlay"></div>

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


<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/search.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/makeTrending.js"></script>
<script src="scripts/friendsRecentlyWatched.js"></script>
<script src="scripts/makeGenreBanners.js"></script>
<script src="scripts/makeExplore.js"></script>


<?php
require_once "footer.php";
?>