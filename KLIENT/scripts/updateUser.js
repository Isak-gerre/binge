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

// Öppnar fönster för settings
async function openSettings(userId) {
    // Hämtar user för att den nuvarande profilbilden ska visas
    let user = await getUserInfo(userId);

    let settingsWindow = document.createElement('div');
    settingsWindow.id = "settingsWindow";
    // Skapar transition
    setTimeout(() => {
        settingsWindow.style.left = 0;
    }, 50);

    // Knapp som stänger fönstret
    let closeTab = document.createElement('button');
    closeTab.id = "closeTab";
    let exit = document.createElement('img');
    exit.src = "../icons/exit.svg";
    closeTab.append(exit);

    // Snygg transition
    closeTab.addEventListener('click', () => {
        settingsWindow.style.left = '100vw';
        setTimeout(() => {
            settingsWindow.remove();
        }, 1000);
    });

    // Container för profilbilden
    let changeProfilePicContainer = document.createElement('div');
    changeProfilePicContainer.id = "settingsChangePic";

    let profilePicture = document.createElement('div');
    profilePicture.style.backgroundImage = `url("http://localhost:7001/${user.profile_picture.filepath}")`;
    let changePicDiv = document.createElement('div');
    let changePicIcon = document.createElement('img');
    changePicIcon.src = "../icons/edit.svg";

    changePicDiv.append(changePicIcon);
    changeProfilePicContainer.append(profilePicture, changePicDiv);

    // Öppnar nästa fönster där man ändrar profilbild
    changePicDiv.addEventListener('click', () => {
        // Hämtar fönster för ändring av profilbild
        let changeProfilePicWindow = changeProfilePic(user);
        settingsWindow.prepend(changeProfilePicWindow);

        let allAvatars = document.querySelectorAll('#avatars label');
        let profilePicFilepath = user.profile_picture.filepath.replace("DATABASE\\\/IMAGES\\\/AVATAR\\\/", '');

        // Jämför avatarer med nuvarande profilbild
        allAvatars.forEach(avatar => {
            let avatarFilepath = avatar.childNodes[3].src.replace('http://localhost:7001/DATABASE/IMAGES/AVATAR/', '');

            // Om nuvarande profilbild är densamma som avatar så ska avataren markeras som selected
            if (avatarFilepath == profilePicFilepath) {
                avatar.classList.add('profileImgSelected');
                document.querySelector(".profileImgSelected > input").setAttribute("checked", true);
            }

            // Trycker man på en annan avatar så ändras den till att vara selected
            avatar.addEventListener("click", () => {
                if (document.querySelector(".profileImgSelected")) {
                    document.querySelector(".profileImgSelected").classList.remove("profileImgSelected");
                }
                avatar.classList.toggle("profileImgSelected");
            });
            avatar.addEventListener("click", (event) => {
                event.stopPropagation();
            });
        });
    });

    let form = document.createElement('form');
    form.id = "settingsForm";
    form.innerHTML = `
    <fieldset id="informationForm">
        <div id="input">
            <label>Firstname</label>
            <input class="signInInput" type="text" name="firstname" placeholder="Firstname">
        </div>
        <div id="input">
            <label>Lastname</label>
            <input class="signInInput" type="text" name="lastname" placeholder="Lastname">
        </div>
        <div id="input" class="emailInput">
            <label>Email</label>
            <input class="signInInput" type="text" name="email" placeholder="Email">
        </div>
        <div id="input">
            <label>Birthday</label>
            <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
    </fieldset>
    <fieldset id="providersForm"></fieldset>
    <button id="signInButton">Update</button>
    `;

    getProviders();

    settingsWindow.append(closeTab, changeProfilePicContainer, form);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let inputs = document.querySelectorAll('.signInInput');
        let empty = false;
        
        inputs.forEach((input) => {
            if (input.value == "") {
                errorInput(input.parentElement, "Can't be empty!");
                empty = true;
            }
        });
        
        if (!empty) {
            const formData = new FormData(form);
    
            let session = sessionStorage.getItem("session");
            let id = JSON.parse(session).session.userID;
    
            formData.append("id", id);
    
            let array = [];
            let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    
            for (let i = 0; i < checkboxes.length; i++) {
                array.push(checkboxes[i].value);
            }
    
            for (let i = 0; i < array.length; i++) {
                formData.append("active_streaming_services[]", array[i]);
            }
    
            const reqChangeUser = new Request("http://localhost:7001/PATCH/update-user.php", {
                method: "POST",
                body: formData
            });
    
    
            fetch(reqChangeUser)
                .then((response) => {
                    let json = response.json();
                    return json;
                })
                .then((data) => {
                    inputs.forEach((input) => {
                        if (input.value !== "") {
                            input.parentElement.style.border = "none";
                            if (input.nextElementSibling != null ) {
                                input.nextElementSibling.remove();
                            }
                        }
                    });
                    if ("emailError" in data) {
                        let emailInput = document.querySelector(".emailInput");
                        
                        errorInput(emailInput, "Please enter a valid email");
    
                    } else if ("email" in data) {
                        console.log("changed Email");
                    } else if ("") {
    
                    }
                    
                });

        }
    });

    return settingsWindow;
}

