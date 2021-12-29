"use strict"

console.log("formNavigation online");
document.getElementById("createUserP1").style.display = "none";
document.getElementById("createUserP2").style.display = "none";
document.getElementById("createUserP3").style.display = "none";


document.getElementById("registerButton").addEventListener("click", () => {

    console.log("Event Click");
    document.getElementById("login").style.display = "none";
    document.getElementById("createUserP1").style.display = "";
});

document.getElementById("next1").addEventListener("click", () => {
    console.log("Event Click 1");
    document.getElementById("createUserP1").style.display = "none";
    document.getElementById("createUserP2").style.display = "";
});



