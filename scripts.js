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
