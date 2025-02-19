// Масив зображень
const images = ["../img/1-min.png", "../img/2-min.png", "../img/3-min.png", "../img/4-min.png", "../img/5-min.png"];
let currentIndex = 0; // Початковий індексg

function updateImage() {
    let imageElement = document.getElementById('main-image');
    let imageNumber = document.getElementById('image-number');

    // Плавна зміна картинки
    imageElement.style.opacity = 0;
    setTimeout(() => {
        imageElement.src = images[currentIndex];
        imageElement.style.opacity = 1;

        // Оновлюємо номер фото у форматі "01 - 05"
        imageNumber.textContent = `${String(currentIndex + 1).padStart(2, '0')} - ${String(images.length).padStart(2, '0')}`;
    }, 300);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length; // Перехід до наступного зображення
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // Перехід до попереднього
    updateImage();
}