// Skapa navigationen

"use strict";

function makeUpperNav(page) {
    //create elements
    let upperNav = document.createElement('nav');
    let navLeft = document.createElement('div');
    let navMiddle = document.createElement('div');
    let navRight = document.createElement('div');
    

    //classes
    upperNav.className = "upperNav";
    navLeft.className = "navLeft";
    navMiddle.className = "navMiddle";
    navRight.className = "navRight";

 
    //content
    navLeft.textContent = "Back";
    navMiddle.textContent = "Logo";
    navRight.textContent = "Search";
 
    //append
    upperNav.append(navLeft, navMiddle, navRight);
    document.getElementById("wrapper").append(upperNav);
}

makeUpperNav();

function makeLowerNav(page) {

}
