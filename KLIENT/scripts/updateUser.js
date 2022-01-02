// Skapar alla element på sidan
// Kollar krav på det som är ifyllt/ska ändras: 
// kalla på samma funktion som sign up.
// Skickar vidare all information till PATCCHHH
// Skickar bildinformationen till POSTIIEE
// Meddelande när allt ändrats som det ska
// Things have changed since i last saw you <3

// Skapar alla element på sidan
// Kollar krav på det som är ifyllt/ska ändras: 
// kalla på samma funktion som sign up.
// Skickar vidare all information till PATCCHHH
// Skickar bildinformationen till POSTIIEE
// Meddelande när allt ändrats som det ska
// Things have changed since i last saw you <3

function openSettings(user) {
    let settingsWindow = document.createElement('div');
    settingsWindow.id = "settingsWindow";
    setTimeout(() => {
        settingsWindow.style.left = 0;
    }, 50);

    let closeTab = document.createElement('button');
    closeTab.textContent = "x";
    closeTab.addEventListener('click', () => {
        settingsWindow.style.left = '100vw';
        setTimeout(() => {
            settingsWindow.remove(); 
        }, 1000);
    });

    let changeProfilePicContainer = document.createElement('div');
    changeProfilePicContainer.id = "settingsChangePic";

    let profilePicture = document.createElement('img');
    profilePicture.src = `http://localhost:7001/${user.profile_picture.filepath}`;
    let changePicDiv = document.createElement('div');
    let changePicIcon = document.createElement('img');
    // changePicIcon.src = "../icons/edit.svg";

    changePicDiv.append(changePicIcon);
    changeProfilePicContainer.append(profilePicture, changePicDiv);

    changePicDiv.addEventListener('click', () => {
        settingsWindow.style.left = '-100vw';
        let changeProfileWindow = changeProfilePic(user);

        document.querySelector('body').prepend(changeProfileWindow);
    });

    let form = document.createElement('form');
    form.id = "loginForm";
    let info = ["firstname", "lastname", "email", "password"];
    // console.log(info);

    info.forEach(obj => {
        let field = document.createElement('div');
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.id = 'input';
        input.type = "text";

        if (obj == "firstname") {
            label.textContent = "First name";
            input.placeholder = user.firstname;
        } else if (obj == "lastname") {
            label.textContent = "Last name";
            input.placeholder = user.lastname;
        } else if (obj == "email") {
            label.textContent = "Email";
            input.placeholder = user.email;
            input.type = "email";
        } else if (obj == "password") {
            label.textContent = "Password";
            input.placeholder = "*********";
            input.type = "password";
        }

        field.append(label, input);
        form.append(field);
    });
    // form.innerHTML = `
    //     <div id="nameRec">
    //         <label for="name">Firstname:</label>
    //         <input type="text" name="firstName" placeholder="${user.firstname}">
    //         <input type="text" name="lastName" placeholder="${user.lastname}">
    //     </div>
    //     <input type="email" name="email" placeholder="${user.email}">
    //     <input type="password" name="password">
    //     <select name="region">
    //         <option >
    //     <input type="" name="region" placeholder="${user.region}">
    //     <input type="text" name="active_streaming_services">
    //     <button id="updateButton">Update</button>
    // `;
    // form.addEventListener('')

    settingsWindow.append(closeTab, changeProfilePicContainer, form);
    return settingsWindow
}

function changeProfilePic(user) {
    let changeProfileWindow = document.createElement('div');
    changeProfileWindow.id = "changeProfileWindow";
    setTimeout(() => {
        changeProfileWindow.style.left = 0;
    }, 50);

    let closeTab = document.createElement('button');
    closeTab.textContent = "<";
    closeTab.addEventListener('click', () => {
        let settingsWindow = document.getElementById('settingsWindow');

        changeProfileWindow.style.left = '100vw';
        settingsWindow.style.left = 0;

        setTimeout(() => {
            changeProfileWindow.remove(); 
        }, 1000);
    });

    let changeProfilePicContainer = document.createElement('div');
    changeProfilePicContainer.id = "settingsChangePic";

    let profilePicture = document.createElement('img');
    profilePicture.src = `http://localhost:7001/${user.profile_picture.filepath}`;
    let changePicDiv = document.createElement('div');
    let changePicIcon = document.createElement('img');
    // changePicIcon.src = "../icons/edit.svg";

    let formDiv = document.createElement('div');
    let form = document.createElement('form');
    // form.action = "http://localhost:8001/POST/post-profile-picture.php";
    form.method = "POST";
    form.enctype = "multipart/form-data";

    let input = document.createElement('input');
    input.type = "file";
    input.name = "fileToUpload";
    input.id = "newProfile";

    let button = document.createElement('button');
    button.textContent = "Upload";

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const data = new FormData(form);
        const request = new Request("http://localhost:7001/POST/post-profile-picture.php", {
            method: "POST",
            body: data
        });

    })
    
    formDiv.append(form);
    form.append(input, button);

    changePicDiv.append(changePicIcon);
    changeProfilePicContainer.append(profilePicture, changePicDiv);
    
    changeProfileWindow.append(closeTab, changeProfilePicContainer, formDiv);

    return changeProfileWindow;
}
