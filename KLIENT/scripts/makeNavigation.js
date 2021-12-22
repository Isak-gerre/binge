// Skapa navigationen

"use strict";

function makeUpperNav() {
  //create elements
  let upperNav = document.createElement("nav");
  let navLeft = document.createElement("div");
  let navMiddle = document.createElement("div");
  let navRight = document.createElement("div");

  let searchImg = document.createElement("img");
  searchImg.src = `../icons/search.svg`;

  let searchDiv = document.createElement("div");
  searchDiv.className = "search";

  //classes
  upperNav.className = "upperNav";
  navLeft.className = "navLeft";
  navMiddle.className = "navMiddle";
  navRight.className = "navRight";
  searchImg.className = "navImg";

  //content
  navLeft.innerHTML = `<a href='feed.php'><img src='../icons/back.svg' class ='navImg' alt='Back'></a>`;
  navMiddle.innerHTML = `<a href='feed.php'><img src='../icons/home.svg' class ='navImg' alt='Home'></a>`;

  searchImg.addEventListener("click", () => {
    searchDiv.innerHTML = `
        <input type="text" id="searchField" name="search">
        <button class="hiddenButton"></button>
        <img src='../icons/exit.svg' class ='navImg closeImg' alt='close'>
        `;

    searchDiv.classList.add = "search";
    upperNav.append(searchDiv);

    makeSearchOverlay();
    document.getElementById("searchField").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        searchFunction();
      }
    });
    let searchOverlay = document.querySelector(".searchOverlay");

    //Animations and closing
    let animation = "searchBar .2s ease-out";
    searchDiv.style.animation = animation;

    document.querySelector(".closeImg").addEventListener("click", () => {
      animation = "removeSearchBar .5s ease-out";
      searchDiv.style.animation = animation;
      searchOverlay.style.animation = animation;

      setTimeout(() => {
        searchOverlay.remove();
        searchDiv.remove();
      }, 500);
    });
  });

  //append
  upperNav.append(navLeft, navMiddle, navRight);
  navRight.append(searchImg);
  document.body.prepend(upperNav);
}
makeUpperNav();

function makeLowerNav() {
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
    lowerNavLeft.innerHTML = `<img class="navImg navLinkFeed" src="../icons/feedCOLOR.svg">`;
  } else if (window.location.href.indexOf("explore") > -1) {
    lowerNavMiddle.innerHTML = `<img class="navImg navLinkExplore" src="../icons/exploreCOLOR.svg">`;
  } else if (window.location.href.indexOf("profile") > -1) {
    lowerNavRight.innerHTML = `<img  class="navImg navLinkProfile" src="../icons/profileCOLOR.svg">`;
  }

  //append
  document.body.append(lowerNav);
  lowerNav.append(backLowerNav, lowerNavLeft, lowerNavMiddle, lowerNavRight);
}

makeLowerNav("home");
// makeLowerNav('explore');
// makeLowerNav('profile');
