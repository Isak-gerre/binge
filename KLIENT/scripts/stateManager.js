// Det som ska sparas i STATE
// URL

//Struktur tillkommer

"use strict";
function goToPageAndAddToState(href, search = null) {
  var scrollDistance =
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
  let scroll = appliedState.scrollHeight != 0 ? `&scroll=${appliedState.scrollHeight}` : "";
  window.location.href = appliedState.page.href + scroll;
}
