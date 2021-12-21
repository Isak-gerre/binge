// Skapa navigationen

"use strict";

function makeUpperNav() {
    //create elements
    let upperNav = document.createElement('nav');
    let navLeft = document.createElement('div');
    let navMiddle = document.createElement('div');
    let navRight = document.createElement('div');

    let searchImg = document.createElement('img');
    searchImg.src = `../styles/images/iconSearch.png`;

    let searchDiv = document.createElement('div');
    searchDiv.className = "search";

    //classes
    upperNav.className = "upperNav";
    navLeft.className = "navLeft";
    navMiddle.className = "navMiddle";
    navRight.className = "navRight";
    searchImg.className = "navImg";

    //content
    navLeft.innerHTML = `<a href='feed.php'><img src='../styles/images/iconBack.png' class ='navImg' alt='Back'></a>`;
    navMiddle.innerHTML =  `<a href='feed.php'><img src='../styles/images/bForBingy.png' class ='navImg' alt='B'></a>`;

    searchImg.addEventListener('click', ()=> {
        searchDiv.innerHTML = `
        <input type="text" id="searchField" name="search">
        <button class="hiddenButton"></button>
        <img src='../styles/images/iconClose.png' class ='navImg closeImg' alt='close'>
        `;

        searchDiv.classList.add = "search";
        upperNav.append(searchDiv);
        
        makeSearchOverlay();
        document.getElementById('searchField').addEventListener('keyup', () => {
            setTimeout(() => {
                searchFunction();
            }, 500);
        });
        let searchOverlay = document.querySelector('.searchOverlay');
        
        //Animations and closing
        let animation = 'searchBar .5s ease-in-out';
        searchDiv.style.animation= animation;
        
        document.querySelector('.closeImg').addEventListener('click', ()=> {
            animation = 'removeSearchBar .5s ease-in-out';
            searchDiv.style.animation= animation;
            searchOverlay.style.animation= animation;

            setTimeout(()=>{
                searchOverlay.remove();
                searchDiv.remove();

            }, 500)
        })
    })

    //append
    upperNav.append(navLeft, navMiddle, navRight);
    navRight.append(searchImg);
    document.body.prepend(upperNav);
}
makeUpperNav();

