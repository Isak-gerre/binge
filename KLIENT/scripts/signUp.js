// * Skapa formulär
// * Skicka uppgifterna (för- & efternamn, username, email, password och birthday = KRAV) till create-user.php
// får tillbaka id från server av den nya användaren --> skickas till feed, sparar id i session
// * Vid skapandet av användaren ska en få live-uppdatering
// om anvnändarnamnet är upptaget eller ej, samt email,
// det innebär onChange/keyup
// * (om två fält av lösenord = dubbekolla likheten)
// * Hämta fyra random AVATARER
//

let data;
let image;
let pictureID;

let signUpForm = document.getElementById("signUpForm");

signUpForm.addEventListener("submit", (event) => {
  console.log("SignUpForm ok");
  event.preventDefault();
  const formData = new FormData(signUpForm);

  // let object = {};

  // for(let [key, value] of rawSignUpData.entries()) {
  //     object[key] = value;
  // }

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
    console.log(image);
    formData.set("fileToUpload", image);
  }

  // object["active_streaming_services"] = array;
  // data = JSON.stringify(object);

  const req = new Request("http://localhost:7001/POST/create-user.php", {
    method: "POST",
    body: formData,
  });

  fetch(req)
    .then((response) =>{
        if(response.ok){
            return response.json();
        }
        else{
            throw new Error("Something went wrong!");
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
