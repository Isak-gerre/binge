// Skapa log-in formulär på sidan
// Skicka data(POST) till log-in-verification.php
// data kontrolleras(om fält är ifyllda) innan den skickas för att
// Ex. kolla om fälten är ifyllda, om mailen har tecken som @ och . osv.
console.log("hejhej");
const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const rawData = new FormData(form);


    let error = 0;
    for(let [key, value] of rawData.entries()) {
        if(key === "username" && value === ""){
            error += 1;
        }
        else if(key === "password" && value === ""){
            error += 2;
        }
    }   

    if(error == 1){
        alert("Please fill in your username");
    }
    else if(error == 2){
        alert("Please fill in your password"); 
    }
    else if(error == 3){
        alert("Please fill in your password and username");
    }
    else if(error == 0){

        let object = {};
        for(let [key, value] of rawData.entries()) {
            object[key] = value;
        }   

        data = JSON.stringify(object);
        console.log(data);

        const req = new Request("http://localhost:1005/POST/log-in-verification.php", {
            method: "POST",
            body: data,
        });

        fetch(req)
            .then(response => response.json())
            .then(data => {
                window.location.replace(`http://localhost:4005?sessionID=${data.SessionId}`);
                window.location.replace("http://localhost:4005");
            }); 
    }
});


