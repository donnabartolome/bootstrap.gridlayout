/** 
 * BACK TO TOP
 * Show or hide the "back to top" button based on scroll position
 */
window.addEventListener('scroll', function() {
  const backToTopButton = document.getElementById('back-to-top');
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

// Smooth scroll back to top when button is clicked
document.getElementById('back-to-top').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

/** 
 * CAROUSEL
 * Slider for the carousel header
 */
document.addEventListener('DOMContentLoaded', function () {
  const carouselSlide = document.querySelector('.carousel-slide');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const indicators = document.querySelectorAll('.indicator');

  let currentIndex = 0;
  let startX = 0;
  let endX = 0;

  // determines which image to use based on window width
  function setImageSources() {
      const isMobile = window.innerWidth < 768;
      carouselItems.forEach(item => {
          const mobileSrc = item.getAttribute('data-mobile');
          const desktopSrc = item.getAttribute('data-desktop');
          item.style.backgroundImage = `url(${isMobile ? mobileSrc : desktopSrc})`;
      });
  }

  // updates the carousel indicator position based on the active image
  function updateCarousel() {
      carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
      indicators.forEach(indicator => indicator.classList.remove('active'));
      indicators[currentIndex].classList.add('active');
  }

  indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', function () {
          currentIndex = index;
          updateCarousel();
      });
  });

  // added touch events for mobile
  function handleTouchStart(event) {
      startX = event.touches[0].clientX;
  }

  function handleTouchMove(event) {
      endX = event.touches[0].clientX;
  }

  function handleTouchEnd() {
      if (startX > endX + 50) {
          currentIndex = (currentIndex + 1) % carouselItems.length;
      } else if (startX < endX - 50) {
          currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
      }
      updateCarousel();
  }

  carouselSlide.addEventListener('touchstart', handleTouchStart);
  carouselSlide.addEventListener('touchmove', handleTouchMove);
  carouselSlide.addEventListener('touchend', handleTouchEnd);

  setImageSources();
  updateCarousel();

  window.addEventListener('resize', setImageSources);
});

/** 
 * BLOCK ANIMATION
 * To make the landing page interactive
 */
document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in-up');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
  };

  // triggers callback when threshold enters or exits the viewport
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          } else {
              entry.target.classList.remove('visible');
          }
      });
  }, observerOptions);

  fadeInElements.forEach(element => {
      observer.observe(element);
  });
});