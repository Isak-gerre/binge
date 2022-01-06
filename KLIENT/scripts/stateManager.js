// Det som ska sparas i STATE
// URL

//Struktur tillkommer

"use strict";
function goToPageAndAddToState(href, search = null) {
  let scrollDistance =
    window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;

  addToState(window.location, scrollDistance, search);

  console.log(scrollDistance);
  console.log(window.location);
  window.location.href = href;
}
function applyState() {
  let allStates = getFromSession("state");

  // Tar bort nyaste state
  let appliedState = allStates[0];
  allStates.splice(0, 1);

  // sparar ny array av states
  saveToSession(allStates, "state");

  // Skickar till ny sida
  let searchParams = "";
  if (appliedState.search) {
    searchParams = `&search_word=${appliedState.search.search_word}&search_by=${appliedState.search.search_by}&open=${appliedState.search.openSearch}`;
  }
  let scroll = appliedState.scrollHeight != 0 ? `&scroll=${appliedState.scrollHeight}` : "";
  window.location.href = appliedState.page.href + scroll + searchParams;
}
