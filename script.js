window.addEventListener("scroll", function () {
  // let elemento = document.querySelector('.desarrollo');
  let elemento2 = document.querySelector(".contenido");
  let imagen = document.querySelector(".imagen img");
  let scrollActual = window.scrollY;

  if (scrollActual > 2000) {
    let colorIndex = Math.floor(scrollActual / 1000); // Calcula el índice del color cada 100px
    let colors = [
      // "#FFC0CB",
      // "#c0ffc4",
      // "orange",
      // "blue",
      // "red",
      // "yellow",
      // "green",
      // "#FF6347",
      // "yellow",
    ]; // Colores adicionales
    let color = colors[colorIndex % colors.length]; // Obtiene un color de la lista de colores

    elemento2.style.backgroundColor = color;
    // elemento.style.backgroundColor = color;
    // imagen.style.filter = `hue-rotate(${colorIndex * 30}deg)`;
  } else {
    // elemento.style.backgroundColor = ''; // Restaura el color por defecto
    // elemento2.style.backgroundColor = ''; // Restaura el color por defecto
  }
});

// Suponiendo que tu JSON está en una ruta específica
const jsonPath = "./data/data.json";
const colorOccurrences = {};
const uniqueColors = new Set();

async function countUniqueColors(jsonPath) {
  const response = await fetch(jsonPath);

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar el archivo JSON. Código de estado: ${response.status}`
    );
  }

  const jsonData = await response.json();

  // Iterar sobre los datos JSON
  for (const year in jsonData) {
    for (const month in jsonData[year]) {
      for (const day in jsonData[year][month]) {
        const entries = jsonData[year][month][day];
        for (const entry of entries) {
          const colors = entry.color;
          for (const color of colors) {
            colorOccurrences[color] = (colorOccurrences[color] || 0) + 1;
            uniqueColors.add(color);
          }
        }
      }
    }
  }

  return uniqueColors.size;
}

// Obtener la cantidad de colores únicos y manejar cualquier error
countUniqueColors(jsonPath)
  .then((uniqueColorCount) => {
    const translateMapping = {
      black: "Negro",
      gray: "Gris",
      white: "Blanco",
      brown: "Marrón",
      red: "Rojo",
      purple: "Púrpura",
      green: "Verde",
      yellow: "Amarillo",
      blue: "Azul",
      orange: "Naranja",
      beige: "Beige",
      pink: "Rosa",
    };

    const Pasteldata = Object.entries(colorOccurrences).map(
      ([color, count]) => ({
        value: count,
        name: translateMapping[color] || color,
        itemStyle: {
          color: color,
        },
      })
    );

    const pastelStyle = {
      title: {
        text: "Ocurrencias de colores simples",
        subtext: "Basado en portadas de Vogue",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        bottom: 5,
        left: "center",
        data: translateMapping[Object.keys(colorOccurrences)],
      },
      series: [
        {
          name: "Número de apariciones",
          type: "pie",
          radius: "65%",
          center: ["50%", "50%"],
          selectedMode: "single",
          data: Pasteldata,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    var myChart = echarts.init(document.getElementById("new"));
    myChart.setOption(pastelStyle);
  })
  .catch((error) => {
    console.error(error.message);
  });



var chartDom = document.getElementById("main");
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
  [-5, -8],
];
var CLUSTER_COUNT = 2;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
  "#37A2DA",
  "#e06343",
  "#37a354",
  "#b55dba",
  "#b5bd48",
  "#8378EA",
  "#96BFFF",
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    label: "cluster " + i,
    color: COLOR_ALL[i],
  });
}
option = {
  dataset: [
    {
      source: data,
    },
    {
      transform: {
        type: "ecStat:clustering",
        // print: true,
        config: {
          clusterCount: CLUSTER_COUNT,
          outputType: "single",
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX,
        },
      },
    },
  ],
  tooltip: {
    position: "top",
  },
  visualMap: {
    type: "piecewise",
    top: "middle",
    min: 0,
    max: CLUSTER_COUNT,
    left: 10,
    splitNumber: CLUSTER_COUNT,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces,
  },
  grid: {
    left: 120,
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: "scatter",
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: "#555",
    },
    datasetIndex: 1,
  },
};
option && myChart.setOption(option);


// fetch("./data/data.json")
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