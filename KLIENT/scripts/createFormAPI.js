"use strict";

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
      opt.innerHTML = `${region.english_name}`;
      opt.value = `${region.iso_3166_1}`;
      selectRegion.append(opt);
    });

    //Skapar en defult secelt som inte går att välja och inte har ett värde
    let opt = document.createElement("option");
    opt.setAttribute("name", "");
    opt.innerHTML = "Select a region";
    opt.value = "None";
    opt.setAttribute("disabled", "true");
    opt.setAttribute("selected", "true");

    selectRegion.prepend(opt);

    //Skapar en slect för region
    document.getElementById("createUserP2").append(selectRegion);

    //Skapar knapparna
    let buttonWrapper = document.createElement("div");
    buttonWrapper.id = "buttonWrapper";
    let button = document.createElement("button");
    button.innerHTML = "Skip";
    button.setAttribute("id", "skip2");
    button.setAttribute("type", "button");

    let button1 = document.createElement("button");
    button1.innerHTML = "Next";
    button1.setAttribute("id", "next2");
    button1.setAttribute("type", "button");

    buttonWrapper.append(button, button1);
    document.getElementById("createUserP2").append(buttonWrapper);

    document.getElementById("next2").addEventListener("click", () => {
      let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
      if (filter.value == "Select a region") {
        document.querySelector("#createUserP2 > p").innerHTML = "Please choose atleast one region";
        console.log("please choose a region");
      } else if (checkboxes.length == 0) {
        document.querySelector("#createUserP2 > p").innerHTML = "Please choose at least one provider";
      } else {
        document.getElementById("createUserP2").style.display = "none";
        document.getElementById("createUserP3").style.display = "";
      }
    });

    document.getElementById("skip2").addEventListener("click", () => {
      document.getElementById("createUserP2").style.display = "none";
      document.getElementById("createUserP3").style.display = "";
    });

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
    //Filtrerar baserat på vad du sökt
    filter.addEventListener("change", (e) => {
      //Gör en sökning efter varje provider från apin och laddar hem dem som är specifika till den regionen
      providerArray = [];
      // Ta bort API-nyckel, lägg den i APIn
      const provider = new Request(
        `https://api.themoviedb.org/3/watch/providers/movie?watch_region=${filter.value}&api_key=f5c0e0db147d0e6434391f3ff153b6a8`
      );
      fetch(provider)
        .then((response) => response.json())
        .then((data) => {
          providerArray = data.results;
          showProviders();
        });
      document.getElementById("createUserP2").insertBefore(searchProvider, buttonWrapper);
      document.getElementById("createUserP2").insertBefore(providers, buttonWrapper);
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
        if (!document.getElementById(`${provider.provider_name}`)) {
          let selectProvider = document.createElement("input");
          let providerDiv = document.createElement("img");
          let selectProviderLabel = document.createElement("label");

          selectProviderLabel.setAttribute("id", `label${provider.provider_name}`);
          selectProviderLabel.setAttribute("class", "providersLabel");

          providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);

          selectProvider.setAttribute("type", "checkbox");
          selectProvider.setAttribute("value", `${provider.provider_name}`);
          selectProvider.style.display = "none";
          selectProvider.setAttribute("id", `${provider.provider_name}`);

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
  });