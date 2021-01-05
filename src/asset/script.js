window.addEventListener('load', () => {
  console.log("Almaahad Engineering, Vibro Ripper page designed by SavandBros.");
  console.log("https://www.savandbros.com");

  window.BSN.initCallback();

  let ctx = document.getElementById("chart").getContext("2d");
  Chart.defaults.global.defaultFontColor = "#eee";
  new Chart(ctx, {
    type: "line",
    data: {
      labels: [150, 124, 98, 72, 46, 20],
      datasets: [{
        label: "Vibro Ripper",
        data: [50, 80, 140, 220, 310, 450],
        borderColor: "dodgerblue",
      }, {
        label: "Hydraulic Breaker",
        data: [100, 100, 100, 100, 100, 100],
        borderColor: "tomato",
      }],
    },
    options: {
      legend: {
        position: "bottom",
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            callback: function (value) {
              return value + "%";
            },
          },
        }],
      },
    },
  });

  document.getElementById('date').innerText = String(new Date().getFullYear());
});
