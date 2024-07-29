let currentIndex = 0;
const carouselInner = document.querySelector('.carousel-inner');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
let intervalId;

// Función para actualizar el tamaño del carrusel según la imagen actual
function updateCarouselSize() {
    const currentImage = items[currentIndex].querySelector('img');
    currentImage.onload = () => {
        const carousel = document.querySelector('.carousel');
        carousel.style.height = currentImage.clientHeight + 'px';
    };
    const currentImageLoaded = items[currentIndex].querySelector('img');
    if (currentImageLoaded.complete) {
        const carousel = document.querySelector('.carousel');
        carousel.style.height = currentImageLoaded.clientHeight + 'px';
    }
}

// Función para mostrar la imagen en el índice especificado
function showImage(index) {
    items[currentIndex].classList.remove('active');
    currentIndex = index;
    items[currentIndex].classList.add('active');
    updateCarouselSize();
    resetInterval();
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

// Función para reiniciar el intervalo automático del carrusel después de una acción manual
function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(showNextImage, 4000);
}

// Event listeners para los controles del carrusel
document.querySelector('.next').addEventListener('click', showNextImage);
document.querySelector('.prev').addEventListener('click', showPrevImage);

// Inicializa el intervalo automático del carrusel
intervalId = setInterval(showNextImage, 4000); // Muestra la siguiente imagen cada 4 segundos

// Configuración inicial al cargar la página
window.addEventListener('load', () => {
    items[currentIndex].classList.add('active');
    updateCarouselSize();
});