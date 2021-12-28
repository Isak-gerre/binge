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
    const rawSignUpData = new FormData(signUpForm);

    let object = {};
    
    for(let [key, value] of rawSignUpData.entries()) {
        object[key] = value;
    }   

    var array = [];
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
    }
    
    object["active_streaming_services"] = array;
    data = JSON.stringify(object);

    const req = new Request("http://localhost:7001/POST/create-user.php", {
        method: "POST",
        body: data
    });

    fetch(req)
    .then(response => response.json())
    .then(data => {
        pictureID = data.pictureID;
        });    

});

let signUpFormImage = document.getElementById("signUpFormImage");

    signUpFormImage.addEventListener("submit", (event) => {
        console.log("SignUpFormImage ok");
        event.preventDefault();
        image = new FormData(signUpFormImage);
        
        if(document.getElementById("fileToUpload").value == ""){
            let form = document.getElementById("profileImgForm");
            image = document.querySelector('input[name="prfoileImg"]:checked').value;
            document.getElementById("signUpFormImage").setAttribute("enctype", "application/json");
        }

        const req1 = new Request("http://localhost:7001/POST/add-profile-picture.php", {
            method: "POST",
            body: pictureID
        });
    
        fetch(req)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            });  
 });


    


