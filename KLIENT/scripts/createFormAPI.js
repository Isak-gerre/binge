"use strict"

// Ta bort API-nyckel, lägg den i APIn

const region = new Request("https://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8");
//Hämtar hem alla regions
fetch(region)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        //Skapar en select
        let selectRegion = document.createElement("select");
        selectRegion.setAttribute("id", "selectRegion");
        selectRegion.setAttribute("name", "selectRegion")
        data.results.forEach(region => {
            //Varje option fylls med alla regions
            let opt = document.createElement("option");
            opt.setAttribute("name", `${region.english_name}`);
            opt.innerHTML = `${region.english_name}`;
            opt.value = `${region.iso_3166_1}`
            selectRegion.append(opt); 
        });

        //Skapar en defult secelt som inte går att välja och inte har ett värde
        let opt = document.createElement("option");
        opt.setAttribute("value", "");
        opt.innerHTML = "Select a region";
        opt.setAttribute("disabled", "true");
        opt.setAttribute("selected", "true");

        selectRegion.prepend(opt);

        //Skapar en slect för region
        document.getElementById("createUserP2").append(selectRegion);

        //Skapar knapparna
        let button = document.createElement("button");
        button.innerHTML = "Skip";
        button.setAttribute("id", "skip2");
        button.setAttribute("type", "button");
        document.getElementById("createUserP2").append(button);

        let button1 = document.createElement("button");
        button1.innerHTML = "Next";
        button1.setAttribute("id", "next2");
        button1.setAttribute("type", "button");
        document.getElementById("createUserP2").append(button1);

        
        document.getElementById("next2").addEventListener("click", () => {
            let checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
            console.log(checkboxes.length);
            if(filter.value == ""){
                console.log("please choose a region");
            }
            else if(checkboxes.length == 0){
                console.log("please choose at least one provider");
            }
            else{
                console.log("Event Click 2");
                document.getElementById("createUserP2").style.visibility = "hidden";
                document.getElementById("createUserP3").style.visibility = "visible";
            }
            
        });
        document.getElementById("skip2").addEventListener("click", () => {
            console.log("Event Click 2");
            document.getElementById("createUserP2").style.visibility = "hidden";
            document.getElementById("createUserP3").style.visibility = "visible";
        });

        //Selectar värdet som kommer finnas på select region.
        let filter = document.getElementById("selectRegion");

        //Skapar ett fieldset
        let providers = document.createElement("fieldset");
        providers.setAttribute("id", "fieldSetProviders");

        let searchProvider = document.createElement("input");
        searchProvider.setAttribute("type", "text");
        searchProvider.setAttribute("class", "searchProvider");
        searchProvider.setAttribute("placeholder", "Filter Providers by name");

        let providerArray = [];
        
        //Filtrerar baserat på vad du sökt
        filter.addEventListener("change", () => {

            //Gör en sökning efter varje provider från apin och laddar hem dem som är specifika till den regionen
            providerArray = [];
            // Ta bort API-nyckel, lägg den i APIn
            const provider = new Request(`https://api.themoviedb.org/3/watch/providers/movie?watch_region=${filter.value}&api_key=f5c0e0db147d0e6434391f3ff153b6a8`);
            fetch(provider)
            .then(response => response.json())
            .then(data => { 
                providerArray = data.results;
                showProviders();
            });
            document.getElementById("createUserP2").insertBefore(searchProvider, button);
            document.getElementById("createUserP2").insertBefore(providers, button);
        });

        searchProvider.addEventListener("keyup", () => {
            showProviders()
        });

        function showProviders(){
            console.log("hej");
            providers.innerHTML = "";
            let filterArray = [];
            if(searchProvider.value != ""){
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

                selectProvider.setAttribute("type", "checkbox");
                selectProvider.setAttribute("value", `${provider.provider_name}`);
                selectProvider.setAttribute("id", `${provider.provider_name}`);
                selectProvider.setAttribute("class", "selectProvider");

                selectProviderLabel.setAttribute("for", `${provider.provider_name}`);
                selectProviderLabel.innerHTML = `${provider.provider_name}`;

                providers.append(selectProvider);
                providers.append(selectProviderLabel);

            });
        }     
    });

