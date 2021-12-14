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
    <div id="trending"></div>
    <div id="frw"></div>
    <div id="genre"></div>
</div>

<script src="scripts/functions.js"></script>
<script src="scripts/makeMovieProfile.js"></script>

<?php 
    require_once "footer.php";
?>
 
 