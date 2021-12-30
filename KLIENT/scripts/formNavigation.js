"use strict"

console.log("formNavigation online");
document.getElementById("createUserP1").style.display = "none";
document.getElementById("createUserP2").style.display = "none";
document.getElementById("createUserP3").style.display = "none";


document.getElementById("registerButton").addEventListener("click", () => {

    // console.log("Event Click");
    document.getElementById("login").style.opacity = "0";
    document.getElementById("signUpForm").style.display = "flex";
    document.getElementById("createUserP1").style.display = "";

    setTimeout( () => {
        document.getElementById("signUpForm").style.top = "0";
    }, 500);

    setTimeout( () => {
        document.getElementById("login").style.display = "none";
    }, 1000);
});

document.getElementById("next1").addEventListener("click", () => {

    let req = document.querySelectorAll("#createUserP1 input[required]");

    let next = true;

    req.forEach(element => {
        if(element.value == ""){
            console.log(element);
            next = false;

            element.placeholder = "Please fill in this field";
            element.style.color = 'Red';
            setTimeout( () => {
                element.removeAttribute('style');
            }, 1000)
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


let profileImgCheck = document.querySelectorAll('input[name="profileImg"]');
console.log(profileImgCheck);
profileImgCheck.forEach(e => {
    // console.log(e.parentElement);
    e.parentElement.addEventListener("click", () => {
        if(document.querySelector(".profileImgSelected")){
            document.querySelector(".profileImgSelected").classList.remove("profileImgSelected");
        }
        e.parentElement.classList.toggle("profileImgSelected");
    });
    e.addEventListener("click", (event) => {
        event.stopPropagation();
    })
});


