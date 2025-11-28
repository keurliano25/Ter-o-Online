document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('dots-container');
    const totalSlides = slides.length;

    let currentIndex = 0;
    let intervalId = null;

    function updateCarousel(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.carousel-dot')
            .forEach(dot => dot.classList.remove('bg-accent-soft'));

        document.querySelectorAll('.carousel-dot')
            .forEach(dot => dot.classList.add('bg-white/50'));

        currentIndex = (index + totalSlides) % totalSlides;

        slides[currentIndex].classList.add('active');

        const currentDot = document.querySelector(`.carousel-dot[data-index="${currentIndex}"]`);
        if (currentDot) {
            currentDot.classList.remove('bg-white/50');
            currentDot.classList.add('bg-accent-soft');
        }
    }

    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add(
                'carousel-dot', 'w-3', 'h-3', 'rounded-full',
                'mx-1', 'transition-colors', 'duration-300', 'bg-white/50'
            );
            dot.setAttribute('data-index', i);

            dot.addEventListener('click', () => {
                updateCarousel(i);
                resetInterval();
            });

            dotsContainer.appendChild(dot);
        }
    }

    function nextSlide() {
        updateCarousel(currentIndex + 1);
    }

    function prevSlide() {
        updateCarousel(currentIndex - 1);
    }

    function startInterval() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    createDots();
    updateCarousel(0);
    startInterval();

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
});
