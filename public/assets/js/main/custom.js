/* Theme Name: Ozowkr *
* Developed By: Pratiksha Sharma*
* Version: 1.1, 28 June, 2019*
*/

//Header
$(window).scroll(function(){
  var sticky = $('.navbar.fixed-top.home'),
      scroll = $(window).scrollTop();

  if (scroll >= 100) sticky.addClass('fixed');
  else sticky.removeClass('fixed');
});

//Animation on scroll
			AOS.init({
			duration: 1200,
			})
			
$('.testimonial-slider').owlCarousel({
	loop: true, 
	margin: 10,
	autoplay: true,
	responsiveClass: true,
	responsive: {
		0: {
			items: 1,
			nav: true
		}, 
		600: {
			items: 3,
			nav: false
		},
		1000: {
			items: 4,
			nav: true,
			loop: true
		}
	}
})