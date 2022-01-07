// Det som ska sparas i STATE
// URL

//Struktur tillkommer

"use strict";
function goToPageAndAddToState(href, search = null) {
  document.querySelector("nav").style.opacity = 1;
  document.querySelector("#wrapper").style.opacity = 0;
  if (document.querySelector(".search-container") != null) {
    document.querySelector(".search-container").style.opacity = 0;
  }
  if (document.querySelector("#overlay") != null) {
    document.querySelector("#overlay").style.opacity = 0;
  }

  let scrollDistance =
    window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  addToState(window.location, scrollDistance, search);

  console.log(scrollDistance);
  console.log(window.location);
  window.location.href = href;
}
function applyState() {
  let allStates = getFromSession("state");
  if (allStates == null) {
    return;
  }
  // Tar bort nyaste state
  let appliedState = allStates[0];
  allStates.splice(0, 1);

  // sparar ny array av states
  saveToSession(allStates, "state");

  // Skickar till ny sida
  let windowHasqMark = appliedState.page.href.includes("?") ? appliedState.page.href : appliedState.page.href + "?";
  let searchParams = "";
  if (appliedState.search) {
    searchParams = `&search_word=${appliedState.search.search_word}&search_by=${appliedState.search.search_by}&open=${appliedState.search.openSearch}`;
  }
  let scroll = appliedState.scrollHeight != 0 ? `&scroll=${appliedState.scrollHeight}` : "";
  setTimeout(function () {
    window.location.href = windowHasqMark + scroll + searchParams;
  }, 200);
}
