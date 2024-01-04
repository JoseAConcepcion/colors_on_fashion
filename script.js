window.addEventListener('scroll', function() {
  let elemento = document.querySelector('.desarrollo');
  let scrollActual = window.scrollY;

  if (scrollActual > 200) { // Cambia el color después de cierto desplazamiento
    elemento.classList.add('cambio-color');
  } else {
    elemento.classList.remove('cambio-color');
  }
});