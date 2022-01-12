"use strict"

document.getElementById("createUserP1").style.display = "none";
document.getElementById("createUserP2").style.display = "none";
document.getElementById("createUserP3").style.display = "none";

function checkStuff() {
    if (document.querySelector("#password2").value === document.querySelector("input[name=confirm_password]").value) {
        let req = document.querySelectorAll("#createUserP1 input[required]");
        let next = true;

        req.forEach(element => {
            if (element.value == "") {
                next = false;

                element.parentElement.style.outline = "2px solid red";
                element.placeholder = "Please fill in this field";
                element.style.color = 'Red';
                setTimeout(() => {
                    element.parentElement.removeAttribute("style");
                    element.removeAttribute('style');
                }, 1000)
            }
        });
        if(!check1 || !check2){
            next = false;
        }

        if (next) {
            document.getElementById("createUserP1").style.display = "none";
            document.getElementById("createUserP2").style.display = "";
        }
    }
    else {
        document.querySelector("input[name=confirm_password]").parentElement.style.border = "2px solid red";
        document.querySelector("input[name=confirm_password]").placeholder = "Passwords do not match";
        document.querySelector("input[name=confirm_password]").style.color = 'Red';
        setTimeout(() => {
            document.querySelector("input[name=confirm_password]").parentElement.removeAttribute("style");
            document.querySelector("input[name=confirm_password]").removeAttribute("style");
        }, 1000);
    }
}

document.getElementById("registerButton").addEventListener("click", () => {

    document.getElementById("login").style.opacity = "0";
    document.querySelector(".previewWrapper").style.opacity = "0";
    document.querySelector(".logoDiv").style.opacity = "0";

    document.getElementById("signUpForm").style.display = "flex";
    document.getElementById("createUserP1").style.display = "";

    setTimeout(() => {
        document.getElementById("signUpForm").style.top = "0";
    }, 500);

    setTimeout(() => {
        document.getElementById("login").style.display = "none";
    }, 1000);
});


let check1 = false;
let check2 = false;


document.querySelector("#password2").addEventListener("keyup", () => {
    let password = document.querySelector("#password2");
    if(password.value.length == 0){
        document.querySelector("#createUserP1 div:nth-child(4) > label").textContent = "Password *";
        check1 = false;
    }
    else if(password.value.length < 8){
        document.querySelector("#createUserP1 div:nth-child(4) > label").textContent = "Password has to be atleast eight characters";
        document.querySelector("#password2").parentElement.style.border = "2px solid red";
        document.querySelector("#password2").style.color = 'Red';
        check1 = false;
    }
    else{
        document.querySelector("#password2").parentElement.style.border = "2px solid green";
        document.querySelector("#password2").style.color = 'Green';
        setTimeout(() => {
            document.querySelector("#password2").parentElement.removeAttribute("style");
            document.querySelector("#password2").removeAttribute("style");
        }, 1000)
        document.querySelector("#createUserP1 div:nth-child(4) > label").textContent = "Password *";
        check1 = true;
    }
});


document.querySelector("input[name=confirm_password]").addEventListener("keyup", () => {
    let check = document.querySelector("#password2").value;
    let value = document.querySelector("input[name=confirm_password]").value;

    if (value === check) {
        check2 = true;
        document.querySelector("#createUserP1 div:nth-child(5) > label").textContent = "Confirm Password *";

        document.querySelector("input[name=confirm_password]").parentElement.style.border = "2px solid green";
        document.querySelector("input[name=confirm_password]").style.color = 'Green';
        setTimeout(() => {
            document.querySelector("input[name=confirm_password]").parentElement.removeAttribute("style");
            document.querySelector("input[name=confirm_password]").removeAttribute("style");
        }, 1000)

        
    }
    else {
        document.querySelector("input[name=confirm_password]").parentElement.style.border = "2px solid red";
        document.querySelector("#createUserP1 div:nth-child(5) > label").textContent = "Passwords do not match*";
        document.querySelector("input[name=confirm_password]").style.color = 'Red';
        check2 = false;
    }
});

document.getElementById("next1").addEventListener("click", () => {
    checkStuff();
});

document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        checkStuff();
    }
});

let profileImgCheck = document.querySelectorAll('input[name="profileImg"]');
profileImgCheck.forEach(e => {
    e.parentElement.addEventListener("click", () => {
        if (document.querySelector(".profileImgSelected")) {
            document.querySelector(".profileImgSelected").classList.remove("profileImgSelected");
        }
        e.parentElement.classList.toggle("profileImgSelected");
    });
    e.addEventListener("click", (event) => {
        event.stopPropagation();
    })
});

let backBtn = document.querySelector(".backLogin");

backBtn.addEventListener('click', () => {
    if (document.getElementById('createUserP1').style.display != "none") {

        document.getElementById("signUpForm").style.top = "100vh";

        setTimeout(() => {
            document.getElementById("signUpForm").style.display = "none";
            document.getElementById("login").style.display = "flex";
        }, 1100);

        setTimeout(() => {
            document.getElementById("login").style.opacity = "1";
            document.querySelector(".previewWrapper").style.opacity = "1";
            document.querySelector(".logoDiv").style.opacity = "1";
        }, 1100);

    } else if (document.getElementById('createUserP2').style.display != "none") {
        document.getElementById('createUserP2').style.display = "none";
        document.getElementById('createUserP1').style.display = "";
    } else if (document.getElementById('createUserP3').style.display != "none") {
        document.getElementById('createUserP3').style.display = "none";
        document.getElementById('createUserP2').style.display = "";
    }
});