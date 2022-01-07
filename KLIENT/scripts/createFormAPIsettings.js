"use strict";



function getProviders() {
  // Ta bort API-nyckel, lägg den i APIn
  let regionRQ = new Request(
    "https://api.themoviedb.org/3/watch/providers/regions?api_key=f5c0e0db147d0e6434391f3ff153b6a8"
  );
  //Hämtar hem alla regions
  fetch(regionRQ)
    .then((response) => response.json())
    .then((data) => {
      //Skapar en select
      let selectRegion = document.createElement("select");
      selectRegion.setAttribute("id", "region");
      selectRegion.setAttribute("name", "region");

      data.results.forEach((region) => {
        //Varje option fylls med alla regions
        let opt = document.createElement("option");
        opt.setAttribute("name", `${region.english_name}`);
        opt.setAttribute("id", `${region.iso_3166_1}`);
        opt.innerHTML = `${region.english_name}`;
        opt.value = `${region.iso_3166_1}`;
        selectRegion.append(opt);
      });

      //Skapar en slect för region
      if (document.getElementById("createUserP2")) {
        document.getElementById("createUserP2").append(selectRegion);
      }

      //Selectar värdet som kommer finnas på select region.
      let filter = selectRegion;
      //Skapar ett fieldset
      let providers = document.createElement("fieldset");
      providers.setAttribute("id", "fieldSetProviders");

      let searchProvider = document.createElement("input");
      searchProvider.setAttribute("type", "text");
      searchProvider.setAttribute("class", "searchProvider");
      searchProvider.setAttribute("placeholder", "Filter Providers by name");

      let providerArray = [];

      async function loadProviders() {
        // let startNumber = document.getElementById("region").selectedIndex == 1 ? 1 : 0;
        if (document.getElementById("fieldSetProviders")) {
          document.getElementById("fieldSetProviders").innerHTML = "";
        }

        //Gör en sökning efter varje provider från api:n och laddar hem dem som är specifika till den regionen
        providerArray = [];
        // Ta bort API-nyckel, lägg den i APIn
        const response = await fetch(
          `https://api.themoviedb.org/3/watch/providers/movie?watch_region=${filter.value}&api_key=f5c0e0db147d0e6434391f3ff153b6a8`
        );
        const data = await response.json();

        providerArray = data.results;
        showProviders();

        document.getElementById("createUserP2").append(searchProvider);
        document.getElementById("createUserP2").append(providers);
      }

      //Filtrerar baserat på vad du sökt
      filter.addEventListener("change", (e) => {
        loadProviders()
      });

      searchProvider.addEventListener("keyup", () => {
        showProviders();
      });

      function showProviders() {
        let pro = document.querySelectorAll(".providersLabel");
  
        pro.forEach((e) => {
          e.style.display = "";
        });
  
        let filterArray = [];
        if (searchProvider.value != "") {
          providerArray.forEach((e) => {
            let check = e.provider_name.toLowerCase();
            if (!check.includes(`${searchProvider.value.toLowerCase()}`)) {
              filterArray.push(e);
            }
          });
        }
        providerArray.forEach((provider) => {
          if (!document.getElementById(`${provider.provider_name.split(" ").join("")}`)) {
            let selectProvider = document.createElement("input");
            let providerDiv = document.createElement("img");
            let selectProviderLabel = document.createElement("label");
  
            selectProviderLabel.setAttribute("id", `label${provider.provider_name}`);
            selectProviderLabel.setAttribute("class", "providersLabel");
  
            providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);
  
            selectProvider.setAttribute("type", "checkbox");
            selectProvider.setAttribute("name", `active_streaming_services`);
            selectProvider.setAttribute("value", `${provider.provider_name}`);
            selectProvider.style.display = "none";
            let providerID = provider.provider_name.split(" ").join("");
            selectProvider.id = providerID;
  
            selectProviderLabel.innerHTML = `${provider.provider_name}`;
  
            selectProviderLabel.append(selectProvider);
            selectProviderLabel.append(providerDiv);
            providers.append(selectProviderLabel);
  
            selectProviderLabel.addEventListener("click", () => {
              selectProviderLabel.classList.toggle("selectedProvider");
            });
  
            selectProvider.addEventListener("click", function (event) {
              event.stopPropagation();
            });
          }
        });
  
        filterArray.forEach((e) => {
          document.getElementById(`label${e.provider_name}`).style.display = "none";
        });
      }

      let userSession = sessionStorage.getItem("session");
      let id = JSON.parse(userSession).session.userID;

      let userInfo = new Request(`http://localhost:7001/GET/get-users.php?ids=${id}`);

      fetch(userInfo)
        .then(res => res.json())
        .then(data => {
          document.querySelector("input[name=firstname]").value = data[0].firstname;
          document.querySelector("input[name=lastname]").value = data[0].lastname;
          document.querySelector("input[name=email]").value = data[0].email;
          document.querySelector("input[name=birthday]").value = data[0].birthday;

          document.querySelector(`option[id=${data[0].region}]`).setAttribute("selected", true);

          filter.value = document.querySelector(`option[id=${data[0].region}]`).value;

          //Selects the providers from users region
          loadProviders().then(() => {
            data[0].active_streaming_services.forEach(e => {
              let id = e.split(" ").join("");
              document.querySelector(`#${id}`).setAttribute("checked", true)
              document.querySelector(`#${id}`).parentElement.classList.add("selectedProvider")
            });
          });

          //On change of region it only selects if the region is the same as the users current region.
          filter.addEventListener("change", (e) => {
            if (filter.value == data[0].region) {
              loadProviders().then(() => {
                data[0].active_streaming_services.forEach(e => {
                  let id = e.split(" ").join("");
                  document.querySelector(`#${id}`).setAttribute("checked", true)
                  document.querySelector(`#${id}`).parentElement.classList.add("selectedProvider")
                });
              });
            }
          });
          console.log(data[0].profile_picture.filepath);
        });
    });
};

