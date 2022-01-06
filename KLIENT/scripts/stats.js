/*

Create stats

*/

async function renderChart(userId) {
  document.getElementById('profileWrapper').innerHTML = `
    <p class="statsP">You seem to love watching: </p>
    <canvas id="ctx" width="400" height="400"></canvas>
  `;

  let userData = await getUserActivities(userId);
  // console.log(userData);
  let genres = [];
  let time = [];
  let data = {};
  let runtimes = [];
  let done = false;
  userData.forEach(async function (activity) {
    // console.log(activity);
    let movieInfo = await getMovieInfo(activity.movieID);
    await movieInfo.message.genres.forEach((genre, index) => {
      if (!genres.includes(genre.name)) {
        genres.push(genre.name);
        let timeAndGenre = {
          genre: genre.name,
          time: movieInfo.message.runtime,
        };
        time.push(timeAndGenre);
      } else {
        time.forEach((obj) => {
            // console.log(obj.genre);
            // console.log(genre)
            // console.log(obj.genre == genre);
          if (obj.genre == genre.name) {
            obj.time = obj.time + movieInfo.message.runtime;
            // console.log("test");
          }
        });
      }
    });
    // console.log(genres);
    // console.log(time);
    runtimes = time.map((obj) => {
      return obj.time;
    });
    data = {
      type: "doughnut",
      options: {
        layout: {
          padding: 30,
        },
      },
      data: {
        labels: genres,
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
  // console.log(genres);
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

// renderChart();
