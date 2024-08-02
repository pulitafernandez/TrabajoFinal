// Declaracion de variables
let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let intervalId;

// // ajusta la altura del carrusel con la imagen cargada
function updateCarouselSize() {
    const currentImageLoaded = items[currentIndex].querySelector('img');
    if (currentImageLoaded.complete) {
        const carousel = document.querySelector('.carousel');
        carousel.style.height = currentImageLoaded.clientHeight + 'px';
    }
}

// Función para cambiar la imagen visible
function showImage(index) {
    items[currentIndex].classList.remove('active'); // Selecciona y elimina visiblemente la imagen
    currentIndex = index; // actualiza la variable
    items[currentIndex].classList.add('active');  // selecciona y visibiliza la nueva imagen
    updateCarouselSize();
    resetInterval(); // llama a la funcion para reiniciar el temporizador de transicion de imagen
}

// Función para mostrar la siguiente imagen
function showNextImage() {
    const nextIndex = (currentIndex + 1) % totalItems;
    showImage(nextIndex);
}

// Función para mostrar la imagen anterior
function showPrevImage() {
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    showImage(prevIndex);
}

// Funcion para reiniciar el intervalo del carrusel despues de una accion manual
function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 4000);
}

// Event listeners para los controles del carrusel
document.querySelector('.next').addEventListener('click', showNextImage);
document.querySelector('.prev').addEventListener('click', showPrevImage);

// Inicializa el intervalo automatico del carrusel
intervalId = setInterval(showNextImage, 4000); // Muestra la siguiente imagen cada 4 segundos

// Configuración inicial al cargar la página
window.addEventListener('load', () => {
    items[currentIndex].classList.add('active');
    updateCarouselSize();
});