// Fönster där profilbild kan ändras
function changeProfilePic(user) {
    let changeProfilePicWindow = document.createElement('div');
    changeProfilePicWindow.id = "changeProfilePicWindow";
    // Transition
    setTimeout(() => {
        changeProfilePicWindow.style.left = 0;
    }, 50);

    // Tillbaka-knapp som leder tillbaks till första settingsfönstret
    let closeTab = document.createElement('button');
    closeTab.id = "closeTab";

    let back = document.createElement('img');
    back.src = "../icons/back_2.svg";
    closeTab.append(back);

    closeTab.addEventListener('click', () => {
        let settingsWindow = document.getElementById('settingsWindow');

        // Transition
        changeProfilePicWindow.style.left = '100vw';
        settingsWindow.style.left = 0;

        setTimeout(() => {
            changeProfilePicWindow.remove();
        }, 1000);
    });

    // Formulär för profilbild
    let formDiv = document.createElement('div');
    let form = document.createElement('form');
    form.id = "updateProfilePic";
    form.method = "POST";
    form.enctype = "multipart/form-data";

    // Alla avatarer och filuppladdning
    form.innerHTML = `
    <div id="avatars">
        <p>Change avatar</p>
        <label>
            <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg1">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_1.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg2">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_2.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg3">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_3.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg4">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_4.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg5" type="radio" value="profileImg5">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_5.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg6" type="radio" value="profileImg6">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_6.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg7" type="radio" value="profileImg7">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_7.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg8" type="radio" value="profileImg8">
            <img src="http://localhost:7001/DATABASE/IMAGES/AVATAR/avatar_8.png" width="100" height="100" alt="">
        </label>
    </div>
    <div id="uploadProfilePic">
        <p>Or upload your own profile picture</p>
        <input type="file" id="fileToUpload" name="fileToUpload">
        <button id="signInButton">Update</button>
    </div>
    `;

    formDiv.append(form);
    changeProfilePicWindow.append(closeTab, formDiv);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let loggedInUser = user.id;

        const data = new FormData(form);
        data.append("userID", loggedInUser);

        // Om det inte finns en fil i filuppladdningsfältet så läggs avataren till i formData
        if (document.getElementById("fileToUpload").value == "") {
            let image = document.querySelector('input[name="profileImg"]:checked').value;
            data.set("fileToUpload", image);
        }

        patchProfilePic(data);
    });

    return changeProfilePicWindow;
}

// Skickar formData om profilbild till servern som uppdaterar information
async function patchProfilePic(data) {
    const request = new Request("http://localhost:7001/POST/post-profile-picture.php", {
        method: "POST",
        body: data,
    });

    let response = await fetch(request);
    let json = await response.json();

    console.log(response);

    // Om 'post' går bra visas ett meddelande
    if (response.ok) {
        changeProfilePicWindow.prepend(responseDiv("Your profile picture was updated"));

        // Uppdaterar profilbild på profilsida och i settings
        document.querySelector('#profilePic div').style.backgroundImage = `url("http://localhost:7001/${json.filePath}")`;
        document.querySelector('#settingsChangePic div').style.backgroundImage = `url("http://localhost:7001/${json.filePath}")`;
    } else if (response.status == 406) {
        changeProfilePicWindow.prepend(responseDiv("You're profile picture can't override 4Mb."));

    } else if (response.status == 400) {
        console.log(response);
        changeProfilePicWindow.prepend(responseDiv("Something went wrong. Try again!"));
    }

}

function responseDiv(message) {
    let responseDiv = document.createElement('div');
    responseDiv.id = "responseDiv";
    let text = document.createElement('p');
    text.textContent = message;

    responseDiv.append(text);

    // Transition in
    setTimeout(() => {
        responseDiv.style.opacity = '1';
    }, 10);

    // Transition ut
    setTimeout(() => {
        responseDiv.style.opacity = '0';
    }, 1500);

    // Ta bort fönster
    setTimeout(() => {
        responseDiv.remove();
    }, 2000);

    return responseDiv;
}

function errorInput(inputField, message) {
    let errorIcon = document.createElement('img');
    errorIcon.id = "errorIcon";
    errorIcon.src = "../icons/error_white_24dp.svg";
    
    errorIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        errorIcon.style.opacity = "1";
        
        let errorMessage = document.createElement('p');
        errorMessage.id = "errorMessage";
        errorMessage.textContent = message;

        if (inputField.childNodes[6] == undefined) {
            inputField.append(errorMessage);
        }

        body.addEventListener('click', (event) => {
            event.stopPropagation();

            errorIcon.removeAttribute("style");
            errorMessage.remove();
        });
    });

    if (inputField.childNodes[5] == undefined) {
        inputField.style.border = "2px solid red";
        inputField.append(errorIcon);
    }
    
}


{/* <div id="input">
            <label>Old Password</label>
            <input class="signInInput" type="password" id="passwordOld" name="old_password" placeholder="Old Password">
        </div>
        <div id="input">
            <label>New Password</label>
            <input class="signInInput" type="password" id="password2" name="password" placeholder="New Password">
        </div>
        <div id="input">
            <label>Confirm Password</label>
            <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password">
        </div> */}