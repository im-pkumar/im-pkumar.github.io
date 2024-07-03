document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const slides = slider.querySelector('.slides');
        const images = slides.querySelectorAll('img');
        let index = 0;

        const showSlide = (i) => {
            slides.style.transform = `translateX(${-i * 100}%)`;
        };

        const nextSlide = () => {
            index = (index + 1) % images.length;
            showSlide(index);
        };

        const prevSlide = () => {
            index = (index - 1 + images.length) % images.length;
            showSlide(index);
        };

        // Add navigation buttons
        const sliderNav = document.createElement('div');
        sliderNav.classList.add('slider-nav');

        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', prevSlide);

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', nextSlide);

        sliderNav.appendChild(prevButton);
        sliderNav.appendChild(nextButton);
        slider.appendChild(sliderNav);
    });
});

let currentIndex = 0;
let currentAcademicIndex = 0;
let currentPersonalIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.project-slider .slide');
    if (index >= slides.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = slides.length - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.project-slider .slides').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}
// Initialize the sliders by showing the first slides
showSlide(currentIndex);


