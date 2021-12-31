// import "makeMovieBanner.js";
// Hämta de du följers recently watched
// skapar hela elementent ((avändare + makeMovieBanner) x antal)
// appendar

// Activity Variable
async function executeFriendsActivities(userID) {
  // Filtered by watched
  let actArray = await getFriendsActivities(userID);
  let filteredActArray = actArray.filter((activity) => activity.type === "watched");

  let title = document.createElement("h3");
  title.textContent = "Friends recently watched";
  document.querySelector("#frw").prepend(title);

  if(filteredActArray.length < 1){
    let message = document.createElement("p");
    message.className = "explore-message";
    message.textContent = "Your friends don't like movies? Or do you just not have any friends?";
    document.querySelector("#frw").append(message);

    // title.style.display = "none";
    // document.querySelector("#frw").style.display = "none";

  }

  // For every Activity that was filtered
  filteredActArray.forEach((activity) => {
    getFriendsRecentlyWatched(activity.movieID, activity.userID);
  });
}

async function getFriendsRecentlyWatched(movieID, user) {
  let frvItem = document.createElement("div");

  let profileBox = document.createElement("div");
  profileBox.className = "profile-box";
  console.log(user);
  profileBox.addEventListener("click", () => {
    window.location.href = `profile.php?userID=${user}`;
  });

  let userInfo = await getUserInfo(user);

  let profileImage = document.createElement("div");
  profileImage.className = "profile-image";
  profileImage.style.backgroundImage = `url(http://localhost:7001/${userInfo.profile_picture.filepath})`;

  let profileName = document.createElement("p");
  profileName.className = "profile-name";
  profileName.textContent = `${userInfo.username}`;

  let movieBanner = await makeMovieBanner(movieID);
  profileBox.append(profileImage, profileName);
  frvItem.append(profileBox, movieBanner);

  let frwWrapper = document.querySelector(".friends-recently-watched");
  frwWrapper.append(frvItem);
}
