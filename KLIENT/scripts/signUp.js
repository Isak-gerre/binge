"use strict";

document.getElementById("username1").addEventListener("keyup", () => {
  let userexists = {};
  userexists["userexists"] = document.getElementById("username1").value;

  let json = JSON.stringify(userexists);

  const userreq = new Request("https://api.bingy.se/POST/check-user-exists.php", {
    method: "POST",
    body: json,
  });

  fetch(userreq)
    .then(response => response.json())
    .then(data => {
      if(data.error != 0){
        console.log(document.querySelector("#createUserP1 div:nth-child(3) > label"));
        if (data.error == 1) {
          document.querySelector("#createUserP1 div:nth-child(3) > label").textContent = "Username is already in use*";
          document.getElementById("username1").style.color = 'Red';
          document.getElementById("username1").parentElement.style.border = "2px solid red";
        }
        if (data.error == 2) {
          document.querySelector("#createUserP1 div:nth-child(3) > label").textContent = "Username is too short*";
          document.getElementById("username1").style.color = 'Red';
          document.getElementById("username1").parentElement.style.border = "2px solid red";
        } 
      }
      else{
        document.querySelector("#createUserP1 div:nth-child(3) > label").textContent = "Username*";
        document.getElementById("username1").style.color = 'Green';
        document.getElementById("username1").parentElement.style.border = "2px solid Green";
        setTimeout(() => {
          document.getElementById("username1").parentElement.removeAttribute("style");
          document.getElementById("username1").removeAttribute("style");
        }, 5000);
      }

    })
});

let signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(signUpForm);

  let array = [];
  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  for (let i = 0; i < checkboxes.length; i++) {
    array.push(checkboxes[i].value);
  }

  for (let i = 0; i < array.length; i++) {
    formData.append("active_streaming_services[]", array[i]);
  }

  if (document.getElementById("fileToUpload").value == "") {
    let form = document.getElementById("profileImgForm");
    let image = document.querySelector('input[name="profileImg"]:checked').value;
    formData.set("fileToUpload", image);
  }

  const req = new Request("https://api.bingy.se/POST/create-user.php", {
    method: "POST",
    body: formData,
  });

  fetch(req)
    .then((response) => response.json())
    .then((data) => {
      
      if (data.message == "User has been created") {
        saveToSession(data, "session");
        window.location.replace("/explore.php");
      } else {
        console.log("it went wrong");
      }
    });
});