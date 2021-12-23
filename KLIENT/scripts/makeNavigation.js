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
  navMiddle.innerHTML = `<a href='feed.php'><img src='../icons/back.svg' class ='navImg' alt='Back'></a>`;
  navMiddle.innerHTML += `<a href='feed.php'><img src='../icons/hamburger.svg' class ='navImg' alt='Home'></a>`;

  //append
  upperNav.append(navMiddle);
  document.body.prepend(upperNav);
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
      makeSearchOverlay();
      document.querySelector(".search-container").style.animation = "searchBar 0.2s ease-out";
    } else {
      document.querySelector(".search-container").style.animation = "removeSearchBar 0.2s ease-out";
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

makeLowerNav();
// makeLowerNav('explore');
// makeLowerNav('profile');
