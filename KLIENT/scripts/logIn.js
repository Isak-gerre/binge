// Skapa log-in formulär på sidan
// Skicka data(POST) till log-in-verification.php
// data kontrolleras(om fält är ifyllda) innan den skickas för att
// Ex. kolla om fälten är ifyllda, om mailen har tecken som @ och . osv.

if (sessionStorage.length > 0) {
    window.location.href = "feed.php";
}


//trending top
async function trendingMovieBanners(page = 1){
    let trendingMovies = await getTrending(page);
    console.log(trendingMovies);
    
    trendingMovies.forEach(async function (result) {
      addToMovies(result);
      let movieElement = makeMovieBannerFromMovie(result);
      movieElement.setAttribute("name", result.title);
      movieElement.setAttribute("actor", result.actor);
    //   movieElement.classList.add("trending");
      document.querySelector(".loginMoviePreviews").append(movieElement);
    });   
}

trendingMovieBanners();

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

    let errorDiv = document.createElement("div"); 
    errorDiv.setAttribute("id", "errorDiv");
    document.getElementById("loginForm").prepend(errorDiv);

    if(error == 1){
        errorDiv.innerHTML = "Please fill in your username";
    }
    else if(error == 2){
        errorDiv.innerHTML = "Please fill in your password"; 
    }
    else if(error == 3){
        errorDiv.innerHTML = "Please fill in your password and username";
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
                    console.log(response);
                    return response.json();
                }
                else{

                    throw new Error("Password or username is wrong");
                }
                })
            .then(data => { 
                saveToSession(data,'session');
                window.location.replace("http://localhost:2000/feed.php");
            })
            .catch(error => {
                document.getElementById("errorDiv").innerHTML = "Wrong combination of username and password";
                sessionStorage.clear();
                console.log(error);
            });
    }
    if(error == 1 || error == 2 || error == 3){
        if(!document.getElementById("errorDiv")){
            document.getElementById("loginForm").prepend(errorDiv);
        }
        else{
            if(error == 1){
                document.getElementById("errorDiv").innerHTML = "Please fill in your username";
            }
            else if(error == 2){
                document.getElementById("errorDiv").innerHTML = "Please fill in your password"; 
            }
            else if(error == 3){
                document.getElementById("errorDiv").innerHTML = "Please fill in your username and password";
            } 
        }
    }
});


