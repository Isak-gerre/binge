<!-- 
    Inkludera head.php 
    Kontrollera om någon är inloggad: isåfall
    skicka till feed
    Script:
    - login.js
    - signUp.js
    
    Inkludera footer.php
 -->

<?php
require_once "head.php";
?>
<div class="movie-profile" id="overlay"></div>

<h1>Bingy</h1>
<div id="wrapper">
</div>

<script src="scripts/functions.js"></script>
<script src="scripts/makeNavigation.js"></script>
<script src="scripts/makeMovieBanners.js"></script>
<script src="scripts/makeMovieProfile.js"></script>

<?php
require_once "footer.php";
?>