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
    navLeft.innerHTML = `<a href='index.php'><img src='../styles/images/iconBack.png' class ='navImg' alt='Back'></a>`;
    navMiddle.innerHTML =  `<a href='index.php'><img src='../styles/images/bForBingy.png' class ='navImg' alt='Back'></a>`;
    navRight.innerHTML =  `<a href='index.php'><img src='../styles/images/iconSearch.png' class ='navImg' alt='Search'></a>`;
 
    //append
    upperNav.append(navLeft, navMiddle, navRight);
    document.getElementById("wrapper").append(upperNav);
}
makeUpperNav();

function makeLowerNav(page) {

    //create elements
    let lowerNav = document.createElement('nav');
    let lowerNavLeft = document.createElement('div');
    let lowerNavMiddle = document.createElement('div');
    let lowerNavRight = document.createElement('div');
    
    //classes
    lowerNav.className = "lowerNav";
    lowerNavLeft.className = "lowerNavLeft";
    lowerNavMiddle.className = "lowerNavMiddle";
    lowerNavRight.className = "lowerNavRight";

    //content
    lowerNavLeft.innerHTML = `<a href='feed.php'><img src='../styles/images/iconHome.svg' class ='navImg' alt='Home'></a>`;
    lowerNavMiddle.innerHTML =  `<a href='explore.php'><img src='../styles/images/iconExplore.png' class ='navImg' alt='Explore'></a>`;
    lowerNavRight.innerHTML =  `<a href='profile.php'><img src='../styles/images/iconProfile1.png' class ='navImg' alt='Profile'></a>`;
    
    if(page == 'home'){
        lowerNavLeft.classList.add('current');
    }

    //append
    lowerNav.append(lowerNavLeft, lowerNavMiddle, lowerNavRight);
    document.getElementById("wrapper").append(lowerNav);
}

makeLowerNav('home');
