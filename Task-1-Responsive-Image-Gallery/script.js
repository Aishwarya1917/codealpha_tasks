// Select all gallery images
const images = document.querySelectorAll(".gallery img");

// Lightbox elements
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Current image index
let currentIndex = 0;

// Open Lightbox
function openLightbox(index) {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
}

// Close Lightbox
function closeLightbox() {
    lightbox.style.display = "none";
}

// Next / Previous Image
function changeSlide(step) {

    currentIndex += step;

    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImg.src = images[currentIndex].src;
}

// Close when clicking outside the image
lightbox.addEventListener("click", function(e) {

    if (e.target === lightbox) {
        closeLightbox();
    }

});

// Close using ESC key
document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        closeLightbox();
    }

});

// Keyboard Navigation
document.addEventListener("keydown", function(e) {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {
            changeSlide(1);
        }

        if (e.key === "ArrowLeft") {
            changeSlide(-1);
        }

    }

});

// Filter Images
function filterSelection(category, event) {

    const items = document.querySelectorAll(".image");

    items.forEach(item => {

        if (category === "all") {

            item.style.display = "block";

        } else {

            if (item.classList.contains(category)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        }

    });

    // Active Button
    const buttons = document.querySelectorAll(".buttons button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    event.target.classList.add("active");
}
