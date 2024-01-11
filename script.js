window.addEventListener("scroll", function () {
  // let elemento = document.querySelector('.desarrollo');
  let elemento2 = document.querySelector(".contenido");
  let imagen = document.querySelector(".imagen img");
  let scrollActual = window.scrollY;

  if (scrollActual > 20) {
    let colorIndex = Math.floor(scrollActual / 1000); // Calcula el índice del color cada 100px
    let colors = [
      "#FFC0CB",
      "#c0ffc4",
      "blue",
      "yellow",
      "green",
      "red",
      "orange",
      "#ABCDEF",
      "purple",
      "#FA8072",
      "#90EE90",
      "#FFD700",
      "#7B68EE",
      "#00CED1",
      "#FF6347",
    ]; // Colores adicionales
    let color = colors[colorIndex % colors.length]; // Obtiene un color de la lista de colores

    // elemento2.style.backgroundColor = color;
    // elemento.style.backgroundColor = color;
    imagen.style.filter = `hue-rotate(${colorIndex * 30}deg)`;
  } else {
    // elemento.style.backgroundColor = ''; // Restaura el color por defecto
    // elemento2.style.backgroundColor = ''; // Restaura el color por defecto
  }
});

// fetch("./data.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const tableContainer = document.getElementById("table-container");

//     // Lógica para crear la tabla utilizando los datos del JSON
//     const colorTable = createColorTable(data);
//     tableContainer.appendChild(colorTable);
//   })
//   .catch((error) => {
//     console.error("Error al cargar el archivo JSON:", error);
//   });

// function createColorTable(data) {
//   const table = document.createElement("table");
//   table.border = "2";
//   table.style.width = "100%"; // Ajustar el ancho de la tabla

//   // Recorrer el JSON para extraer los colores
//   for (const year in data) {
//     for (const month in data[year]) {
//       for (const day in data[year][month]) {
//         const dayData = data[year][month][day];
//         const dayColors = dayData.map((item) => item.hex).flat(); // Obtener todos los colores del día

//         // Crear una fila por cada conjunto de colores
//         const row = table.insertRow();
//         const cellDay = row.insertCell(0);
//         cellDay.innerHTML = `${year}-${month}-${day}`;
//         cellDay.style.width = "150px"; // Ajustar el ancho de la celda para la fecha

//         const cellColors = row.insertCell(1);
//         cellColors.style.width = "calc(100% - 150px)"; // Ajustar el ancho de la celda para los colores
//         cellColors.style.whiteSpace = "nowrap"; // Evitar que los colores se rompan en varias líneas

//         for (const color of dayColors) {
//           const colorBox = document.createElement("div");
//           colorBox.style.backgroundColor = color;
//           colorBox.style.width = "30px";
//           colorBox.style.height = "30px";
//           colorBox.style.marginRight = "5px";
//           colorBox.style.display = "inline-block"; // Mostrar los colores en línea
//           cellColors.appendChild(colorBox);
//         }
//       }
//     }
//   }

//   return table;
// }

//Tablas


option2 = {
  title: {
    text: 'Weather Statistics',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center',
    data: ['CityA', 'CityB', 'CityD', 'CityC', 'CityE']
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
      data: [
        {
          value: 1548,
          name: 'CityE',
          label: {
            formatter: [
              '{title|{b}}{abg|}',
              '  {weatherHead|Weather}{valueHead|Days}{rateHead|Percent}',
              '{hr|}',
              '  {Sunny|}{value|202}{rate|55.3%}',
              '  {Cloudy|}{value|142}{rate|38.9%}',
              '  {Showers|}{value|21}{rate|5.8%}'
            ].join('\n'),
            backgroundColor: '#eee',
            borderColor: '#777',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              title: {
                color: '#eee',
                align: 'center'
              },
              abg: {
                backgroundColor: '#333',
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
              },
              Sunny: {
                height: 30,
                align: 'left',
              },
              Cloudy: {
                height: 30,
                align: 'left',
              },
              Showers: {
                height: 30,
                align: 'left',
              },
              weatherHead: {
                color: '#333',
                height: 24,
                align: 'left'
              },
              hr: {
                borderColor: '#777',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              value: {
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'left'
              },
              valueHead: {
                color: '#333',
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'center'
              },
              rate: {
                width: 40,
                align: 'right',
                padding: [0, 10, 0, 0]
              },
              rateHead: {
                color: '#333',
                width: 40,
                align: 'center',
                padding: [0, 10, 0, 0]
              }
            }
          }
        },
        { value: 735, name: 'CityC' },
        { value: 510, name: 'CityD' },
        { value: 434, name: 'CityB' },
        { value: 335, name: 'CityA' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};

var myChart2 = echarts.init(document.getElementById("new"));

myChart2.setOption(option2);



var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;

// See https://github.com/ecomfe/echarts-stat
echarts.registerTransform(ecStat.transform.clustering);
const data = [
  [256, 256],
  [-256, 256],
  [-256, -256],
  [256, -256],
  [256, 256],
  [0, 0],
  [256, 8],
  [-5, -8]
];
var CLUSTER_COUNT = 2;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
  '#37A2DA',
  '#e06343',
  '#37a354',
  '#b55dba',
  '#b5bd48',
  '#8378EA',
  '#96BFFF'
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    label: 'cluster ' + i,
    color: COLOR_ALL[i]
  });
}
option = {
  dataset: [
    {
      source: data
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: CLUSTER_COUNT,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: CLUSTER_COUNT,
    left: 10,
    splitNumber: CLUSTER_COUNT,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
};

option && myChart.setOption(option);