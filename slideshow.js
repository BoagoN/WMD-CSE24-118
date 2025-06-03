document.addEventListener("DOMContentLoaded", () => {
  // Main slideshow functionality
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach(container => {
    const wrapper = container.querySelector('.slideshow-wrapper');
    const slides = Array.from(wrapper.querySelectorAll('.slide'));
    let index = 0;
    const totalSlides = slides.length;

    function updateSlider() {
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      index = (index + 1) % totalSlides;
      updateSlider();
    }

    let interval = setInterval(nextSlide, 5000);
  });

  // Text slider functionality
  const textSliders = document.querySelectorAll('.text-slider-container');
  
  textSliders.forEach(container => {
    const wrapper = container.querySelector('.text-slider-wrapper');
    const slides = Array.from(wrapper.querySelectorAll('.text-slide'));
    let index = 0;
    const totalSlides = slides.length;

    function updateTextSlider() {
      wrapper.style.transform = `translateX(-${index * 100}%)`;
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextTextSlide() {
      index = (index + 1) % totalSlides;
      updateTextSlider();
    }

    let interval = setInterval(nextTextSlide, 3000);
  });
});