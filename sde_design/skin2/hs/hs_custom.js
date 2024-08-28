$(document).ready(function(){
	
});



/* ************************************* 
**                                    **
**               SWIPER               **
**                                    **
************************************* */

// MAIN VISUAL
var mainSwiperMv = new Swiper('.mainVisual .swiper', {
  slidesPerView: 3,
  loop: true,
  // autoplay: {
  //     delay: 5000,
  // },
  pagination: {
      el: ".sec01-pagination",
      type: "fraction",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});