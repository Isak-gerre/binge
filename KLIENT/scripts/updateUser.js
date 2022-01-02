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

async function openSettings(userId) {
    let user = await getUserInfo(userId);

    let settingsWindow = document.createElement('div');
    settingsWindow.id = "settingsWindow";
    setTimeout(() => {
        settingsWindow.style.left = 0;
    }, 50);

    let closeTab = document.createElement('button');
    closeTab.id = "closeTab";
    let exit = document.createElement('img');
    exit.src = "../icons/exit.svg";
    closeTab.append(exit);

    closeTab.addEventListener('click', () => {
        settingsWindow.style.left = '100vw';
        setTimeout(() => {
            settingsWindow.remove(); 
        }, 1000);
    });

    let changeProfilePicContainer = document.createElement('div');
    changeProfilePicContainer.id = "settingsChangePic";

    let profilePicture = document.createElement('div');
    profilePicture.style.backgroundImage = `url("http://localhost:7001/${user.profile_picture.filepath}")`;
    let changePicDiv = document.createElement('div');
    let changePicIcon = document.createElement('img');
    changePicIcon.src = "../icons/edit.svg";

    changePicDiv.append(changePicIcon);
    changeProfilePicContainer.append(profilePicture, changePicDiv);

    changePicDiv.addEventListener('click', () => {
        let changeProfilePicWindow = changeProfilePic(user);
        settingsWindow.prepend(changeProfilePicWindow);

        let allAvatars = document.querySelectorAll('#avatars label');
        let profilePicFilepath = user.profile_picture.filepath.replace("DATABASE\\\/IMAGES\\\/AVATAR\\\/", '');

        allAvatars.forEach(avatar => {
            let avatarFilepath = avatar.childNodes[3].src.replace('http://localhost:7001/DATABASE/IMAGES/AVATAR/', '');
            
            if (avatarFilepath == profilePicFilepath) {
                avatar.classList.add('profileImgSelected');
            }

            avatar.addEventListener("click", () => {
                if(document.querySelector(".profileImgSelected")){
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
    form.id = "loginForm";
    form.innerHTML = `
        <div id="input">
            <label>Firstname</label>
            <input class="signInInput" type="text" name="firstname" placeholder="Firstname" required>
        </div>
        <div id="input">
            <label>Lastname</label>
            <input class="signInInput" type="text" name="lastname" placeholder="Lastname" required>
        </div>
        <div id="input">
            <label>Username</label>
            <input class="signInInput" type="text" id="username1" name="username" placeholder="Username" required>
        </div>
        <div id="input">
            <label>New Password</label>
            <input class="signInInput" type="password" id="password2" name="password" placeholder="Password" required>
        </div>
        <div id="input">
            <label>Confirm Password</label>
            <input class="signInInput" type="password" name="confirm_password" placeholder="Confirm Password" required>
        </div>
        <div id="input">
            <label>Email</label>
            <input class="signInInput" type="text" name="email" placeholder="Email" required>
        </div>
        <div id="input">
            <label>Birthday</label>
            <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
        <button id="signInButton">Update</button>
    `;
    // form.addEventListener('')

    settingsWindow.append(closeTab, changeProfilePicContainer, form);
    return settingsWindow;
}

function changeProfilePic(user, filepath) {
    let changeProfilePicWindow = document.createElement('div');
    changeProfilePicWindow.id = "changeProfilePicWindow";
    setTimeout(() => {
        changeProfilePicWindow.style.left = 0;
    }, 50);

    let closeTab = document.createElement('button');
    closeTab.id = "closeTab";

    let back = document.createElement('img');
    back.src = "../icons/back_2.svg";
    closeTab.append(back);

    closeTab.addEventListener('click', () => {
        let settingsWindow = document.getElementById('settingsWindow');

        changeProfilePicWindow.style.left = '100vw';
        settingsWindow.style.left = 0;

        setTimeout(() => {
            changeProfilePicWindow.remove(); 
        }, 1000);
    });

    let formDiv = document.createElement('div');
    let form = document.createElement('form');
    form.id = "updateProfilePic";
    form.method = "POST";
    form.enctype = "multipart/form-data";

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

        if (document.getElementById("fileToUpload").value == "") {
            let image = document.querySelector('input[name="profileImg"]:checked').value;
            data.set("fileToUpload", image);
        }

        patchProfilePic(data);
    });

    return changeProfilePicWindow;
}

async function patchProfilePic(data) {
    const request = new Request("http://localhost:7001/POST/post-profile-picture.php", {
            method: "POST",
            body: data,
        });

    let response = await fetch(request);
    let json = await response.json();

    if (response.ok) {
        let responseDiv = document.createElement('div');
        responseDiv.id = "responseDiv";
        let text = document.createElement('p');
        text.textContent = 'Profile picture is updated';

        responseDiv.append(text);
        changeProfilePicWindow.prepend(responseDiv);
        setTimeout( () => {
            responseDiv.style.opacity = '1';
        }, 10);

        setTimeout( () => {
            responseDiv.style.opacity = '0';
        }, 1500);

        setTimeout( () => {
            responseDiv.remove();
        }, 2000);

        document.querySelector('#profilePic div').style.backgroundImage = `url("http://localhost:7001/${json.filePath}")`;
        document.querySelector('#settingsChangePic div').style.backgroundImage = `url("http://localhost:7001/${json.filePath}")`;
    }


    

}