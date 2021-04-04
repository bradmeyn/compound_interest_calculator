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
  return numeral(currency).value();
  return parseFloat(currency.replace("$", "").replace(",", ""));
};

let formatCurrency = function (int) {
  return numeral(int).format("$0,0");
};


let formatPercentage = function (int) {
   return numeral(int).format("0.00%");
  
}

//event listeners

document.querySelectorAll(".currency-input").forEach((input) => {

  input.addEventListener("change", (event) => {
    input.value = formatCurrency(input.value);
    // input.value = "$" + Intl.NumberFormat().format(input.value);
  });

});



document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      button.click();
    };
  });
})




interest.addEventListener("change", function () {
  console.log(this.value);
  this.value = parseFloat(this.value).toFixed(2) + "%";
});



let compound = () => {

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
  document.getElementById("initial-outcome").innerHTML = startingAmount.value;
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
ctx.height = 320;

Chart.defaults.global.defaultFontColor = "#434d56";



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
        backgroundColor: "#224970",
        width: "100%",
        

      },
      {
        label: "Contribution",
        data: [],
        backgroundColor: "#4186cc",
        width: "100%",
        fontSize: 14,
      },
      {
        label: "Interest Earned",
        data: [],
        backgroundColor: "#93c8fc",
        width: "100%",
        
      },
    ],
  },

 
  options: {
    
  
    maintainAspectRatio: false,
    responsive: true,
    
    legend: {
      display: true,
      position: "bottom",
      padding: 10
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 16,
          fontFamily: "Inter"
        },
        
        gridLines: {
          display: false,
        },
        scaleLabel: {
          display: true,
          labelString: 'Year',
          fontSize: 16,
          fontFamily: "Inter"
        },
        stacked: true,
      }],

      yAxes: [{

        
        stacked: true,
        ticks: {
        
          maxTicksLimit: 10,
          beginAtZero: true,
          fontSize: 12,
          fontFamily: "Inter",
          fontWeight: "300",
          padding: 10,
        
          callback: function (value, index, values) {
            if (parseInt(value) >= 1000) {
              return (
                numeral(value).format("$0a")
                // "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              );
            } else {
              // return "$" + value;
            }
          },
        },
      }, ],
    },
    legend: {
      
      display: true,
      labels : {
          fontSize: 14,
          fontFamily: "Inter",
          fontWeight: "300",
          boxWidth: 16,

      },
      
    },
    chart: {

    },
    tooltips: {
      // displayColors: false,
      yAlign: "bottom",

      callbacks: {
        title: function (tooltip, data) {
          return `After ${tooltip[0].label} Years`;
          },

                    label: function(tooltipItems, data) { 
                        return `    ${data.datasets[tooltipItems.datasetIndex].label}:  ${formatCurrency(tooltipItems.value)}`;
                    },
                    
                      },
      
          // bodyAlign: "center",
          titleFontSize: 15,
          titleMarginBottom: 10,
          bodySpacing: 10,
          bodyFontSize: 12,
          mode: "x",
          xPadding: 10,
          yPadding: 10,
         
      // bodySpacing: "5"
    },
  }
});