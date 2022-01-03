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
      opt.setAttribute("id", `${region.iso_3166_1}`);
      opt.innerHTML = `${region.english_name}`;
      opt.value = `${region.iso_3166_1}`;
      selectRegion.append(opt);
    });

    //Skapar en defult secelt som inte går att välja och inte har ett värde
    // let opt = document.createElement("option");
    // opt.setAttribute("value", "");
    // opt.innerHTML = "Select a region";
    // opt.setAttribute("disabled", "true");
    // opt.setAttribute("selected", "true");

    // selectRegion.prepend(opt);

    //Skapar en slect för region
    document.getElementById("createUserP2").append(selectRegion);

    // //Skapar knapparna
    // let buttonWrapper = document.createElement("div");
    // buttonWrapper.id = "buttonWrapper";
    // let button = document.createElement("button");
    // button.innerHTML = "Skip";
    // button.setAttribute("id", "skip2");
    // button.setAttribute("type", "button");

    // let button1 = document.createElement("button");
    // button1.innerHTML = "Next";
    // button1.setAttribute("id", "next2");
    // button1.setAttribute("type", "button");

    // buttonWrapper.append(button, button1);
    // document.getElementById("createUserP2").append(buttonWrapper);

    // document.getElementById("next2").addEventListener("click", () => {
    //   let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    //   console.log(checkboxes.length);
    //   if (filter.value == "") {
    //     console.log("please choose a region");
    //   } else if (checkboxes.length == 0) {
    //     console.log("please choose at least one provider");
    //   } else {
    //     console.log("Event Click 2");
    //     document.getElementById("createUserP2").style.display = "none";
    //     document.getElementById("createUserP3").style.display = "";
    //   }
    // });

    // document.getElementById("skip2").addEventListener("click", () => {
    //   console.log("Event Click 2");
    //   document.getElementById("createUserP2").style.display = "none";
    //   document.getElementById("createUserP3").style.display = "";
    // });
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

    async function loadProviders(){
      // let startNumber = document.getElementById("region").selectedIndex == 1 ? 1 : 0;
      if (document.getElementById("fieldSetProviders")) {
        document.getElementById("fieldSetProviders").innerHTML = "";
      }
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
        if (!document.getElementById(`${provider.provider_name}`)) {
          let selectProvider = document.createElement("input");
          let providerDiv = document.createElement("img");
          let selectProviderLabel = document.createElement("label");

          selectProviderLabel.setAttribute("id", `label${provider.provider_name}`);
          selectProviderLabel.setAttribute("class", "providersLabel");

          providerDiv.setAttribute("src", `https://image.tmdb.org/t/p/w200${provider["logo_path"]}`);

          let id = provider.provider_name

          selectProvider.setAttribute("type", "checkbox");
          selectProvider.setAttribute("value", `${provider.provider_name}`);
          selectProvider.style.display = "none";
          selectProvider.setAttribute("id", id.split(" ").join(""));

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

    document.getElementById("settingOrPlus").addEventListener("click", () => {
      let form = document.getElementById("signUpForm");
    
      form.style.display = "block";
      form.style.top = "0";
      form.style.backgroundColor = "black";
    
      let data = sessionStorage.getItem("session");
      let id = JSON.parse(data).session.userID;
      
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

              loadProviders().then(() => {
                data[0].active_streaming_services.forEach(e => {
                  let id = e.split(" ").join("");
                  document.querySelector(`#${id}`).setAttribute("checked", true)
                  document.querySelector(`#${id}`).parentElement.classList.add("selectedProvider")
                });
              });
              
              filter.addEventListener("change", (e) => {
                if(filter.value == data[0].region){
                  loadProviders().then(() => {
                    data[0].active_streaming_services.forEach(e => {
                      let id = e.split(" ").join("");
                      document.querySelector(`#${id}`).setAttribute("checked", true)
                      document.querySelector(`#${id}`).parentElement.classList.add("selectedProvider")
                    });
                  });
                }
              });
          });
    });
  });

  