<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/error.css">
    <link rel="stylesheet" href="styles/styles.css">
    <title>Error - Something went wrong</title>
</head>

<body>
    <div class="logoDiv">
        <div class="logoImg"></div>
        <div class="slogan">Explore, save and share your favourite movies. </div>
    </div>

    <div class="errorDiv">
        <h1 id="errorText">Something went wrong</h1>
        <p>Sorry! Something went wrong when you tried to access out site!</p>
        <p>Try again in a little while!</p>
        <div id="errorBtn"><a href="/bingy.se/index.php">Try Again!</a></div>
    </div>
    <script src="scripts/functions.js"></script>
    <script>
        if (getParamFromUrl("error") == 1) {
            document.getElementById("errorText").textContent = "Sorry! Our servers are down!"
        }
    </script>

</body>

</html>