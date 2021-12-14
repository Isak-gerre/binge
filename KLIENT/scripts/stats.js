/*

Create stats

*/

const data = {
  type: "doughnut",
  options: {
    layout: {
      padding: 30,
    },
  },
  data: {
    labels: ["Action", "Romance", "Horror", "Comedy"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 400],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(123, 22, 143)"],
        hoverOffset: 4,
      },
    ],
  },
};

let ctx = document.getElementById("ctx").getContext("2d");
const myChart = new Chart(ctx, data);

async function getUser() {
  let user = await getUserInfo(1);
  console.log(user);
}



