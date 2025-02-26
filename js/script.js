// Масив зображень
const images = ["../img/1-min.jpg", "../img/2-min.jpg", "../img/3-min.jpg", "../img/4-min.jpg", "../img/5-min.jpg"];
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







document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.catalog-item').forEach(item => {
        item.addEventListener('click', function() {
            // Видаляємо клас 'selected' у всіх елементів
            document.querySelectorAll('.catalog-item').forEach(el => el.classList.remove("selected"));

            // Додаємо клас 'selected' вибраному елементу
            this.classList.add("selected");

            // Зберігаємо дані вибраного годинника
            selectedWatch = {
                name: this.getAttribute("data-name"),
                price: this.getAttribute("data-price"),
                img: this.getAttribute("data-img")
            };
        });
    });
});

// Функція відкриття форми замовлення
function openOrderForm() {
    if (!selectedWatch) {
        alert("Please select a watch first!");
        return;
    }

    // Оновлюємо інформацію у модальному вікні
    document.getElementById("modalWatchInfo").innerText = `${selectedWatch.name} - ${selectedWatch.price}`;
    let imgElement = document.getElementById("modalWatchImg");
    imgElement.src = selectedWatch.img;
    imgElement.hidden = false;

    // Відображаємо модальне вікно
    document.getElementById("orderModal").style.display = "block";
}

// Функція закриття форми
function closeOrderForm() {
    document.getElementById("orderModal").style.display = "none";
}

// Функція перевірки та відправки замовлення
function submitOrder() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let card = document.getElementById("card").value.trim();
    let valid = true;

    // Валідація імені
    if (name === "") {
        document.getElementById("nameError").style.display = "block";
        valid = false;
    } else {
        document.getElementById("nameError").style.display = "none";
    }

    // Валідація email
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        document.getElementById("emailError").style.display = "block";
        valid = false;
    } else {
        document.getElementById("emailError").style.display = "none";
    }

    // Валідація картки (16 цифр)
    let cardPattern = /^\d{16}$/;
    if (!card.match(cardPattern)) {
        document.getElementById("cardError").style.display = "block";
        valid = false;
    } else {
        document.getElementById("cardError").style.display = "none";
    }

    // Якщо всі дані коректні, виводимо повідомлення про успіх
    if (valid) {
        alert(`Order confirmed for: ${selectedWatch.name}!`);
        closeOrderForm();
    }
}