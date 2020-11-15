//input DOM selectors
let startingAmount = document.querySelector("#startingAmount");
let contribution = document.querySelector("#contribution");
let year = document.querySelector("#years");
let interest = document.querySelector("#interest");
let frequency = document.querySelector("#frequency");
let button = document.querySelector("#button");

let results = document.getElementById("results");





//output DOM selectors
// let valueOutcome = document.getElementById("totalValue");

let initialInvestment = document.querySelector("#initialInvestment");
let earningsOutcome = document.querySelector("#earnings");
let contributionsOutcome = document.querySelector("#contributions");

const table = document.getElementById("table");



//helper functions

let toNumber = function (currency) {
  return parseFloat(currency.replace("$", "").replace(",", ""));
};

let formatCurrency = function (int) {
  return "$" + Intl.NumberFormat().format(int);
};

//event listeners

document.querySelectorAll(".input__box--money").forEach((input) => {

  input.addEventListener("change", (event) => {
    input.value = "$" + Intl.NumberFormat().format(input.value);
  });

  input.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      button.click();
    };
  });
});

interest.addEventListener("change", () => {
  interest.value = `${interest.value}%`;
});








let compound = function () {

  document.querySelector(".outcomes").classList.add("open");
  document.querySelector(".additional-info").classList.add("open");


  let years = [];
  let initial = [];
  let contributions = [];
  let earnings = [];




  //remove existing rows from details section
  for (let i = document.querySelector(".table").rows.length; i > 2; i--) {
    document.querySelector(".table").deleteRow(i - 1);
  }

  let totalContributions = 0;

  let total = [];
  let totalEarnings = 0;

  let currentYear = 1;

  let p = toNumber(startingAmount.value);
  // console.log(p);

  let c = toNumber(contribution.value);
  // console.log(c);

  let n = +year.value;
  // console.log(n);

  let i = (parseInt(interest.value.replace("%", "")) / 100).toFixed(2);
  // console.log(i);

  let f = parseInt(frequency.value);

  let x = 0;

  let totalValue = p;
  let interestEarned = 0;



  while (x < n) {

    //populate table
    let row = table.insertRow(-1);
    let yearCol = row.insertCell(0);
    let startCol = row.insertCell(1);
    let intCol = row.insertCell(2);
    let contCol = row.insertCell(3);
    let endCol = row.insertCell(4);

    //style 
    yearCol.classList.add("table__item");
    startCol.classList.add("table__item");
    intCol.classList.add("table__item");
    contCol.classList.add("table__item");
    endCol.classList.add("table__item");


    //Push initial value to the chart
    initial.push(p);

    //Column 1: Year
    yearCol.innerHTML = currentYear;

    //Column 2: Starting Amount
    startCol.innerHTML = formatCurrency(totalValue.toFixed(0));

    interestEarned = parseFloat((totalValue * i).toFixed(0));

    //Column 3: Interest Earned
    intCol.innerHTML = formatCurrency(interestEarned);
    totalEarnings = parseFloat((interestEarned + totalEarnings).toFixed(0));

    totalValue = parseFloat((totalValue + (totalValue * i) + (c * f)).toFixed(0));


    //Column 4: Contribution
    contCol.innerHTML = formatCurrency(c * f);

    //Column 5: End Amount
    endCol.innerHTML = formatCurrency(totalValue.toFixed(2));

    //Push contribution total to chart
    totalContributions = c * f + totalContributions;

    earnings.push(totalEarnings);

    contributions.push(totalContributions);

    total.push(parseFloat((totalEarnings + totalContributions + p).toFixed(2)));

    years.push(currentYear);
    currentYear++;
    x++;
    console.log(totalValue);
  }



  document.getElementById("value-outcome").innerHTML = formatCurrency(totalValue.toFixed(0));
  document.getElementById("interest-outcome").innerHTML = formatCurrency(totalEarnings.toFixed(0));
  document.getElementById("contributions-outcome").innerHTML = formatCurrency(totalContributions.toFixed(0));
  document.getElementById("years-outcome").innerHTML = `after ${n} years:`;


  console.log(years, initial, contributions, earnings);

  chart.data.datasets[0].data = initial;
  chart.data.datasets[1].data = contributions;
  chart.data.datasets[2].data = earnings;
  chart.data.labels = years;
  chart.update();


};

button.addEventListener("click", compound);



//bar chart

let ctx = document.getElementById("main-chart");
Chart.defaults.global.defaultFontColor = "#2f394b";

Chart.defaults.global.defaultFontStyle = "bold";

Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    min: 0,
  },
});

let chart = new Chart(ctx, {
  // The type of chart we want to create

  type: "bar",

  // The data for our dataset
  data: {
    datasets: [{
        label: "Initial Investment",
        data: [],
        backgroundColor: "#113C6C",
        width: "100%",

      },
      {
        label: "contributions",
        data: [],
        backgroundColor: "#2377D9",
        width: "100%",
        fontSize: 14,
      },
      {
        label: "Interest Earned",
        data: [],
        backgroundColor: "#A3C7F1",
        width: "100%",
        fontSize: 16,
      },
    ],
  },

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      position: "bottom"
    },
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Year'
        },
        stacked: true,
      }],

      yAxes: [{


        stacked: true,
        ticks: {
          maxTicksLimit: 6,
          beginAtZero: true,
          fontSize: 16,
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

    },
  }
});