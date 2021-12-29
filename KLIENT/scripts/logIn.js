// Skapa log-in formulär på sidan
// Skicka data(POST) till log-in-verification.php
// data kontrolleras(om fält är ifyllda) innan den skickas för att
// Ex. kolla om fälten är ifyllda, om mailen har tecken som @ och . osv.
console.log("hejhej");
const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);


    let error = 0;
    for(let [key, value] of formData.entries()) {
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
        for(let [key, value] of formData.entries()) {
            object[key] = value;
        }   
        
        const req2 = new Request("http://localhost:7001/POST/log-in-verification.php", {
            method: "POST",
            body: formData
        });

        fetch(req2)
            .then(response => {
                if(response.ok){
                    response.json();
                }
                else{
                    throw new Error(response.statusText);
                }
                    
            })
            .then(data => {
                saveToSession(data,'session');
                window.location.replace("http://localhost:2000/feed.php");
            })
            .catch(error => {
                console.log(error);
            }) 
    }
});


