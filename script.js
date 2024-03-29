window.addEventListener("scroll", function () {
  let elemento2 = document.querySelector(".parrafo");
  let imagen = document.querySelector(".imagen");
  let scrollActual = window.scrollY;
  let alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  let porcentajeScroll = (scrollActual / alturaTotal) * 100;

  if (porcentajeScroll > 15 && porcentajeScroll <= 20) {
    imagen.style.backgroundColor = "#757170";
  } else if (porcentajeScroll > 20 && porcentajeScroll <= 22.5) {
    imagen.style.backgroundColor = "#545d4f";
  } else if (porcentajeScroll > 22.5 && porcentajeScroll <= 25) {
    imagen.style.backgroundColor = "#000000";
  } else if (porcentajeScroll > 25 && porcentajeScroll <= 27.5) {
    imagen.style.backgroundColor = "#d58b6b";
  } else if (porcentajeScroll > 27.5 && porcentajeScroll <= 30) {
    imagen.style.backgroundColor = "#0d47a1";
  } else if (porcentajeScroll > 30 && porcentajeScroll <= 35) {
    imagen.style.backgroundColor = "#b5af5a";
  } else if (porcentajeScroll > 35 && porcentajeScroll <= 37.5) {
    imagen.style.backgroundColor = "#3d5167";
  } else if (porcentajeScroll > 37.5 && porcentajeScroll <= 40) {
    imagen.style.backgroundColor = "#cc979c";
  } else if (porcentajeScroll > 40 && porcentajeScroll <= 42.5) {
    imagen.style.backgroundColor = "#3d5167";
  } else if (porcentajeScroll > 42.5 && porcentajeScroll <= 45) {
    imagen.style.backgroundColor = "#6f586a";
  } else if (porcentajeScroll > 45 && porcentajeScroll <= 50) {
    imagen.style.backgroundColor = "#b5b49c";
  } else if (porcentajeScroll > 50 && porcentajeScroll <= 55) {
    imagen.style.backgroundColor = "#391c20";
  } else if (porcentajeScroll > 55 && porcentajeScroll <= 60) {
    imagen.style.backgroundColor = "#59485b";
  } else if (porcentajeScroll > 60 && porcentajeScroll <= 65) {
    imagen.style.backgroundColor = "#c96667";
  } else if (porcentajeScroll > 65 && porcentajeScroll <= 70) {
    imagen.style.backgroundColor = "#5a7b87";
  } else if (porcentajeScroll > 70 && porcentajeScroll <= 75) {
    imagen.style.backgroundColor = "#ba3c21";
  }
});

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

// Obtener la cantidad de colores únicos y manejar cualquier error
countUniqueColors(jsonPath)
  .then((uniqueColorCount) => {
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

    var myChart = echarts.init(document.getElementById("pastel"));
    myChart.setOption(pastelStyle);
  })
  .catch((error) => {
    console.error(error.message);
  });

async function getColorData(jsonPath) {
  const response = await fetch(jsonPath);

  if (!response.ok) {
    throw new Error(
      `No se pudo cargar el archivo JSON. Código de estado: ${response.status}`
    );
  }

  const jsonData = await response.json();
  const colorDataList = [];

  // Iterar sobre los datos JSON
  for (const year in jsonData) {
    for (const month in jsonData[year]) {
      for (const day in jsonData[year][month]) {
        const entries = jsonData[year][month][day];
        for (const entry of entries) {
          const hexColors = entry.hex;
          for (const hexColor of hexColors) {
            const colorData = [
              hexToNormalizedHue(hexColor),
              calculateLuminance(hexToRgb(hexColor)),
            ];
            colorDataList.push(colorData);
          }
        }
      }
    }
  }

  return colorDataList;
}

