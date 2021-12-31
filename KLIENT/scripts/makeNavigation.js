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
  document.querySelector(".back").addEventListener("click", () => {
    document.body.style.overflow = "visible";
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
      document.body.style.overflow = "hidden";
      makeSearchOverlay();
      document.querySelector(".back").setAttribute("src", "../icons/exit 2.svg");
      document.querySelector(".back").addEventListener("click", () => {
        document.querySelector(".back").setAttribute("src", "../icons/back.svg");
        document.querySelector(".search-container").style.animation = "removeSearchBar 0.2s ease-out";
        setTimeout(() => {
          document.querySelector(".search-container").remove();
        }, 200);
      });
      document.querySelector(".search-container").style.animation = "searchBar 0.2s ease-out";
    } else {
      document.body.style.overflow = "visible";
      document.querySelector(".back").setAttribute("src", "../icons/back.svg");
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

async function makeHamburgerMenu() {
  let pages = ["Feed", "Explore", "Profile"]; // Home eller feed? ska vi döpa om hela filen, för denna blir inte markerad annars, ändrar till feed nu. / ns
  let genres = await getGenres();

  // Black overlay
  let hamburgerBackground = document.createElement("div");
  hamburgerBackground.className = "hamburger-background";

  // Menu container
  let hamburgerMenu = document.createElement("div");
  hamburgerMenu.className = "hamburger-menu";
  document.body.append(hamburgerMenu, hamburgerBackground);

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
  })

  // Create ABOUT-links-and-container
  let aboutContainer = document.createElement("div");
  aboutContainer.className = "about-container";

  let logout = hamburgerText("Log out");
  logout.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.replace("http://localhost:2000");
  })

  let tmdb = document.createElement("div");
  tmdb.className = "tmdb";

  let tmdbLogo = document.createElement("img");
  tmdbLogo.setAttribute("src", "../icons/tmdb.svg");
  tmdbLogo.classList.add("tmdbLogo");
  tmdbLogo.textContent = "tmdbLogo";

  let tmdbText = document.createElement("div");
  tmdbText.classList.add("tmdbText");
  tmdbText.textContent = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

  tmdb.append(tmdbLogo, tmdbText);

  let git = document.createElement("div");
  git.classList.add("git");

  let gitLogo = document.createElement("img");
  gitLogo.setAttribute("src", "../icons/github.svg");
  gitLogo.classList.add("gitLogo");
  gitLogo.textContent = "gitLogo";

  let gitText = document.createElement("div");
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
      element.setAttribute("style", `opacity: 1; transition-delay: ${index * 0.3 + 0.6}s;`);
    }, 0);
  });

  // Genre fade in
  document.querySelectorAll(".genre-link").forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.setAttribute("style", `opacity: 1; transition-delay: 0.9s;`);
    }, 1000);
  });
}

function hamburgerText(text) {
  let hamburgerText = document.createElement("p");
  hamburgerText.textContent = text;
  hamburgerText.className = "hamburger-text";

  let page = text.toLowerCase();
  let url = window.location.href;

  // Makrera den sidan som användaren är på
  if(url.includes(page)) {
    hamburgerText.classList.add("markedPage");
    // hamburgerText.style.fontWeight = "bold"; // vf funkar ej detta?
  } else {
    hamburgerText.classList.remove("markedPage");
  }

  hamburgerText.addEventListener("click", () => {
    if(page == "home"){
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

    console.log(document.querySelector(".search-container"));
    if(document.querySelector(".search-container")){
      
      document.querySelector(".search-container").remove();
      makeSearchOverlay(genre);
    } else {
      makeSearchOverlay(genre);
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
