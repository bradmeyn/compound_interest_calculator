let value = document.querySelector("#value");
let contribution = document.querySelector("#contribution");

let years = document.querySelector("#years");
let interest = document.querySelector("#interest");

let frequency = document.querySelector("#frequency");

let valueOutcome = document.querySelector("#valueOutcome");
let earningsOutcome = document.querySelector("#earnings");
let contributionsOutcome = document.querySelector("#contributions");

const table =  document.getElementById("table");





let toNumber = function (currency) {
  return parseFloat(currency.replace("$", "").replace(",", ""));
};

let formatCurrency = function (int) {
  return "$" + Intl.NumberFormat().format(int);
};

document.querySelectorAll(".input__box--money").forEach((input) => {
  input.addEventListener("change", (event) => {
    console.log(input.value);
    input.value = "$" + Intl.NumberFormat().format(input.value);
  });
});

interest.addEventListener("change", () => {
  interest.value = `${interest.value}%`;
});

var ctx = document.getElementById("myChart");
Chart.defaults.global.defaultFontColor = "#2f394b";
Chart.defaults.global.defaultFontFamily = "Helvetica";
Chart.defaults.global.defaultFontStyle = "bold";
Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    min: 0,
  },
});
var chart = new Chart(ctx, {
  // The type of chart we want to create

  type: "bar",

  // The data for our dataset
  data: {
    datasets: [{
        label: "Initial Investment",
        data: [],
        backgroundColor: "#ce694f",
        width: "100%",
        fontSize: 16,
      },
      {
        label: "contributions",
        data: [],
        backgroundColor: "#ee6d4d",
        width: "100%",
        fontSize: 16,
      },
      {
        label: "Interest Earned",
        data: [],
        backgroundColor: "#f5967f",
        width: "100%",
        fontSize: 16,
      },
    ],
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
        stacked: true,
      }, ],

      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero: true,
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              return "$" + value;
            }
          },
        },
      }, ],
    },
    legend: {
      display: false,
    },
    chart: {
      fontColor: "#2f394b",
      fontFamily: "Helvetica Neue",
      fontSize: 12,
    },
  },
});

let compound = function () {
  let periods = [];
  let values = [];
  let initial = [];

  let contributions = [];
  let totalContributions = 0;

  let earnings = [];
  let total = [];
  let totalEarnings = 0;

  let year = 1;

  let p = toNumber(value.value);
  // console.log(p);

  let c = toNumber(contribution.value);
  // console.log(c);

  let n = +years.value;
  // console.log(n);

  let i = parseInt(interest.value.replace("%", "")) / 100;
  // console.log(i);

  let f = parseInt(frequency.value);

  let x = 0;

  while (x < n) {

   
    initial.push(p);

    totalContributions = c * f + totalContributions;
    contributions.push(totalContributions);
    // console.log(totalContributions);

    totalEarnings = totalEarnings + (p + totalContributions) * i;
    earnings.push(totalEarnings);

    let row = table.insertRow(-1);
    let yearCol = row.insertCell(0);
    let startCol = row.insertCell(1);
    let intCol = row.insertCell(2);
    let contCol = row.insertCell(3);
    let endCol = row.insertCell(4);
     
    yearCol.innerHTML = year;
    startCol.innerHTML = formatCurrency(p);
    intCol.innerHTML = totalEarnings;
    contCol.innerHTML = c;
    endCol.innerHTML = p;

    yearCol.classList.add("table__item");
    startCol.classList.add("table__item");
    intCol.classList.add("table__item");
    contCol.classList.add("table__item");
    endCol.classList.add("table__item");



    total.push(totalEarnings + totalContributions + p);
    console.log(total);
    periods.push(`Year ${year}`);
    year++;
    x++;
  }
  console.log(totalEarnings + totalContributions + p);

  document.querySelector("#yearsOutcome").innerHTML = ` after ${n} years`;

  valueOutcome.innerHTML = formatCurrency(totalEarnings + totalContributions + p);
  earningsOutcome.innerHTML = formatCurrency(totalEarnings);
  contributionsOutcome.innerHTML = formatCurrency(totalContributions);

  chart.data.datasets[0].data = initial;
  chart.data.datasets[1].data = contributions;
  chart.data.datasets[2].data = earnings;
  chart.data.labels = periods;
  chart.update();
};

let button = document.querySelector(".btn");

button.addEventListener("click", compound);