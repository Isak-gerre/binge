"use strict";

// Ta bort API-nyckel, lägg den i APIn

let regionRQ = new Request(
  "http://localhost:7001/GET/get-regions.php"
);
//Hämtar hem alla regions
fetch(regionRQ)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
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
    opt.setAttribute("value", "");
    opt.innerHTML = "Select a region";
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
      console.log(checkboxes.length);
      if (filter.value == "") {
        console.log("please choose a region");
      } else if (checkboxes.length == 0) {
        console.log("please choose at least one provider");
      } else {
        console.log("Event Click 2");
        document.getElementById("createUserP2").style.display = "none";
        document.getElementById("createUserP3").style.display = "";
      }
    });

    document.getElementById("skip2").addEventListener("click", () => {
      console.log("Event Click 2");
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
      // let startNumber = document.getElementById("region").selectedIndex == 1 ? 1 : 0;
      // if (document.getElementById("fieldSetProviders")) {
      //   document.getElementById("fieldSetProviders").innerHTML = "";
      // }
      // let selected = e.target.selectedOptions[startNumber].getAttribute("name");
      // let length = e.originalTarget.options.length;
      // for (let i = 1; i < length; i++) {
      //   if (e.originalTarget.options[i].innerHTML == selected) {
      //     document.getElementById("region").selectedIndex = i;
      //     break;
      //   }
      // }

      //Gör en sökning efter varje provider från apin och laddar hem dem som är specifika till den regionen
      providerArray = [];
      // Ta bort API-nyckel, lägg den i APIn
      const provider = new Request(
        `http://localhost:7001/GET/get-regions.php?watch_region=${filter.value}`
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
            console.log(e);
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
