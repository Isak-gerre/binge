"use strict";
console.log("ny2");

function makeUpperNav() {
  //create elements
  let upperNav = document.createElement("nav");
  // let navLeft = document.createElement("div");
  let navMiddle = document.createElement("div");

  //classes
  upperNav.className = "upperNav";
  // navLeft.className = "navLeft";
  navMiddle.className = "navMiddle";

  let ifMovieProfile = getParamFromUrl("movieID") ? "display: none;" : "";
  //content
  navMiddle.innerHTML = `<img src='https://d.r101.wbsprt.com/bingy.se/icons/back.svg' class ='navImg back' alt='Back'>`;
  navMiddle.innerHTML += `<img src='https://d.r101.wbsprt.com/bingy.se/logos/b-circle.svg' class ='navImg logo' alt='Logo' style="${ifMovieProfile}">`;
  navMiddle.innerHTML += `<img src='https://d.r101.wbsprt.com/bingy.se/icons/hamburger.svg' class ='navImg hamburger' alt='Home'>`;
  //append
  upperNav.append(navMiddle);
  document.body.prepend(upperNav);
  document.querySelector(".back").addEventListener("click", () => {
    document.body.style.overflow = "visible";
    applyState();
  });

  document.querySelector(".logo").addEventListener("click", () => {
    goToPageAndAddToState("feed.php");
  });

  document.querySelector(".hamburger").addEventListener("click", () => {
    if (document.querySelector(".hamburger-menu") == null) {
      document.body.style.overflow = "hidden";
      makeHamburgerMenu();
      document.querySelector(".hamburger-menu").style.animation = "hamburgerScale 0.4s ease-out";
      document.querySelector(".hamburger-background").style.animation = "hamburgerBackground 0.4s ease-out";
    } else {
      document.body.style.overflow = "visible";
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
    document.querySelector(".logo").style.display = "block";
  } else {
    document.querySelector(".upperNav").style.backgroundColor = "transparent";
    let ifMovieProfile = getParamFromUrl("movieID") ? "none" : "";
    document.querySelector(".logo").style.display = ifMovieProfile;
    console.log(ifMovieProfile);
  }
});
makeUpperNav();

function makeLowerNav() {
  let navRight = document.createElement("div");
  let searchImg = document.createElement("img");
  searchImg.src = `https://d.r101.wbsprt.com/bingy.se/icons/search.svg`;
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
  lowerNavLeft.innerHTML = `<img class="navImg" src="https://d.r101.wbsprt.com/bingy.se/icons/home.svg" alt="Home">`;
  lowerNavMiddle.innerHTML = `<img class="navImg" src=" https://d.r101.wbsprt.com/bingy.se/icons/explore.svg" alt="Explore">`;
  lowerNavRight.innerHTML = `<img class="navImg" src="https://d.r101.wbsprt.com/bingy.se/icons/profile.svg" alt="Profile">`;
  searchImg.addEventListener("click", () => {
    if (document.querySelector(".search-container") == null) {
      document.body.style.overflow = "hidden";
      document.querySelectorAll(".lowerNav > div").forEach((element) => {
        element.style.borderBottom = "0px";
      });
      document.querySelector(".navRight").style.borderBottom = "3px solid white";

      makeSearchOverlay();
      let scrollDistance =
        window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

      addToState(window.location, scrollDistance, makeSearchState("", ""));
      document.querySelector(".search-container").style.animation = "searchBar 0.2s ease-out";
    } else {
      let page = window.location.href;
      if (page.includes("profile.php")) {
        document.querySelector("#pWrapper").style.display = "";
      } else if (page.includes("explore.php")) {
        if (page.includes("?movieID=")) {
          document.querySelector(".movie-profile").style.display = "flex";
        } else {
          document.querySelector("#wrapper").style.display = "flex";
        }
      } else if (page.includes("feed.php")) {
        document.querySelector("#wrapper").style.display = "flex";
      }

      removeLatestState();
      document.body.style.overflow = "visible";
      document.querySelector(".navRight").style.borderBottom = "0px";
      if (window.location.href.indexOf("feed") > -1) {
        lowerNavLeft.style.borderBottom = "3px solid white";
      } else if (window.location.href.indexOf("explore") > -1) {
        lowerNavMiddle.style.borderBottom = "3px solid white";
      } else if (window.location.href.indexOf("profile") > -1) {
        lowerNavRight.style.borderBottom = "3px solid white";
      }
      document
        .querySelector(".back")
        .setAttribute("src", "https://d.r101.wbsprt.com/bingy.se/icons/back.svg alt='Back'");
      document.querySelector(".search-container").style.animation = "removeSearchBar 0.2s ease-out";
      setTimeout(() => {
        document.querySelector(".search-container").remove();
      }, 200);
    }
  });
  lowerNavLeft.addEventListener("click", () => {
    goToPageAndAddToState("feed.php");
  });
  lowerNavMiddle.addEventListener("click", () => {
    goToPageAndAddToState("explore.php");
  });
  lowerNavRight.addEventListener("click", () => {
    goToPageAndAddToState("profile.php");
  });

  if (window.location.href.indexOf("feed") > -1) {
    lowerNavLeft.style.borderBottom = "3px solid white";
  } else if (window.location.href.indexOf("explore") > -1) {
    lowerNavMiddle.style.borderBottom = "3px solid white";
  } else if (window.location.href.indexOf("profile") > -1) {
    lowerNavRight.style.borderBottom = "3px solid white";
  }

  //append
  document.body.append(lowerNav);
  lowerNav.append(backLowerNav, lowerNavLeft, lowerNavMiddle, navRight, lowerNavRight);
}

async function makeHamburgerMenu() {
  // Black overlay
  let hamburgerBackground = document.createElement("div");
  hamburgerBackground.className = "hamburger-background";

  // Menu container
  let hamburgerMenu = document.createElement("div");
  hamburgerMenu.className = "hamburger-menu";
  document.body.append(hamburgerMenu, hamburgerBackground);

  // Close menu
  let exit = document.createElement("div");
  exit.classList.add("exitMenu");

  exit.addEventListener("click", () => {
    document.body.style.overflow = "";
    document.querySelector(".hamburger-background").style.animation = "removeHamburgerBackground 0.4s ease-out";
    document.querySelector(".hamburger-menu").style.animation = "removeHamburgerMenu 0.4s ease-out";
    document.querySelectorAll(".hamburger-text").forEach((element) => {
      element.style.opacity = "0";
    });

    setTimeout(() => {
      document.querySelector(".hamburger-menu").remove();
      document.querySelector(".hamburger-background").remove();
    }, 400);
  });

  hamburgerMenu.append(exit);

  document.querySelector(".hamburger-menu").addEventListener("animationend", async function () {
    let genres = await getGenres();
    let pages = ["Feed", "Explore", "Profile"];

    // Create PAGE-links-and-container
    let pagesContainer = document.createElement("div");
    pagesContainer.className = "pages-container";

    pages.forEach((text) => {
      pagesContainer.append(hamburgerText(text));
    });

    // Create GENRE-links-and-container
    let genresContainer = document.createElement("div");
    genresContainer.className = "genres-container";

    genres.genres.forEach((genre) => {
      genresContainer.append(createGenreLinks(genre.name));
    });

    // Create ABOUT-links-and-container
    let aboutContainer = document.createElement("div");
    aboutContainer.className = "about-container";

    let logout = document.createElement("button");
    logout.textContent = "Log out";
    logout.classList.add("log-out-btn");

    logout.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.replace("https://d.r101.wbsprt.com/bingy.se/index.php");
    });

    let tmdb = document.createElement("div");
    tmdb.className = "tmdb";

    let tmdbLogo = document.createElement("img");
    tmdbLogo.setAttribute("src", "https://d.r101.wbsprt.com/bingy.se/icons/tmdb.svg");
    tmdbLogo.classList.add("tmdbLogo");
    tmdbLogo.textContent = "tmdbLogo";

    let tmdbText = document.createElement("div");
    tmdbText.classList.add("tmdbText");
    tmdbText.textContent = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    tmdb.append(tmdbLogo, tmdbText);

    let git = document.createElement("div");
    git.classList.add("git");

    let gitLogo = document.createElement("img");
    gitLogo.setAttribute("src", "https://d.r101.wbsprt.com/bingy.se/icons/github.svg");
    gitLogo.classList.add("gitLogo");
    gitLogo.textContent = "gitLogo";

    let gitText = document.createElement("a");
    gitText.setAttribute("href", "https://github.com/Isak-gerre/binge");
    gitText.setAttribute("target", "_blank");
    gitText.classList.add("gitText");
    gitText.textContent = "Follow this product on github.";

    aboutContainer.append(logout, tmdb, git);
    git.append(gitLogo, gitText);

    // Append containers in main container
    hamburgerMenu.append(pagesContainer, genresContainer, aboutContainer);

    // Page-link fade in
    document.querySelectorAll(".hamburger-text").forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.setAttribute("style", `opacity: 1; transition-delay: ${index * 0.1}s; transform: translateX(15px); `);
      }, 0);
    });

    // Genre fade in
    document.querySelectorAll(".genre-link").forEach((element, index) => {
      setTimeout(() => {
        element.style.opacity = "1";
        element.setAttribute("style", `opacity: 1; transition-delay: ${index * 0.1}s; transform: translateX(15px); `);
      }, 100);
    });
  });
}

