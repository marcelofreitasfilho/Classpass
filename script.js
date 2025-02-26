document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.sponsor-content');

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            contents[index].classList.add('active');
        });
    });

    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    const cardWidth = cards[0].offsetWidth;
    const totalGroups = 2;
    let currentIndex = 0;
    let isTransitioning = false;

    for (let i = 0; i < totalGroups; i++) {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        dot.setAttribute('aria-label', `Go to slide group ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    }

    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots() {
        const activeDotIndex = Math.floor(currentIndex / 2) % 2;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeDotIndex);
        });
    }

    function smoothTransition(index) {
        if (isTransitioning) return;
        isTransitioning = true;

        track.style.transition = 'transform 0.3s ease-in-out';
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        currentIndex = index;

        updateDots();
    }

    function resetPosition() {
        if (currentIndex >= cards.length - 2) {
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = `translateX(0)`;
        }
        if (currentIndex < 0) {
            track.style.transition = 'none';
            currentIndex = cards.length - 4;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
        isTransitioning = false;
    }

    track.addEventListener('transitionend', resetPosition);

    prevButton.addEventListener('click', () => {
        smoothTransition(currentIndex - 2);
    });

    nextButton.addEventListener('click', () => {
        smoothTransition(currentIndex + 2);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            smoothTransition(index * 2);
        });
    });

    setInterval(() => {
        nextButton.click();
    }, 5000);


    document.querySelector('.cta-secondary').addEventListener('click', function (e) {
        e.preventDefault();
        const element = document.querySelector('#what-to-expect');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    // Mobile menu functionality
    document.querySelector('.menu-icon').addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.remove('active');
        });
    });

    document.querySelector('.menu-close').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Scroll to top function
function scrollToTop(e) {
    e.preventDefault();
    if (window.scrollY === 0) return;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}