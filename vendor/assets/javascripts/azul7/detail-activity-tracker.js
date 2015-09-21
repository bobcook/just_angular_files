jQuery.fn.forceNumeric = function () {
	return this.each(function () {
		$(this).keydown(function (e) {
			var key = e.which || e.keyCode;

			if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
					// numbers
				key >= 48 && key <= 57 ||
					// Numeric keypad
				key >= 96 && key <= 105 ||
					// comma, period and minus, . on keypad
				key == 190 || key == 188 || key == 109 || key == 110 ||
					// Backspace and Tab and Enter
				key == 8 || key == 9 || key == 13 ||
					// Home and End
				key == 35 || key == 36 ||
					// left and right arrows
				key == 37 || key == 39 ||
					// Del and Ins
				key == 46 || key == 45)
				return true;

			return false;
		});
	});
};
var sync1 = $(".full-view");
var sync2 = $(".snapshot");
var graph = $('.detail-activity-tracker.graph');
var binary = $('.detail-activity-tracker.binary');
var clickedDayIndex = 0;
var trackTodayBtn = $('.detail-activity-tracker .tracking-btn');

var carouselSyncInit = function () {
	sync1.owlCarousel({
		singleItem : true,
		slideSpeed : 1000,
		transitionStyle : "fade",
		pagination:false,
		touchDrag: false,
		mouseDrag: false,
		afterAction : syncPosition,
		addClassActive: true,
		responsiveRefreshRate : 200,
		rewindNav: false,
		afterInit : function(el){
			sync1.trigger('owl.jumpTo', el.find(".owl-item:last-child").index());
		}
	});

	sync2.owlCarousel({
		itemsCustom : [
			[0, 1],
			[768, 3],
			[980, 5]
		],
		slideSpeed : 800,
		pagination:false,
		responsiveRefreshRate : 100,
		addClassActive: true,
		afterInit : function(el){
			el.find(".owl-item:last-child").addClass("synced");
			sync2.trigger('owl.jumpTo', el.find(".owl-item:last-child").index());
		}
	});
	$(".next").click(function(){
		sync1.trigger('owl.next');
	});
	$(".prev").click(function(){
		sync1.trigger('owl.prev');
	});
	function syncPosition(el){
		var current = this.currentItem;
		sync2
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced")
		if(sync2.data("owlCarousel") !== undefined){
			center(current)
		}
	}

	sync2.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		sync1.trigger("owl.goTo",number);
	});

	function center(number){
		var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
		var num = number;
		var found = false;
		for(var i in sync2visible){
			if(num === sync2visible[i]){
				var found = true;
			}
		}
		if(found===false){
			if(num>sync2visible[sync2visible.length-1]){
				sync2.trigger("owl.goTo", num - sync2visible.length+2)
			}else{
				if(num - 1 === -1){
					num = 0;
				}
				sync2.trigger("owl.goTo", num);
			}
		} else if(num === sync2visible[sync2visible.length-1]){
			sync2.trigger("owl.goTo", sync2visible[1])
		} else if(num === sync2visible[0]){
			sync2.trigger("owl.goTo", num-1)
		}
	}
};
var initActivityBaseEvents = function() {
	var fullData = $('.full-view ');
	var goToTodayBtn = $('.goToToday');
	var snapShot = $('.snapshot');
	var fullDataIndicator = $('.full-view .indicator').parent('li');
	var week = $('.full-view .week');

	var setSnapShotData = function () {
		fullDataIndicator.each(function(index){
			var classes = $(this).attr('class');
			$(snapShot).find('.tracker li').eq(index).attr('class', classes);
		});
		week.each(function(index){
			var week = $(this).text();
			$(snapShot).find('figcaption').eq(index).find('span').html(week);
		})
	};

	var trackToday = function () {
		sync2.find('.owl-item:last-child').trigger('click');
		fullData.find('.current-day .indicator').trigger('click');
	};

	goToTodayBtn.bind('click' , function (){
		sync2.find('.owl-item:last-child').trigger('click');
	});
	trackTodayBtn.unbind().bind('click' , function (){
		trackToday();
	});

	setSnapShotData();
};
var initBinaryActivityEvents = function () {
	var trackingBtn = $('.binary .full-view .indicator');
	var binarySnapShot = $('.binary .snapshot');

	var updateBinarySnapShotData = function (currentDayIndex) {
		$(binarySnapShot).find('.synced').find('.tracker li').eq(currentDayIndex).toggleClass('tracked');
	};

	trackingBtn.bind('click' , function () {
		var clickedDay = $(this).parent('li');
		clickedDayIndex = clickedDay.index();
		clickedDay.toggleClass('tracked');

		if (clickedDay.hasClass('tracked')) {
			clickedDay.attr('data-userval', 1);
		} else {
			clickedDay.attr('data-userval', 0);
		}
		if (clickedDay.hasClass('current-day')) {
			trackTodayBtn.toggleClass('tracked');
		}
		updateBinarySnapShotData(clickedDayIndex);
	});
};
var initGraphActivityEvents = function () {
	var graphInputBtn = $('.graph .full-view .indicator , .graph .full-view .bar');
	var indicator = $('.graph .full-view .indicator');
	var modal = '';
	var intensityModal = $('#trackIntensity');
	var quantityModal = $('#trackQuantity');
	var intensityModalSaveBtn = $('#trackIntensity .footer .btn');
	var quantityModalSaveBtn = $('#trackQuantity .footer .btn');
	var intensity = 0;
	var duration = 0;
	var activeBars = $('.graph .owl-item .full .tracker li').not('.future-day');
	var barFillPercent = '';
	var firstRun = true;
	var graphSnapShot = $('.graph .snapshot');
	var useDefaultMax = false;

	var getModal = function () {
		if (intensityModal.length) {
			modal = intensityModal;
		} else {
			modal = quantityModal;
		}
		return modal;
	};
	var getPercent = function (x, y) {
		return x / y * 100
	};
	var getSyncedTracker = function () {
		return graphSnapShot.find('.synced').find('.tracker li');
	};
	var getMaxValue = function () {
		var inputValues = [];

		activeBars.each(function () {
			inputValues.push($(this).attr('data-userval'));
		});

		return Math.max.apply(Math, inputValues);
	};
	var trackSnapshot = function (currentDayIndex) {
		getSyncedTracker().eq(currentDayIndex).addClass('tracked');
	};
	var untrackSnapshot = function (currentDayIndex) {
		getSyncedTracker().eq(currentDayIndex).removeClass('tracked');
	};
	var setModalVal = function (el) {
		barFillPercent = $(el).parents('li');
		var intensityVal = barFillPercent.attr('data-userval');
		var durationVal =  barFillPercent.attr('data-userval');

		$('.track-intensity li').eq(intensityVal).find('input[type=radio]').trigger('click');
		$('.cp-modal.track-duration #time').val(durationVal);
	}
	var updateUserData = function (val) {
		var clickedDay = barFillPercent;
		clickedDayIndex = clickedDay.index();

		if ( val > 0 ) {
			clickedDay.addClass('tracked');
			trackSnapshot(clickedDayIndex);
			barFillPercent.attr('data-userval', val);

		} else {
			clickedDay.removeClass('tracked');
			untrackSnapshot(clickedDayIndex);
			barFillPercent.attr('data-userval', val);
		}

		if (clickedDay.hasClass('current-day')) {
			trackTodayBtn.toggleClass('tracked');
		}

		//SAFARI HACK
		$('[data-userval="'+val+'"]').height(
			'height' , '0%'
		);

	};
	var updateGraph = function (val) {
		var valueMax = $('.value-scale .max');
		var maxVal = val || getMaxValue();

		var updateMaxValue = function (){
			valueMax.text(maxVal);
		};
		var updateBars = function () {
			activeBars.each(function (i) {
				var barPercent = getPercent($(this).attr('data-userval') , maxVal);
				var fill = $(this).find('.fill');
				var delay = 0;

				if (firstRun) {
					delay = 100;
				} else {
					delay = 0;
				}

				setTimeout(function () {
					fill.height(barPercent + '%');

				}, delay * i);

				firstRun = false;
			});
		};
		updateBars();
		updateMaxValue();
	};
	var resetModal = function () {
		getModal().modal('hide');
		$('.cp-modal.track-duration #time').val('');
		$('.track-intensity li').eq(1).find('input[type=radio]').prop('checked', function () {
			return this.getAttribute('checked') == 'true';
		});
	};
	getModal().on('hidden.bs.modal',function(){

	});
	graphInputBtn.bind('click', function () {
		setModalVal(this);
		getModal().modal('show');

	});
	intensityModalSaveBtn.on('click', function () {
		intensity = $(".cp-modal.track-intensity input:radio[name=intensity]:checked").val();
		updateUserData(intensity);
		updateGraph(5);
		resetModal();
	});
	quantityModalSaveBtn.on('click', function () {
		duration = $('.cp-modal.track-duration #time').val();
		updateUserData(duration);
		updateGraph();
		resetModal();
	});
	sync1.on('changed.owl.carousel', function () {
		updateGraph();
	});
	updateGraph();
	$('.cp-modal input[type="number"]').forceNumeric();
};

var initActivityTracker = function () {
	carouselSyncInit();
	initActivityBaseEvents();
	if ( graph.length ) {
		initGraphActivityEvents();
	}
	if ( binary.length ) {
		initBinaryActivityEvents();
	}
};


$(document).ready(function() {
	initActivityTracker();
});