function hamburgerText(text) {
  let hamburgerText = document.createElement("p");
  hamburgerText.textContent = text;
  hamburgerText.className = "hamburger-text";

  let page = text.toLowerCase();
  let url = window.location.href;

  // Makrera den sidan som användaren är på
  if (url.includes(page)) {
    hamburgerText.classList.add("markedPage");
  } else {
    hamburgerText.classList.remove("markedPage");
  }

  hamburgerText.addEventListener("click", () => {
    if (page == "home") {
      page = "feed";
    }

    window.location.href = `${page}.php`;
  });

  return hamburgerText;
}

function createGenreLinks(genre) {
  let genreLink = document.createElement("p");
  genreLink.textContent = genre;
  genreLink.className = "genre-link";

  genreLink.addEventListener("click", () => {
    document.body.style.overflow = "visible";

    if (document.querySelector(".search-container")) {
      document.querySelector(".search-container").remove();
      makeSearchOverlay(genre, "Genre");
    } else {
      makeSearchOverlay(genre, "Genre");
    }

    // Här vill man även dölja själva menyn
    document.querySelector(".hamburger-background").style.animation = "removeHamburgerBackground 0.4s ease-out";
    document.querySelector(".hamburger-menu").style.animation = "removeHamburgerMenu 0.4s ease-out";
    document.querySelectorAll(".hamburger-text").forEach((element) => {
      element.style.opacity = "0";
    });

    setTimeout(() => {
      document.querySelector(".hamburger-menu").remove();
      document.querySelector(".hamburger-background").remove();
    }, 400);
  });

  return genreLink;
}

makeLowerNav();
