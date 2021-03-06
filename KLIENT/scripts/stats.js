"use strict";
async function renderChart(userId, name = null) {

  let userData = await getUserActivities(userId);
  let user;
  if (name == null) {
    user = "You";
  } else {
    user = name;
  }
  document.getElementById("profileWrapper").innerHTML = `
    <p class="statsP">${user} seem to love watching: </p>
    <canvas id="ctx" width="400" height="400"></canvas>
  `;
  let genres = await getGenres();
  let time = [];
  let genresAndRuntime = {};
  let data = {};
  let runtimes = [];
  let genreNames = [];
  let done = false;
  userData.forEach(async function (activity) {
    let movieInfo = await getMovieInfo(activity.movieID);
    if (movieInfo.message.genres && movieInfo.message.runtime) {
      await movieInfo.message.genres.forEach((genre, index) => {
        if (genre.name in genresAndRuntime) {
          genresAndRuntime[`${genre.name}`] += movieInfo.message.runtime;
        } else {
          genresAndRuntime[`${genre.name}`] = movieInfo.message.runtime;
        }
      });
    }
    if (movieInfo.message.genre_ids && movieInfo.message.runtime) {
      await movieInfo.message.genre_ids.forEach((genre, index) => {
        genre = genres.genres.find((obj) => obj.id == genre);
        if (genre.name in genresAndRuntime) {
          genresAndRuntime[`${genre.name}`] += movieInfo.message.runtime;
        } else {
          genresAndRuntime[`${genre.name}`] = movieInfo.message.runtime;
        }
      });
    }
    genreNames = Object.keys(genresAndRuntime);
    runtimes = Object.values(genresAndRuntime);
    data = {
      type: "doughnut",
      options: {
        layout: {
          padding: 30,
        },
      },
      data: {
        labels: genreNames,
        datasets: [
          {
            label: "My First Dataset",
            data: runtimes,
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(123, 22, 143)"],
            hoverOffset: 4,
          },
        ],
      },
    };
  });

  let interval = setInterval(() => {
    if (data != {}) {
      let ctx = document.getElementById("ctx").getContext("2d");
      const myChart = new Chart(ctx, data);
      done = true;
    }
    if (done) {
      clearInterval(interval);
    }
  }, 1000);
}