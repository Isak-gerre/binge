"use strict"

console.log("hej");
// Ta bort API-nyckel, lägg den i APIn

const region = new Request("https://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8");

fetch(region)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let selectRegion = document.createElement("select");
        selectRegion.setAttribute("id", "selectRegion");
        // la till name
        selectRegion.setAttribute("name", "selectRegion")
        data.results.forEach(region => {
            let opt = document.createElement("option");
            opt.setAttribute("name", `${region.english_name}`);
            opt.innerHTML = `${region.english_name}`;
            opt.value = `${region.iso_3166_1}`
            selectRegion.append(opt); 
        });
        document.getElementById("signUpForm").append(selectRegion);

        let filter = document.getElementById("selectRegion");
        
        let providers = document.createElement("fieldset");
        providers.setAttribute("id", "fieldSetProviders");

        let searchProvider = document.createElement("input");
        searchProvider.setAttribute("type", "text");
        searchProvider.setAttribute("class", "searchProvider");
        searchProvider.setAttribute("placeholder", "Filter Providers by name");

        let providerArray = [];

        filter.addEventListener("change", () => {

            providerArray = [];
            providers.innerHTML = "";
            // Ta bort API-nyckel, lägg den i APIn
            const provider = new Request(`https://api.themoviedb.org/3/watch/providers/movie?watch_region=${filter.value}&api_key=f5c0e0db147d0e6434391f3ff153b6a8`);
            fetch(provider)
            .then(response => response.json())
            .then(data => { 
                providerArray = data.results;
                showProviders ();
            });
            document.getElementById("signUpForm").append(searchProvider);
            document.getElementById("signUpForm").append(providers);
        });

        function showProviders(){

            let filterArray = [];
            if(searchProvider.value != ""){
                console.log("route 1");
                providerArray.forEach(e => {
                    let check = e.provider_name.toLowerCase();
                    if(check.includes(`${searchProvider.value.toLowerCase()}`)){
                        filterArray.push(e);
                    }
                });
            }
            else
            {
                console.log("route 2");
                filterArray = providerArray;
            }

            filterArray.forEach(provider => {
                let selectProvider = document.createElement("input");
                let selectProviderLabel = document.createElement("label");
                selectProvider.setAttribute("id", `${provider.provider_name}`);
                selectProvider.setAttribute("type", "checkbox");
                selectProvider.setAttribute("name", `${provider.provider_name}`);
                selectProvider.setAttribute("class", "selectProvider");
                selectProviderLabel.setAttribute("for", `${provider.provider_name}`);
                selectProviderLabel.innerHTML = `${provider.provider_name}`;
                providers.append(selectProvider);
                providers.append(selectProviderLabel);
    
            });

            if(!document.getElementById("signInButton")){
                let button = document.createElement("button");
                button.setAttribute("id", "signInButton");
                button.innerHTML = "Sign Up";
                document.getElementById("signUpForm").append(button);

            }
            
        }

        searchProvider.addEventListener("keyup", () => {
            document.getElementById("fieldSetProviders").innerHTML = "";
            showProviders ();
        });

        // let selectProvider = document.createElement("checkbox");
        // data.results.forEach(provider => {
        //     let opt = document.createElement("option");
        //     opt.innerHTML = `${provider.english_name}`
        //     selectRegion.append(opt);
        // });
        // document.getElementById("signUpForm").append(selectRegion);
});
