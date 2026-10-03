/*-----------------------------------------------------------------------------------
/* Init JS
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */
   setTimeout(function () {
      if ($('h1.responsive-headline').length && typeof $('h1.responsive-headline').fitText === 'function') {
         $('h1.responsive-headline').fitText(1, { minFontSize: '36px', maxFontSize: '76px' });
      }
   }, 150);

   /*----------------------------------------------------*/
   /* Sticky Nav Class on Scroll
   ------------------------------------------------------ */
   $(window).on('scroll', function () {
      var y = $(window).scrollTop();
      var nav = $('#nav-wrap');
      if (y > 40) {
         nav.addClass('scrolled');
      } else {
         nav.removeClass('scrolled');
      }
   });

});
