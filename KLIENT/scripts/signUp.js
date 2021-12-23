// * Skapa formulär 
// * Skicka uppgifterna (för- & efternamn, username, email, password och birthday = KRAV) till create-user.php
// får tillbaka id från server av den nya användaren --> skickas till feed, sparar id i session
// * Vid skapandet av användaren ska en få live-uppdatering
// om anvnändarnamnet är upptaget eller ej, samt email,
// det innebär onChange/keyup
// * (om två fält av lösenord = dubbekolla likheten)
// * Hämta fyra random AVATARER
//


if(signUpForm){
    console.log(signUpForm);
    signUpForm.addEventListener("submit", (event) => {
    
        event.preventDefault();
        const rawSignUpData = new FormData(signUpForm);
    
        let object = {};
        for(let [key, value] of rawSignUpData.entries()) {
            object[key] = value;
        }   
        data = JSON.stringify(object);

        var array = [];
        var checkboxes = document.querySelectorAll('input[type=checkbox]:checked');

        for (var i = 0; i < checkboxes.length; i++) {
            array.push(checkboxes[i].value)
          }
        
        object["active_streaming_services"] = array;

        data = JSON.stringify(object);

        const req = new Request("http://localhost:1005/POST/create-user.php", {
            method: "POST",
            body: data,
        });

        fetch(req)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                });    
    });
}