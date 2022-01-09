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
        next = samePass;

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


let samePass = false;

document.querySelector("input[name=confirm_password]").addEventListener("keyup", () => {

    let check = document.querySelector("#password2").value;
    let value = document.querySelector("input[name=confirm_password]").value;

    if (value === check) {
        samePass = true;
        document.querySelector("input[name=confirm_password]").parentElement.removeAttribute("style");
        document.querySelector("input[name=confirm_password]").removeAttribute("style");
    }
    else {
        document.querySelector("input[name=confirm_password]").parentElement.style.border = "2px solid red";
        document.querySelector("input[name=confirm_password]").placeholder = "Passwords do not match";
        document.querySelector("input[name=confirm_password]").style.color = 'Red';
        setTimeout(() => {
            document.querySelector("input[name=confirm_password]").parentElement.removeAttribute("style");
            document.querySelector("input[name=confirm_password]").removeAttribute("style");
        }, 1000);
        samePass = false;
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