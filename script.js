window.addEventListener('scroll', function() {
  // let elemento = document.querySelector('.desarrollo');
  let elemento2 = document.querySelector('.contenido');
  let imagen = document.querySelector('.imagen img');
  let scrollActual = window.scrollY;

  if (scrollActual > 20) {
    let colorIndex = Math.floor(scrollActual / 1000); // Calcula el índice del color cada 100px
    let colors = ['#FFC0CB', '#c0ffc4', 'blue', 'yellow', 'green', 'red', 'orange', '#ABCDEF', 'purple', '#FA8072', '#90EE90', '#FFD700', '#7B68EE', '#00CED1', '#FF6347']; // Colores adicionales
    let color = colors[colorIndex % colors.length]; // Obtiene un color de la lista de colores

    // elemento2.style.backgroundColor = color;
    // elemento.style.backgroundColor = color;
    imagen.style.filter = `hue-rotate(${colorIndex * 30}deg)`;
  } else {
    // elemento.style.backgroundColor = ''; // Restaura el color por defecto
    // elemento2.style.backgroundColor = ''; // Restaura el color por defecto
  }
});

  fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const tableContainer = document.getElementById('table-container');
        
        // Lógica para crear la tabla utilizando los datos del JSON
        const colorTable = createColorTable(data);
        tableContainer.appendChild(colorTable);
    })
    .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
    });

function createColorTable(data) {
    const table = document.createElement('table');
    table.border = '2';

    // Recorrer el JSON para extraer los colores
    for (const year in data) {
        for (const month in data[year]) {
            for (const day in data[year][month]) {
                const dayData = data[year][month][day];
                const dayColors = dayData.map(item => item.hex).flat(); // Obtiene todos los colores de los elementos del día

                // Crear una fila por cada conjunto de colores
                const row = table.insertRow();
                const cellDay = row.insertCell(0);
                cellDay.innerHTML = `${year}-${month}-${day}`;

                const cellColors = row.insertCell(1);
                for (const color of dayColors) {
                    const colorBox = document.createElement('div');
                    colorBox.style.backgroundColor = color;
                    colorBox.style.width = '30px';
                    colorBox.style.height = '30px';
                    colorBox.style.marginRight = '5px';
                    cellColors.appendChild(colorBox);
                }
            }
        }
    }

    return table;
}