function makeLowerNav() {

    //create elements
    let lowerNav = document.createElement('nav');
    let backLowerNav = document.createElement('div');
    let lowerNavLeft = document.createElement('div');
    let lowerNavMiddle = document.createElement('div');
    let lowerNavRight = document.createElement('div');
    
    //classes
    lowerNav.className = "lowerNav";
    backLowerNav.className = "backLowerNav";
    lowerNavLeft.className = "lowerNavLeft";
    lowerNavMiddle.className = "lowerNavMiddle";
    lowerNavRight.className = "lowerNavRight";

    let homeSvg = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g data-name="372-Home" id="_372-Home"><polyline class="cls-1" points="1 16 16 1 31 16"/><polyline class="cls-1" points="27 12 27 31 5 31 5 12"/></g></svg>`;
    let exploreSvg = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M24,45C12.402,45,3,35.598,3,24S12.402,3,24,3s21,9.402,21,21S35.598,45,24,45z   M24,5C13.507,5,5,13.507,5,24s8.507,19,19,19s19-8.507,19-19S34.493,5,24,5z M40,25h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1  c0.553,0,1,0.447,1,1S40.553,25,40,25z M33.979,33.204c-0.032,0.188-0.115,0.367-0.261,0.514c-0.308,0.307-0.762,0.355-1.129,0.172  l0.058,0.059l0.008,0.008l0,0l0,0c-0.162-0.067-0.306-0.13-0.464-0.195c-5.189-2.162-8.213-3.856-9.867-4.938  c-1.313-0.858-1.775-1.333-1.794-1.353c-0.045-0.043-2.488-2.412-6.485-12.125l0.001,0c0,0,0,0-0.001,0l0.067,0.067  c-0.01-0.02-0.012-0.042-0.02-0.062C14,15.139,13.99,14.908,14.054,14.69c0.044-0.147,0.111-0.29,0.229-0.407  c0.299-0.299,0.738-0.35,1.101-0.181c0.009,0.004,0.02,0.005,0.028,0.01l-0.023-0.025l-0.043-0.042c0,0,0,0,0.001,0l-0.001,0  c9.713,3.997,12.082,6.44,12.125,6.485c0.045,0.043,2.488,2.413,6.485,12.125l-0.001-0.001c0.001,0,0.001,0.001,0.001,0.001  l-0.044-0.044l-0.023-0.022c0.023,0.047,0.032,0.097,0.048,0.146C33.986,32.888,34.006,33.047,33.979,33.204z M26.046,21.933  c-0.021-0.021-2.016-1.927-9.187-5.073c3.146,7.171,5.055,9.167,5.095,9.208c0.021,0.021,2.016,1.928,9.187,5.073  C27.995,23.969,26.086,21.974,26.046,21.933z M24,23c0.553,0,1,0.447,1,1s-0.447,1-1,1s-1-0.447-1-1S23.447,23,24,23z M24,10  c-0.553,0-1-0.448-1-1V8c0-0.552,0.447-1,1-1s1,0.448,1,1v1C25,9.552,24.553,10,24,10z M24,38c0.553,0,1,0.447,1,1v1  c0,0.553-0.447,1-1,1s-1-0.447-1-1v-1C23,38.447,23.447,38,24,38z M9,25H8c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1  S9.553,25,9,25z" fill-rule="evenodd"/></svg>`;
    let profileSvg = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 48 48" height="48px" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M24,45C12.402,45,3,35.598,3,24S12.402,3,24,3s21,9.402,21,21S35.598,45,24,45z   M35.633,39c-0.157-0.231-0.355-0.518-0.514-0.742c-0.277-0.394-0.554-0.788-0.802-1.178C34.305,37.062,32.935,35.224,28,35  c-1.717,0-2.965-1.288-2.968-3.066L25,31c0-0.135-0.016,0.148,0,0v-1l1-1c0.731-0.339,1.66-0.909,2.395-1.464l0.135-0.093  C29.111,27.074,29.923,26.297,30,26l0.036-0.381C30.409,23.696,31,20.198,31,19c0-4.71-2.29-7-7-7c-4.775,0-7,2.224-7,7  c0,1.23,0.591,4.711,0.963,6.616l0.035,0.352c0.063,0.313,0.799,1.054,1.449,1.462l0.098,0.062C20.333,28.043,21.275,28.657,22,29  l1,1v1c0.014,0.138,0-0.146,0,0l-0.033,0.934c0,1.775-1.246,3.064-2.883,3.064c-0.001,0-0.002,0-0.003,0  c-4.956,0.201-6.393,2.077-6.395,2.077c-0.252,0.396-0.528,0.789-0.807,1.184c-0.157,0.224-0.355,0.51-0.513,0.741  c3.217,2.498,7.245,4,11.633,4S32.416,41.498,35.633,39z M24,5C13.507,5,5,13.507,5,24c0,5.386,2.25,10.237,5.85,13.694  C11.232,37.129,11.64,36.565,12,36c0,0,1.67-2.743,8-3c0.645,0,0.967-0.422,0.967-1.066h0.001C20.967,31.413,20.967,31,20.967,31  c0-0.13-0.021-0.247-0.027-0.373c-0.724-0.342-1.564-0.814-2.539-1.494c0,0-2.4-1.476-2.4-3.133c0,0-1-5.116-1-7  c0-4.644,1.986-9,9-9c6.92,0,9,4.356,9,9c0,1.838-1,7-1,7c0,1.611-2.4,3.133-2.4,3.133c-0.955,0.721-1.801,1.202-2.543,1.546  c-0.005,0.109-0.023,0.209-0.023,0.321c0,0-0.001,0.413-0.001,0.934h0.001C27.033,32.578,27.355,33,28,33c6.424,0.288,8,3,8,3  c0.36,0.565,0.767,1.129,1.149,1.694C40.749,34.237,43,29.386,43,24C43,13.507,34.493,5,24,5z" fill-rule="evenodd"/></svg>`;
    
    if (window.location.href.indexOf("home") > -1){
        homeSvg = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;stroke:#361986;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g data-name="372-Home" id="_372-Home"><polyline class="cls-1" points="1 16 16 1 31 16"/><polyline class="cls-1" points="27 12 27 31 5 31 5 12"/></g></svg>`;
    } else if (window.location.href.indexOf("explore") > -1) {
        exploreSvg = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 48 48" height="48px" stroke="#361986" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M24,45C12.402,45,3,35.598,3,24S12.402,3,24,3s21,9.402,21,21S35.598,45,24,45z   M24,5C13.507,5,5,13.507,5,24s8.507,19,19,19s19-8.507,19-19S34.493,5,24,5z M40,25h-1c-0.553,0-1-0.447-1-1s0.447-1,1-1h1  c0.553,0,1,0.447,1,1S40.553,25,40,25z M33.979,33.204c-0.032,0.188-0.115,0.367-0.261,0.514c-0.308,0.307-0.762,0.355-1.129,0.172  l0.058,0.059l0.008,0.008l0,0l0,0c-0.162-0.067-0.306-0.13-0.464-0.195c-5.189-2.162-8.213-3.856-9.867-4.938  c-1.313-0.858-1.775-1.333-1.794-1.353c-0.045-0.043-2.488-2.412-6.485-12.125l0.001,0c0,0,0,0-0.001,0l0.067,0.067  c-0.01-0.02-0.012-0.042-0.02-0.062C14,15.139,13.99,14.908,14.054,14.69c0.044-0.147,0.111-0.29,0.229-0.407  c0.299-0.299,0.738-0.35,1.101-0.181c0.009,0.004,0.02,0.005,0.028,0.01l-0.023-0.025l-0.043-0.042c0,0,0,0,0.001,0l-0.001,0  c9.713,3.997,12.082,6.44,12.125,6.485c0.045,0.043,2.488,2.413,6.485,12.125l-0.001-0.001c0.001,0,0.001,0.001,0.001,0.001  l-0.044-0.044l-0.023-0.022c0.023,0.047,0.032,0.097,0.048,0.146C33.986,32.888,34.006,33.047,33.979,33.204z M26.046,21.933  c-0.021-0.021-2.016-1.927-9.187-5.073c3.146,7.171,5.055,9.167,5.095,9.208c0.021,0.021,2.016,1.928,9.187,5.073  C27.995,23.969,26.086,21.974,26.046,21.933z M24,23c0.553,0,1,0.447,1,1s-0.447,1-1,1s-1-0.447-1-1S23.447,23,24,23z M24,10  c-0.553,0-1-0.448-1-1V8c0-0.552,0.447-1,1-1s1,0.448,1,1v1C25,9.552,24.553,10,24,10z M24,38c0.553,0,1,0.447,1,1v1  c0,0.553-0.447,1-1,1s-1-0.447-1-1v-1C23,38.447,23.447,38,24,38z M9,25H8c-0.553,0-1-0.447-1-1s0.447-1,1-1h1c0.553,0,1,0.447,1,1  S9.553,25,9,25z" fill-rule="evenodd"/></svg>`;
    } else if (window.location.href.indexOf("profile") > -1){
        profileSvg = `<?xml version="1.0" ?><!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 48 48" height="48px" stroke="#361986" id="Layer_1" version="1.1" viewBox="0 0 48 48" width="48px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M24,45C12.402,45,3,35.598,3,24S12.402,3,24,3s21,9.402,21,21S35.598,45,24,45z   M35.633,39c-0.157-0.231-0.355-0.518-0.514-0.742c-0.277-0.394-0.554-0.788-0.802-1.178C34.305,37.062,32.935,35.224,28,35  c-1.717,0-2.965-1.288-2.968-3.066L25,31c0-0.135-0.016,0.148,0,0v-1l1-1c0.731-0.339,1.66-0.909,2.395-1.464l0.135-0.093  C29.111,27.074,29.923,26.297,30,26l0.036-0.381C30.409,23.696,31,20.198,31,19c0-4.71-2.29-7-7-7c-4.775,0-7,2.224-7,7  c0,1.23,0.591,4.711,0.963,6.616l0.035,0.352c0.063,0.313,0.799,1.054,1.449,1.462l0.098,0.062C20.333,28.043,21.275,28.657,22,29  l1,1v1c0.014,0.138,0-0.146,0,0l-0.033,0.934c0,1.775-1.246,3.064-2.883,3.064c-0.001,0-0.002,0-0.003,0  c-4.956,0.201-6.393,2.077-6.395,2.077c-0.252,0.396-0.528,0.789-0.807,1.184c-0.157,0.224-0.355,0.51-0.513,0.741  c3.217,2.498,7.245,4,11.633,4S32.416,41.498,35.633,39z M24,5C13.507,5,5,13.507,5,24c0,5.386,2.25,10.237,5.85,13.694  C11.232,37.129,11.64,36.565,12,36c0,0,1.67-2.743,8-3c0.645,0,0.967-0.422,0.967-1.066h0.001C20.967,31.413,20.967,31,20.967,31  c0-0.13-0.021-0.247-0.027-0.373c-0.724-0.342-1.564-0.814-2.539-1.494c0,0-2.4-1.476-2.4-3.133c0,0-1-5.116-1-7  c0-4.644,1.986-9,9-9c6.92,0,9,4.356,9,9c0,1.838-1,7-1,7c0,1.611-2.4,3.133-2.4,3.133c-0.955,0.721-1.801,1.202-2.543,1.546  c-0.005,0.109-0.023,0.209-0.023,0.321c0,0-0.001,0.413-0.001,0.934h0.001C27.033,32.578,27.355,33,28,33c6.424,0.288,8,3,8,3  c0.36,0.565,0.767,1.129,1.149,1.694C40.749,34.237,43,29.386,43,24C43,13.507,34.493,5,24,5z" fill-rule="evenodd"/></svg>
        `;
    }
    
    //content
    lowerNavLeft.innerHTML = `<a href='feed.php'>${homeSvg}</a>`;
    lowerNavMiddle.innerHTML =  `<a href='explore.php'>${exploreSvg}</a>`;
    lowerNavRight.innerHTML =  `<a href='profile.php'>${profileSvg}</a>`;

    //append
    lowerNav.append(backLowerNav, lowerNavLeft, lowerNavMiddle, lowerNavRight);
    // document.getElementById("wrapper").append(lowerNav);
    document.body.append(lowerNav);
}

makeLowerNav('home');
// makeLowerNav('explore');
// makeLowerNav('profile');
