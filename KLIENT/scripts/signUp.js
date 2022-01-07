// * Skapa formulär
// * Skicka uppgifterna (för- & efternamn, username, email, password och birthday = KRAV) till create-user.php
// får tillbaka id från server av den nya användaren --> skickas till feed, sparar id i session
// * Vid skapandet av användaren ska en få live-uppdatering
// om anvnändarnamnet är upptaget eller ej, samt email,
// det innebär onChange/keyup
// * (om två fält av lösenord = dubbekolla likheten)
// * Hämta fyra random AVATARER
//

document.querySelector(".backLogin").addEventListener("click", () => {
  window.location.href = `index.php`;
});

document.getElementById("username1").addEventListener("keyup", () => {

  let userexists = {};

  userexists["userexists"] = document.getElementById("username1").value;

  let json = JSON.stringify(userexists);

  const userreq = new Request("http://localhost:7001/POST/check-user-exists.php", {
    method: "POST",
    body: json,
  });

  fetch(userreq)
    .then(response => {
      if(response.ok){
        return response.json();
      }
      else{
        throw new Error(response.json());
      }
    })
    .then(data => {
      document.getElementById("username1").style.color = 'Green';
      document.getElementById("username1").parentElement.style.border = "2px solid Green";
      setTimeout( () => {
          document.getElementById("username1").parentElement.removeAttribute("style");
          document.getElementById("username1").removeAttribute("style");
      }, 5000);
    })
    .catch(error => {
      console.log(error);
      document.getElementById("username1").style.color = 'Red';
      document.getElementById("username1").parentElement.style.border = "2px solid red";
    });

});


let signUpForm = document.getElementById("signUpForm");

// document.querySelector(".backLogin").addEventListener("click", () => {
//   window.location.href = `index.php`;
// });

signUpForm.addEventListener("submit", (event) => {
  console.log("SignUpForm ok");
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
    image = document.querySelector('input[name="profileImg"]:checked').value;
    formData.set("fileToUpload", image);
  }
    
  const req = new Request("http://localhost:7001/POST/create-user.php", {
  method: "POST",
  body: formData,
  });

  fetch(req)
    .then((response) =>{
        if(response.ok){
            console.log(response);
            return response.json();
        }
        else{
            throw new Error();
        }
       
    })
    .then((data) => {
        saveToSession(data, "session");
        window.location.replace("http://localhost:2000/explore.php");
    })
    .catch(error => {
        console.log(error);
        sessionStorage.clear();
    });
});

