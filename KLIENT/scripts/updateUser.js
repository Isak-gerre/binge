"use strict";
// Öppnar fönster för settings
async function openSettings(userId) {
  // Hämtar user för att den nuvarande profilbilden ska visas
  let user = await getUserInfo(userId);

  let settingsWindow = document.createElement("div");
  settingsWindow.id = "settingsWindow";
  // Skapar transition
  setTimeout(() => {
    settingsWindow.style.left = 0;
  }, 50);

  // Knapp som stänger fönstret
  let closeTab = document.createElement("button");
  closeTab.id = "closeTab";
  let exit = document.createElement("img");
  exit.src = "https://d.r101.wbsprt.com/bingy.seicons/exit.svg";
  closeTab.append(exit);

  // Snygg transition
  closeTab.addEventListener("click", () => {
    settingsWindow.style.left = "100vw";
    setTimeout(() => {
      settingsWindow.remove();
    }, 1000);
  });

  // Container för profilbilden
  let changeProfilePicContainer = document.createElement("div");
  changeProfilePicContainer.id = "settingsChangePic";

  let profilePicture = document.createElement("div");
  profilePicture.style.backgroundImage = `url("https://d.r101.wbsprt.com/api.bingy.se/${user.profile_picture.filepath}")`;
  let changePicDiv = document.createElement("div");
  let changePicIcon = document.createElement("img");
  changePicIcon.src = "https://d.r101.wbsprt.com/bingy.seicons/edit.svg";

  changePicDiv.append(changePicIcon);
  changeProfilePicContainer.append(profilePicture, changePicDiv);

  // Öppnar nästa fönster där man ändrar profilbild
  changePicDiv.addEventListener("click", () => {
    // Hämtar fönster för ändring av profilbild
    let changeProfilePicWindow = changeProfilePic(user);
    settingsWindow.prepend(changeProfilePicWindow);

    let allAvatars = document.querySelectorAll("#avatars label");
    let profilePicFilepath = user.profile_picture.filepath.replace("DATABASE\\/IMAGES\\/AVATAR\\/", "");

    // Jämför avatarer med nuvarande profilbild
    allAvatars.forEach((avatar) => {
      let avatarFilepath = avatar.childNodes[3].src.replace(
        "https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/",
        ""
      );

      // Om nuvarande profilbild är densamma som avatar så ska avataren markeras som selected
      if (avatarFilepath == profilePicFilepath) {
        avatar.classList.add("profileImgSelected");
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

  let form = document.createElement("form");
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
        <div id="input" class="birthdayInput">
            <label>Birthday</label>
            <input class="signInInput" type="date" name="birthday" placeholder="Birthday">
        </div>
    </fieldset>
    <fieldset id="providersForm"></fieldset>
    <button id="signInButton">Update Profile</button>
    `;

  getProviders();

  let deleteButton = document.createElement("button");
  deleteButton.id = "deleteAccountBtn";
  deleteButton.textContent = "Delete Account";
  deleteButton.addEventListener("click", () => {
    return new Promise((confirm) => {
      swal({
        title: "Are you sure you want to delete your account?",
        buttons: {
          cancel: {
            text: "No",
            value: false,
            visible: true,
            className: "",
            closeModal: true,
          },
          confirm: {
            text: "Yes",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      }).then((value) => {
        if (value) {
          let deletedComplete = deleteAccount(loggedInUserId);

          if (deletedComplete) {
            swal({
              title: "Your account is deleted.",
            }).then((ok) => {
              sessionStorage.clear();
              window.location.href = "/index.php";
            });

            setTimeout(() => {
              sessionStorage.clear();
              window.location.href = "/index.php";
            }, 5000);
          }
        }
      });
    });
  });

  settingsWindow.append(closeTab, changeProfilePicContainer, form, deleteButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputs = document.querySelectorAll(".signInInput");
    let empty = false;

    inputs.forEach((input) => {
      if (input.value == "") {
        errorInput(input.parentElement, "Please fill in!");
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

      const reqChangeUser = new Request("https://d.r101.wbsprt.com/api.bingy.se/POST/update-user.php", {
        method: "POST",
        body: formData,
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
              if (input.nextElementSibling != null) {
                input.nextElementSibling.remove();
              }
            }
          });
          if ("emailError" in data) {
            let emailInput = document.querySelector(".emailInput");

            errorInput(emailInput, "Please enter a valid email");
          } else if ("birthdayError" in data) {
            let birthdayInput = document.querySelector(".birthdayInput");

            errorInput(birthdayInput, "Please enter a valid date");
          } else {
            settingsWindow.append(responseDiv("Your profile was updated!"));
          }
        });
    }
  });

  return settingsWindow;
}

// Fönster där profilbild kan ändras
function changeProfilePic(user) {
  let changeProfilePicWindow = document.createElement("div");
  changeProfilePicWindow.id = "changeProfilePicWindow";
  // Transition
  setTimeout(() => {
    changeProfilePicWindow.style.left = 0;
  }, 50);

  // Tillbaka-knapp som leder tillbaks till första settingsfönstret
  let closeTab = document.createElement("button");
  closeTab.id = "closeTab";

  let back = document.createElement("img");
  back.src = "https://d.r101.wbsprt.com/bingy.seicons/back_2.svg";
  closeTab.append(back);

  closeTab.addEventListener("click", () => {
    let settingsWindow = document.getElementById("settingsWindow");

    // Transition
    changeProfilePicWindow.style.left = "100vw";
    settingsWindow.style.left = 0;

    setTimeout(() => {
      changeProfilePicWindow.remove();
    }, 1000);
  });

  // Formulär för profilbild
  let formDiv = document.createElement("div");
  let form = document.createElement("form");
  form.id = "updateProfilePic";
  form.method = "POST";
  form.enctype = "multipart/form-data";

  // Alla avatarer och filuppladdning
  form.innerHTML = `
    <div id="avatars">
        <p>Change avatar</p>
        <label>
            <input style="display:none" name="profileImg" id="profileImg1" type="radio" value="profileImg1">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_1.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg2" type="radio" value="profileImg2">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_2.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg3" type="radio" value="profileImg3">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_3.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg4" type="radio" value="profileImg4">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_4.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg5" type="radio" value="profileImg5">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_5.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg6" type="radio" value="profileImg6">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_6.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg7" type="radio" value="profileImg7">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_7.png" width="100" height="100" alt="">
        </label>
        <label>
            <input style="display:none" name="profileImg" id="profileImg8" type="radio" value="profileImg8">
            <img src="https://d.r101.wbsprt.com/api.bingy.se/DATABASE/IMAGES/AVATAR/avatar_8.png" width="100" height="100" alt="">
        </label>
    </div>
    <div id="uploadProfilePic">
        <p>Or upload your own profile picture</p>
        <input type="file" id="fileToUpload" name="fileToUpload">
        <button id="signInButton">Update Profile picture</button>
    </div>
    `;

  formDiv.append(form);

  changeProfilePicWindow.append(closeTab, formDiv);

  form.addEventListener("submit", (event) => {
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
  const request = new Request("https://d.r101.wbsprt.com/api.bingy.se/POST/post-profile-picture.php", {
    method: "POST",
    body: data,
  });

  let response = await fetch(request);
  let json = await response.json();

  // Om 'post' går bra visas ett meddelande
  if (response.ok) {
    changeProfilePicWindow.prepend(responseDiv("Your profile picture was updated"));

    // Uppdaterar profilbild på profilsida och i settings
    document.querySelector(
      "#profilePic div"
    ).style.backgroundImage = `url("https://d.r101.wbsprt.com/api.bingy.se/${json.filePath}")`;
    document.querySelector(
      "#settingsChangePic div"
    ).style.backgroundImage = `url("https://d.r101.wbsprt.com/api.bingy.se/${json.filePath}")`;
  } else if (response.status == 406) {
    changeProfilePicWindow.prepend(responseDiv("You're profile picture can't override 4Mb."));
  } else if (response.status == 400) {
    changeProfilePicWindow.prepend(responseDiv("Something went wrong. Try again!"));
  }
}

async function deleteAccount(userId) {
  const response = await fetch(
    new Request("https://d.r101.wbsprt.com/api.bingy.se/DELETE/delete-user.php", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: userId }),
    })
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

function responseDiv(message) {
  let responseDiv = document.createElement("div");
  responseDiv.id = "responseDiv";
  let text = document.createElement("p");
  text.textContent = message;

  responseDiv.append(text);

  // Transition in
  setTimeout(() => {
    responseDiv.style.opacity = "1";
  }, 10);

  // Transition ut
  setTimeout(() => {
    responseDiv.style.opacity = "0";
  }, 1500);

  // Ta bort fönster
  setTimeout(() => {
    responseDiv.remove();
  }, 2000);

  return responseDiv;
}

function errorInput(inputField, message) {
  let errorIcon = document.createElement("img");
  errorIcon.id = "errorIcon";
  errorIcon.src = "https://d.r101.wbsprt.com/bingy.seicons/error_white_24dp.svg";

  errorIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    errorIcon.style.opacity = "1";

    let errorMessage = document.createElement("p");
    errorMessage.id = "errorMessage";
    errorMessage.textContent = message;

    if (inputField.childNodes[6] == undefined) {
      inputField.append(errorMessage);
    }

    body.addEventListener("click", (event) => {
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
