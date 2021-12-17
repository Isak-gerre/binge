"use strict"

console.log("hej");

const region = new Request("https://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8");

fetch(region)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let selectRegion = document.createElement("select");
        selectRegion.setAttribute("id", "selectRegion")
        data.results.forEach(region => {
            let opt = document.createElement("option");
            opt.innerHTML = `${region.english_name}`;
 
            opt.addEventListener("click", () => {
                
            })

            selectRegion.append(opt);
        });
        document.getElementById("signUpForm").append(selectRegion);

        let filter = document.getElementById("selectRegion");
        
        filter.addEventListener("change", () => {
            const provider = new Request(`https://api.themoviedb.org/3/watch/providers/movie?watch_region=${}&api_key=f5c0e0db147d0e6434391f3ff153b6a8`);
            fetch(provider)
            .then(response => response.json())
            .then(data => {
            console.log(data);
            });
        });


        // let selectProvider = document.createElement("checkbox");
        // data.results.forEach(provider => {
        //     let opt = document.createElement("option");
        //     opt.innerHTML = `${provider.english_name}`
        //     selectRegion.append(opt);
        // });
        // document.getElementById("signUpForm").append(selectRegion);
});
