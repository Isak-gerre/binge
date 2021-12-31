// Skapa navigationen

"use strict";

function makeUpperNav() {
  //create elements
  let upperNav = document.createElement("nav");
  // let navLeft = document.createElement("div");
  let navMiddle = document.createElement("div");

  //classes
  upperNav.className = "upperNav";
  // navLeft.className = "navLeft";
  navMiddle.className = "navMiddle";

  //content
  navMiddle.innerHTML = `<img src='../icons/back.svg' class ='navImg back' alt='Back'>`;
  navMiddle.innerHTML += `<img src='../icons/hamburger.svg' class ='navImg hamburger' alt='Home'>`;

  //append
  upperNav.append(navMiddle);
  document.body.prepend(upperNav);
  document.querySelector(".back").addEventListener("click", () => {});
  document.querySelector(".hamburger").addEventListener("click", () => {
    if (document.querySelector(".hamburger-menu") == null) {
      makeHamburgerMenu();
      document.querySelector(".hamburger-menu").style.animation = "hamburgerScale 0.4s ease-out";
      document.querySelector(".hamburger-background").style.animation = "hamburgerBackground 0.4s ease-out";
    } else {
      document.querySelector(".hamburger-background").style.animation = "removeHamburgerBackground 0.4s ease-out";
      document.querySelector(".hamburger-menu").style.animation = "removeHamburgerMenu 0.4s ease-out";
      document.querySelectorAll(".hamburger-text").forEach((element) => {
        element.style.opacity = "0";
      });
      setTimeout(() => {
        document.querySelector(".hamburger-menu").remove();
        document.querySelector(".hamburger-background").remove();
      }, 400);
    }
  });
}
window.addEventListener("scroll", () => {
  let winheight = window.scrollY;
  if (winheight > 10) {
    document.querySelector(".upperNav").style.backgroundColor = "#0F0B2E";
  } else {
    document.querySelector(".upperNav").style.backgroundColor = "transparent";
  }
});
makeUpperNav();

function makeLowerNav() {
  let navRight = document.createElement("div");
  let searchImg = document.createElement("img");
  searchImg.src = `../icons/search.svg`;
  navRight.className = "navRight";
  searchImg.className = "navImg";

  let searchDiv = document.createElement("div");
  searchDiv.className = "search";
  navRight.append(searchImg);
  //create elements
  let lowerNav = document.createElement("nav");
  let backLowerNav = document.createElement("div");
  let lowerNavLeft = document.createElement("div");
  let lowerNavMiddle = document.createElement("div");
  let lowerNavRight = document.createElement("div");

  //classes
  lowerNav.className = "lowerNav";
  backLowerNav.className = "backLowerNav";
  lowerNavLeft.className = "lowerNavLeft";
  lowerNavMiddle.className = "lowerNavMiddle";
  lowerNavRight.className = "lowerNavRight";

  //content
  lowerNavLeft.innerHTML = `<img class="navImg" src="../icons/home.svg">`;
  lowerNavMiddle.innerHTML = `<img class="navImg" src="../icons/explore.svg">`;
  lowerNavRight.innerHTML = `<img class="navImg" src="../icons/profile.svg">`;
  searchImg.addEventListener("click", () => {
    if (document.querySelector(".search-container") == null) {
      document.querySelectorAll(".lowerNav > div").forEach((element) => {
        element.style.borderBottom = "0px";
        console.log(document.querySelectorAll(".lowerNav > div"));
      });
      document.querySelector(".navRight").style.borderBottom = "3px solid white";
      document.querySelector("#overlay").style.display = "none";
      makeSearchOverlay();
      document.querySelector(".back").setAttribute("src", "../icons/exit 2.svg");
      document.querySelector(".back").addEventListener("click", () => {
        document.querySelector(".back").setAttribute("src", "../icons/back.svg");
        document.querySelector(".search-container").style.animation = "removeSearchBar 0.2s ease-out";
        document.querySelector("#overlay").style.display = "flex";
        setTimeout(() => {
          document.querySelector(".search-container").remove();
        }, 200);
      });
      document.querySelector(".search-container").style.animation = "searchBar 0.2s ease-out";
    } else {
      document.querySelector(".navRight").style.borderBottom = "0px";
      if (window.location.href.indexOf("feed") > -1) {
        // lowerNavLeft.innerHTML = `<img class="navImg navLinkFeed" src="../icons/feedCOLOR.svg">`;
        lowerNavLeft.style.borderBottom = "3px solid white";
      } else if (window.location.href.indexOf("explore") > -1) {
        // lowerNavMiddle.innerHTML = `<img class="navImg navLinkExplore" src="../icons/exploreCOLOR.svg">`;
        lowerNavMiddle.style.borderBottom = "3px solid white";
      } else if (window.location.href.indexOf("profile") > -1) {
        // lowerNavRight.innerHTML = `<img  class="navImg navLinkProfile" src="../icons/profileCOLOR.svg">`;
        lowerNavRight.style.borderBottom = "3px solid white";
      }
      document.querySelector(".back").setAttribute("src", "../icons/back.svg");
      document.querySelector(".search-container").style.animation = "removeSearchBar 0.2s ease-out";
      document.querySelector("#overlay").style.display = "flex";
      setTimeout(() => {
        document.querySelector(".search-container").remove();
      }, 200);
    }
  });
  lowerNavLeft.addEventListener("click", () => {
    window.location.href = `feed.php`;
  });
  lowerNavMiddle.addEventListener("click", () => {
    window.location.href = `explore.php`;
  });
  lowerNavRight.addEventListener("click", () => {
    window.location.href = `profile.php`;
  });

  if (window.location.href.indexOf("feed") > -1) {
    // lowerNavLeft.innerHTML = `<img class="navImg navLinkFeed" src="../icons/feedCOLOR.svg">`;
    lowerNavLeft.style.borderBottom = "3px solid white";
  } else if (window.location.href.indexOf("explore") > -1) {
    // lowerNavMiddle.innerHTML = `<img class="navImg navLinkExplore" src="../icons/exploreCOLOR.svg">`;
    lowerNavMiddle.style.borderBottom = "3px solid white";
  } else if (window.location.href.indexOf("profile") > -1) {
    // lowerNavRight.innerHTML = `<img  class="navImg navLinkProfile" src="../icons/profileCOLOR.svg">`;
    lowerNavRight.style.borderBottom = "3px solid white";
  }

  //append
  document.body.append(lowerNav);
  lowerNav.append(backLowerNav, lowerNavLeft, lowerNavMiddle, navRight, lowerNavRight);
}

function makeHamburgerMenu() {
  console.log(true);
  let test = ["Home", "Profile", "Genres"];
  let hamburgerBackground = document.createElement("div");
  hamburgerBackground.className = "hamburger-background";
  let hamburgerMenu = document.createElement("div");
  hamburgerMenu.className = "hamburger-menu";

  test.forEach((text) => {
    hamburgerMenu.append(hamburgerText(text));
  });

  document.body.append(hamburgerMenu, hamburgerBackground);

  document.querySelectorAll(".hamburger-text").forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.setAttribute("style", `opacity: 1; transition-delay: ${index * 0.3 + 0.6}s;`);
    }, 0);
  });
}

function hamburgerText(text) {
  let hamburgerText = document.createElement("p");
  hamburgerText.textContent = text;
  hamburgerText.className = "hamburger-text";

  return hamburgerText;
}

makeLowerNav();
