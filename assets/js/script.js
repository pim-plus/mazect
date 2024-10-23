const swiper = new Swiper('.swiper', {
  // Optional parameters
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 150,
    modifier: 2.5,
    slideShadows: false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,  // Enable pagination to be clickable
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: "auto", 
    },
  }
});



  document.querySelector('.btn_menu').addEventListener("click", (e) =>{
    e.preventDefault();
    document.querySelector('#menu').classList.add("show")
  })

  document.querySelector('.close a').addEventListener("click", (e) =>{
    e.preventDefault();
    document.querySelector('#menu').classList.remove("show")
  })


  document.querySelectorAll('.read_more').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const fullContent = this.previousElementSibling;

      // Close all other tabs
      document.querySelectorAll('.full_content').forEach((content) => {
        if (content !== fullContent) {
          content.classList.add('h-0');
          content.nextElementSibling.textContent = 'Read more';
        }
      });

      // Toggle the current tab
      if (fullContent.classList.contains('h-0')) {
        fullContent.classList.remove('h-0');
        this.textContent = 'Read less';
      } else {
        fullContent.classList.add('h-0');
        this.textContent = 'Read more';
      }
    });
  });

// Set a variable for our button element.
const scrollToTopButton = document.getElementById('js-top');

// Function to show or hide the button based on scroll position
const scrollFunc = () => {
  // Get the current scroll value
  let y = window.scrollY;
  
  // If the scroll value is greater than 200px, show the button
  if (y > 200) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

// Add the scroll event listener
window.addEventListener("scroll", scrollFunc);

// Function to scroll directly to the top
const scrollToTop = () => {
  // Use window.scrollTo with (0, 0) to jump to the top
  window.scrollTo(0, 0);
};

// When the button is clicked, run the scrollToTop function
scrollToTopButton.onclick = function(e) {
  e.preventDefault();
  scrollToTop();
};
