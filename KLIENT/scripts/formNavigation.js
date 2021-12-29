"use strict"

console.log("formNavigation online");
document.getElementById("createUserP1").style.visibility = "hidden";
document.getElementById("createUserP2").style.visibility = "hidden";
document.getElementById("createUserP3").style.visibility = "hidden";


document.getElementById("registerButton").addEventListener("click", () => {

    document.
    console.log("Event Click");
    document.getElementById("login").style.visibility = "hidden";
    document.getElementById("createUserP1").style.visibility = "visible";
});

document.getElementById("next1").addEventListener("click", () => {
    console.log("Event Click 1");
    document.getElementById("createUserP1").style.visibility = "hidden";
    document.getElementById("createUserP2").style.visibility = "visible";
});



