// Skapa navigationen

"use strict";

function makeUpperNav() {
  //create elements
  let upperNav = document.createElement("nav");
  // let navLeft = document.createElement("div");
  let navMiddle = document.createElement("div");

  let searchDiv = document.createElement("div");
  searchDiv.className = "search";

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
  console.log(winheight);
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

makeLowerNav("home");
// makeLowerNav('explore');
// makeLowerNav('profile');
