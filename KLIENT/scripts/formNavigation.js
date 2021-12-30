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

    let req = document.querySelectorAll("#createUserP1 input[required]");

    let next = true;

    req.forEach(element => {
        if(element.value == ""){
            console.log(element);
            next = false;

            let fillIn = document.createElement("p");
            fillIn.innerHTML = "Please fill in this field";
            element.parentElement.append(fillIn);
        }
    });
    console.log(next);
    if(next){
        console.log("Event Click 1");
        document.getElementById("createUserP1").style.display = "none";
        document.getElementById("createUserP2").style.display = "";
    }
    else{

    }
 
});



