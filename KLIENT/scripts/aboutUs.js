// Cred till TMD + deras logga
// Info om sidan och vilka vi är som gjort den
// Bilder på oss
// länk till github 

const footer = document.getElementById("footer");

// CONTAINER row
let footerContainer = document.createElement("div");
footerContainer.classList.add("footerContainer");
footer.append(footerContainer);

// LEFT & RIGHT column
let footerContainerLeft = document.createElement("div");
footerContainerLeft.classList.add("footerContainerLeft");
footerContainerLeft.textContent = "B";

let footerContainerRight = document.createElement("div");
footerContainerRight.classList.add("footerContainerRight");

footerContainer.append(footerContainerLeft, footerContainerRight);

// RIGHT TOP row
let tmdb = document.createElement("div");
tmdb.classList.add("tmdb");

let tmdbLogo = document.createElement("img");
tmdbLogo.setAttribute("src", "../icons/tmdb.svg");
tmdbLogo.classList.add("tmdbLogo");
tmdbLogo.textContent = "tmdbLogo";

let tmdbText = document.createElement("div");
tmdbText.classList.add("tmdbText");
tmdbText.textContent = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

footerContainerRight.append(tmdb);
tmdb.append(tmdbLogo, tmdbText);

// RIGHT BOTTOM row
let git = document.createElement("div");
git.classList.add("git");

let gitLogo = document.createElement("img");
gitLogo.setAttribute("src", "../icons/github.svg");
gitLogo.classList.add("gitLogo");
gitLogo.textContent = "gitLogo";

let gitText = document.createElement("div");
gitText.classList.add("gitText");
gitText.innerHTML = `<a href="https://github.com/Isak-gerre/binge" target=”_blank”> Follow this product on github.</a>`;

footerContainerRight.append(git);
git.append(gitLogo, gitText);




