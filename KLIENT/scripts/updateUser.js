// Skapar alla element på sidan
// Kollar krav på det som är ifyllt/ska ändras: 
// kalla på samma funktion som sign up.
// Skickar vidare all information till PATCCHHH
// Skickar bildinformationen till POSTIIEE
// Meddelande när allt ändrats som det ska
// Things have changed since i last saw you <3

document.getElementById("settingOrPlus").addEventListener("click", () => {
    let form = document.getElementById("signUpForm");

    form.style.display = "block";
    form.style.top = "0";
    form.style.backgroundColor = "black";

    let data = sessionStorage.getItem("session");
    let id = JSON.parse(data).session.userID;
    
    let userInfo = new Request(`http://localhost:7001/GET/get-users.php?ids=${id}`);

    fetch(userInfo)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].region);
            document.querySelector("input[name=firstname]").value = data[0].firstname;
            document.querySelector("input[name=lastname]").value = data[0].lastname;
            document.querySelector("input[name=email]").value = data[0].email;
            document.querySelector("input[name=birthday]").value = data[0].birthday;
            document.querySelector(`option[id=${data[0].region}]`).setAttribute("selected", true);
        })

});