getColorData(jsonPath)
  .then((colorDataList) => {
    console.log("Lista de objetos de datos de colores:", colorDataList);
    echarts.registerTransform(ecStat.transform.clustering);

    var CLUSTER_COUNT = 6;
    var DIENSIION_CLUSTER_INDEX = 2;
    var COLOR_ALL = [
      "#b55dba",
      "#37A2DA",
      "#e06343",
      "#96BFFF",
      "#37a354",
      "#b5bd48",
    ];
    var pieces = [];

    for (var i = 0; i < CLUSTER_COUNT; i++) {
      pieces.push({
        value: i,
        label: "Conjunto " + (i + 1),
        color: COLOR_ALL[i],
      });
    }
    option = {
      dataset: [
        {
          source: colorDataList,
        },
        {
          transform: {
            type: "ecStat:clustering",
            print: true,
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
        max: 3,
        left: 10,
        splitNumber: CLUSTER_COUNT,
        dimension: DIENSIION_CLUSTER_INDEX,
        pieces: pieces,
      },
      grid: {
        left: "center",
        width: "50%", // Puedes ajustar el ancho de la tabla según tus necesidades
        height: "80%",
      },
      xAxis: {
        name: "Calidez",
      },
      yAxis: {
        name: "Luminosidad",
      },
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
    var chartDom = document.getElementById("cluster");
    var myChart = echarts.init(chartDom);
    // var option;
    option && myChart.setOption(option);
  })
  .catch((error) => {
    console.error(error.message);
  });

function hexToRgb(hex) {
  // Eliminar el carácter "#" si está presente
  hex = hex.replace(/^#/, "");

  // Convertir el código hexadecimal a valores RGB normalizados
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  return { r, g, b };
}

function calculateLuminance(rgb) {
  // Calcular el nivel de luminosidad usando la fórmula WCAG
  const luminance = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b;
  return luminance;
}

function hexToNormalizedHue(hex) {
  // Eliminar el carácter "#" si está presente
  hex = hex.replace(/^#/, "");

  // Convertir el código hexadecimal a valores RGB normalizados
  const bigint = parseInt(hex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;

  // Convertir RGB a HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // Desaturado
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return h;
}

var dom = document.getElementById("timeLapse");
var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
});
var app = {};

$.when($.getJSON("./data/years_data.json")).done(function (res) {
  const colorOccurrences = res;
  const years = [];
  for (let i = 0; i < colorOccurrences.length; ++i) {
    if (
      years.length === 0 ||
      years[years.length - 1] !== colorOccurrences[i][0]
    ) {
      years.push(colorOccurrences[i][0]);
    }
  }

  let startIndex = 1;
  let startYear = years[startIndex];

  const option = {
    grid: {
      top: 10,
      bottom: 30,
      left: 150,
      right: 80,
    },
    xAxis: {
      max: "dataMax",
      axisLabel: {
        formatter: function (n) {
          return Math.round(n);
        },
      },
    },
    dataset: {
      source: colorOccurrences.slice(1).filter(function (d) {
        return d[0] === startYear;
      }),
    },
    yAxis: {
      type: "category",
      inverse: true,
      max: 12,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value) {
          return translateMapping[value];
        },
      },
      animationDuration: 300,
      animationDurationUpdate: 300,
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: "column",
        type: "bar",
        itemStyle: {
          color: function (param) {
            return param.value[1];
          },
        },
        encode: {
          x: 2, // Ajusta según tu estructura de datos
          y: 1, // Ajusta según tu estructura de datos
        },
        label: {
          show: true,
          precision: 1,
          position: "right",
          valueAnimation: true,
          fontFamily: "monospace",
        },
      },
    ],
    // Disable init animation.
    animationDuration: 0,
    animationEasing: "linear",
    graphic: {
      elements: [
        {
          type: "text",
          right: 160,
          bottom: 60,
          style: {
            text: "2000", // Ajusta según tu estructura de datos
            font: "bolder 80px monospace",
            fill: "rgba(100, 100, 100, 0.25)",
          },
          z: 100,
        },
      ],
    },
  };
  myChart.setOption(option);

  document.getElementById("resetButton").addEventListener("click", function () {
    startYear = years[startIndex]; // Restablece el año inicial
    updateYear(startYear); // Llama a la función de actualización con el año inicial

    for (let i = startIndex; i < years.length - 1; ++i) {
      (function (i) {
        setTimeout(function () {
          updateYear(years[i + 1]);
        }, (i - startIndex) * 800);
      })(i);
    }
    function updateYear(year) {
      let source = colorOccurrences.slice(1).filter(function (d) {
        return d[0] === year;
      });
      option.series[0].data = source;
      option.graphic.elements[0].style.text = year;
      myChart.setOption(option);

      if (year === years[years.length - 1]) {
        setTimeout(function () {}, 2000);
      }
    }
  });

  window.addEventListener("resize", myChart.resize);
});
