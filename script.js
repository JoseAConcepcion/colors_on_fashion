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


// window.addEventListener('scroll', function() {
//   let elemento = document.querySelector('.desarrollo');
//   let elemento2 = document.querySelector('.contenido');
//   let scrollActual = window.scrollY;

//   if (scrollActual > 20) { // Cambia el color después de cierto desplazamiento
//     elemento2.classList.add('cambio-color');
//     elemento.classList.add('cambio-color');
//   } else {
//     elemento.classList.remove('cambio-color');
//     elemento2.classList.remove('cambio-color');
//   }
// });