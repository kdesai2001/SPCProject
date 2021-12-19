let response = 0;
let errors = 0;

const USBLS_Sectors	= {
  '00':	'Total Nonfarm',
  '05':	'Total Private',
  '06':	'Goods-Producing',
  '07':	'Service-Providing',
  '08':	'Private Service-Providing',
  '10':	'Mining and Logging',
  '20':	'Construction',
  '30':	'Manufacturing',
  '31':	'Durable Goods',
  '32':	'Nondurable Goods',
  '40':	'Trade, Transportation, and Utilities',
  '41':	'Wholesale Trade',
  '42':	'Retail Trade',
  '43':	'Transportation and Warehousing',
  '44':	'Utilities',
  '50':	'Information',
  '55':	'Financial Activities',
  '60':	'Professional and Business Services',
  '65':	'Education and Health Services',
  '70':	'Leisure and Hospitality',
  '80':	'Other services',
  '90':	'Government'
};
let USBLS_Codes = Object.keys(USBLS_Sectors)

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  black: 'rgb(0, 0, 0)',
  pink:'rgb(255, 20, 200)',
  cyan: 'rgb(0,255,255)',
  navy: 'rgb(0,0,120)',
  brown: 'rgb(200,100,30)',
  gold: 'rgb(255,215,0)',
  lime: 'rgb(0,255,0)',
  darkcyan: 'rgb(0,139,139)',
  thistle: 'rgb(216,191,216)',
  wheat: 'rgb(245,222,179)',
  slategray: 'rgb(112,128,144)',
  maroon: 'rgb(128,0,0)',
  olive: 'rgb(128,128,0)',
  springgreen: 'rgb(0,255,127)',
  lavender: 'rgb(230,230,250)',
};
let Sector_Border = Object.keys(CHART_COLORS)

const CHART_COLORS_50_Percent = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
  black: 'rgb(0, 0, 0)',
  pink:'rgb(255, 20, 200)',
  cyan: 'rgb(0,255,255)',
  navy: 'rgb(0,0,120)',
  brown: 'rgb(200,100,30)',
  gold: 'rgb(255,215,0)',
  lime: 'rgb(0,255,0)',
  darkcyan: 'rgb(0,139,139)',
  thistle: 'rgb(216,191,216)',
  wheat: 'rgb(245,222,179)',
  slategray: 'rgb(112,128,144)',
  maroon: 'rgb(128,0,0)',
  olive: 'rgb(128,128,0)',
  springgreen: 'rgb(0,255,127)',
  lavender: 'rgb(230,230,250)',
};
let Sector_Background = Object.keys(CHART_COLORS_50_Percent)

const data = {
  labels: [],
  datasets: []
};

const config = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Employees in Thousands'
      }
    }
  }
};

function responseReceivedHandler() {
  if (this.status == 200)  {
  console.log(this.response);

  let gridLine = {
    label: [],
    data: [],
    borderColor: [],
    backgroundColor: [],
    hidden: true
  };

  let dataArray = this.response.Results.series[0].data;
  let seriesID = this.response.Results.series[0].seriesID;

  for (let i = dataArray.length - 1; i >= 0; i--) {
    gridLine.data.push(dataArray[i].value)
    if (response == 0) {
    data.labels.push(dataArray[i].period.substring(1) + "/" + dataArray[i].year)
    }
  }

  gridLine.label = USBLS_Sectors[seriesID.substring(3,5)]
  gridLine.borderColor = CHART_COLORS[Sector_Border[response]]
  gridLine.backgroundColor = CHART_COLORS_50_Percent[Sector_Background[response]]

  data.datasets.push(gridLine)
  response ++
  }
  else {
    console.log("error");
  }

  if (response == USBLS_Codes.length) {
  const myChart = new Chart(
    document.getElementById('myChart'),
      config);
  }
};

for (let x = 0; x < USBLS_Codes.length; x++) {
  let URL_Start = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU"
  let URL_Middle = "00000001?registrationkey="
  let URL_Key = "f23ed5f6586c4af68087aa98e1ee4eae"
  //Input Youe Own API Key Above
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", responseReceivedHandler);
  xhr.responseType = "json";
  xhr.open("GET", URL_Start + USBLS_Codes[x] + URL_Middle + URL_Key);
  xhr.send();
};
