<!-- 
    Inkludera head.php 
    Script:
    - makefeed.js
    - makeNavigation.js
    Inkludera footer.php
 -->



<?php
require_once "head.php";
?>

<div class="movie-profile-background"></div>

<div id="wrapper"></div>
<script src="scripts/loadingScreen.js"></script>
<script src="Lib/moment/moment.min.js"></script>
<script src="scripts/functions.js"></script>
<script src="scripts/stateManager.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/search.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/makeFeed.js"></script>


<?php
require_once "footer.php";
?>