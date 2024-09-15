$(document).ready(function(){

	const priceWr = $('.priceWr');
  if(priceWr.length > 0){
    let  priceCont = priceWr.find('.cont');
    priceCont.each(function(){
      let $param = $(this).attr('value');
      let $LayerBtn = $(this).find('dt a');
      let $LayerWr = priceWr.find('.prcLayerWr');
      $LayerBtn.on('click',function(){
        $('body.hs').addClass('popup');
        $LayerWr.show().prepend('<iframe id="prcLayer" title="prcLayer info" src="' + $param + '"></iframe>');
      });
    });
  }
});
function closeIframe() {
  window.parent.ingredientClose();
}
function ingredientClose(){
  let iframeWr = $('.prcLayerWr');
  let iframe = $("#prcLayer");
  iframe.remove();
  iframeWr.hide();
  $('body.hs').removeClass('popup');

}



/* ************************************* 
**                                    **
**               SWIPER               **
**                                    **
************************************* */

// MAIN VISUAL
var mainSwiperMv = new Swiper('.mainVisual .swiper', {
  slidesPerView: 3,
  loop: true,
  autoplay: {
      delay: 3000,
  },
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