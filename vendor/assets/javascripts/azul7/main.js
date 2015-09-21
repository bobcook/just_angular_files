// Working draft js file

// Search dropdown options switch when selected
$('.dropdown-menu li.switch-click').on('click', function(event) {
    var $target = $( event.currentTarget );

    $target.closest( '.btn-group' )
       .find( '[data-bind="label"]' ).text( $target.text() )
          .end()
       .children( '.dropdown-toggle' ).dropdown( 'toggle' );
    return false;
});


// Pagination (search results) toggle class active
$('.pagination li a').on('click', function() {
    $('a').removeClass('active');
    $(this).toggleClass('active');
});

// Toggle menu/close icon on click
$('.navbar-toggle').on('click', function() {
   $('.slide-menu').toggleClass('closed open');
   $('#bodyFadeOverlay').addClass('fade-overlay');
});

// Toggle menu/close icon IN MENU on click
$('.navbar-menu-toggle').on('click', function() {
   $('.slide-menu').toggleClass('closed open');
   $('#bodyFadeOverlay').removeClass('fade-overlay');
});

$('.navbar-close').on('click', function() {
   $('.slide-menu').toggleClass('closed open');
});

// Close call outs
// Close details call-out on click
$('.close-call-out-details').on('click', function() {
   $('.cp-call-out.details').addClass('hidden');
});

// Close plain call-out on click
$('.close-call-out-plain-button').on('click', function() {
   $('.cp-call-out.plain-button').addClass('hidden');
});

// Close plain call-out on click
$('.close-call-out-plain-link').on('click', function() {
   $('.cp-call-out.plain-link').addClass('hidden');
});
// END Close call outs

// Toggle tier 2 drawer in global nav
$('.primary-level-toggle').on('click', function(){
    if ($('.collapsing').length) {
     return false;
    } else {
        $(this).siblings('li').toggle();
    }
});


// Article Tracked Toggler for Tracker Cards
$('.tracker .btn').bind('click', function() {
	$(this).toggleClass('tracked');
	$(this).next().children('.current-day').toggleClass('tracked');
});
// Tracking Button class Toggle
$('.tracking-btn').bind('click', function() {
	$(this).toggleClass('tracked');
});
// Article Trackable Challenge Card
$('.trackable-challenge-card .btn').bind('click',function(){
	var targetCard = $(this).parents('.trackable-challenge-card');
	$(this).toggleClass('tracked');

	$(targetCard).children('.color-fill').fadeOut(function() {
		$(targetCard).toggleClass('tracked');
		$(targetCard).children('.color-fill').fadeIn();
	});
});


// Toggle caret up/down and text on drawer open/close
$('.toggleCaret').on('click', function() {
    $('.caret').toggleClass('caret-up caret-down');

    var text = $('.change-text').text();
    $('.change-text').text(
    text == "Show" ? "Hide" : "Show");
});


// active state on tab list and ajax content
$(".tab-list a").bind('click' , function (e){
	e.preventDefault();
    $(".tab-list a").removeClass('active');
	$(this).addClass('active');
	$("#container1").load("ajax-data.html");
});


// active state on pillar filter
$(".cp-pillar-filter a").bind('click' , function (e){
    e.preventDefault();
    $(".cp-pillar-filter a").removeClass('active');
    $(this).addClass('active');
});


// Copy Text
$('#copyLink').bind('click' , function (){
	// This is not copying anything at this point
	// It is simply adding the class
	// This will be a callback after the text is copied
	$(this).parent('.body').addClass('copied');
});

var carouselInit = function () {
	$('.cp-inline-carousel .carousel').each(function (){
		var currentCarousel = $(this),
			currentSlideNum = currentCarousel.find('.active').index() + 1,
			totalSlidesNum = currentCarousel.find('.item').size(),
			currentSlideDisplay = currentCarousel.find('.controls .current'),
			totalSlidesDisplay = currentCarousel.find('.controls .total');

		var updateSlide = function (currentCarousel) {
			currentSlideNum = $(currentCarousel).find('.active').index() + 1;
			currentSlideDisplay.html(currentSlideNum);
			},
			setSlideCount = function () {
			totalSlidesDisplay.html(totalSlidesNum);
		};

		setSlideCount();

		$(currentCarousel).on('slid.bs.carousel', function () {
			$(this).find('.carousel-caption').animate({
				'opacity': '1.0'
			},350);
			updateSlide(currentCarousel);
		});
		$(currentCarousel).on('slide.bs.carousel', function () {
			$(this).find('.carousel-caption').animate({
				'opacity': '0.0'
			},100);
		});
	});
};
if ($('.cp-inline-carousel .carousel').length) {
	carouselInit();
}

/* Base percentage of challenge activity completed */
/* Thanks goes to OzzyCzech at stackoverflow for this one */
var percentCompleteInit = function () {
    $('.percentComplete').each(function (){
        var el = document.getElementById('percentGraph'); // get canvas

        var options = {
            percent: el.getAttribute('data-percent') || 15,
            size: el.getAttribute('data-size') || 78,
            lineWidth: el.getAttribute('data-line') || 8,
            rotate: el.getAttribute('data-rotate') || 0
        }

        var canvas = document.createElement('canvas');

        var span = document.createElement('span');
        span.textContent = options.percent + '%';

        if (typeof(G_vmlCanvasManager) !== 'undefined') {
            G_vmlCanvasManager.initElement(canvas);
        }

        var ctx = canvas.getContext('2d');


        canvas.width = canvas.height = options.size;

        el.appendChild(span);
        el.appendChild(canvas);

        ctx.translate(options.size / 2, options.size / 2); // change center
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

        //imd = ctx.getImageData(0, 0, 240, 240);
        var radius = (options.size - options.lineWidth) / 2;

        var drawCircle = function(color, lineWidth, percent) {
                percent = Math.min(Math.max(0, percent || 1), 1);
                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
                ctx.strokeStyle = color;
                ctx.lineCap = 'round'; // butt, round or square
                ctx.lineWidth = lineWidth
                ctx.stroke();
        };

        drawCircle('#efefef', options.lineWidth, 100 / 100);
        drawCircle('#5ba858', options.lineWidth, options.percent / 100);
    });
};
if ($('.percentComplete').length) {
	percentCompleteInit();
}
/* END Base percentage of challenge activity completed */
