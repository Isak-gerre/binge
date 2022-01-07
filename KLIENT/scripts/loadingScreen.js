
function loadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = "loadingScreen";

    // const logotype = document.createElement('img');
    // logotype.src = "../logos/b-circle.svg";

    const loadingAnimaion = document.createElement('div');
    loadingAnimaion.id = "loadingAnimation";
    loadingAnimaion.style.backgroundImage = "url('../logos/b-circle.svg')";

    loadingScreen.append(loadingAnimaion);

    document.body.append(loadingScreen);
}

function removeLoadingOverlay() {
    document.querySelector(".loadingScreen").remove();
}