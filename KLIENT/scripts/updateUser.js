// Skapar alla element på sidan
// Kollar krav på det som är ifyllt/ska ändras: 
// kalla på samma funktion som sign up.
// Skickar vidare all information till PATCCHHH
// Skickar bildinformationen till POSTIIEE
// Meddelande när allt ändrats som det ska
// Things have changed since i last saw you <3
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
    
  const reqChangeUser = new Request("http://localhost:7001/PATCH/update-user.php", {
  method: "POST",
  body: formData,
  });

  fetch(reqChangeUser)
    .then((response) =>{
        if(response.ok){
            console.log(response);
            return response.json();
        }
        // else{
        //     throw new Error("Something went wrong!");
        // }
       
    })
    .then((data) => {
        console.log("Changed");
        // window.location.replace("http://localhost:2000/explore.php");
    })
    .catch(error => {
        console.log(error);
        // sessionStorage.clear();
    });
});
