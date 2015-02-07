
$(document).ready(function() {

<!-- =============================================== -->
<!-- ========== Typer ========== -->
<!-- =============================================== --> 
if ($('[data-typer-targets]').length > 0) { 
	$('[data-typer-targets]').typer({
		highlightSpeed    : 20,
		typeSpeed         : 100,
		clearDelay        : 500,
		typeDelay         : 200,
		clearOnHighlight  : true,
		typerDataAttr     : 'data-typer-targets',
		typerInterval     : 2000
	});
}

<!-- =============================================== -->
<!-- ========== OWL CAROUSEL  ========== -->
<!-- =============================================== --> 
var carousel = $("#carousel");
if (carousel.length > 0) {

	var videos = $(".screen-video");
	var previousItem;
	var videoStarted  = false;
	var largePhone = $(".section-b figure");
	
	var win_height = $(window).height() - 100;
	largePhone.height(win_height);
	largePhone.css("background-size","auto " + win_height + "px" );

	var ratio = 1136 / 640;
	var vid_height = win_height * 0.988;
	var vid_width = vid_height / ratio;
	
	videos.each(function( index ) {
		$(this).css({
		   'height': vid_height,
		   'width': vid_width
		}).hide();
	});
	
	var currentItem;
	
	function syncPosition(el){
		var currentItem = this.currentItem;
		
		console.log("Current = " + currentItem + "Previous = " + previousItem);
		if (previousItem !== undefined) {
			videos.get(previousItem).pause(); 
			videos.eq(previousItem).hide(); 
		}

		videos.eq(currentItem).show();
		console.log("Start play");
		videos.get(currentItem).play();
		
		previousItem = currentItem;
	}
  
    carousel.owlCarousel({
	    slideSpeed: 500,
    	singleItem: true,
    	navigation: true,
    	navigationText: false,
    	afterAction : syncPosition,
    });

	var owl = carousel.data('owlCarousel');
	
//	videos.first().show();
//    videos.get(0).play();	
	
	videos.bind("ended", function () {
		owl.next();
		currentItem = owl.owl.currentItem;

		videos.get(currentItem-1).pause(); 
		videos.eq(currentItem-1).hide(); 
		videos.get(currentItem).play(); 
		videos.eq(currentItem).show(); 
	});
} 
<!-- =============================================== -->
<!-- ========== Scroller  ========== -->
<!-- =============================================== --> 
var fullpage = $('#fullpage');
if (fullpage.length > 0) {
	fullpage.fullpage({
		//Navigation
	//	menu: false,
		anchors:['section-a', 'section-b', 'section-c'],
	//	navigation: false,
	//	navigationPosition: 'right',
	//	navigationTooltips: ['firstSlide', 'secondSlide'],
	//	slidesNavigation: true,
	//	slidesNavPosition: 'bottom',
	
		//Scrolling
		css3: false,
		scrollingSpeed: 700,
		autoScrolling: true,
		easing: 'easeInQuart',
		easingcss3: 'ease-in-out',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: true,
		continuousVertical: false,
	//	normalScrollElements: '#element1, .element2',
		scrollOverflow: false,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,
	
		//Accessibility
		keyboardScrolling: true,
		animateAnchor: true,
	
		//Design
		verticalCentered: true,
		resize : true,
	//	sectionsColor : ['#ccc', '#ddd'],
		paddingTop: '100px',
		paddingBottom: '0px',
		fixedElements: '#header',
		responsive: 0,
	
		//Custom selectors
		sectionSelector: '.section',
	//	slideSelector: '.slide',
	
		afterLoad: function(anchorLink, index){
			if( (anchorLink == 'section-b') && ( !videoStarted)){

				$('.screen-video').first().show();
				$('.screen-video').get(0).play();
				videoStarted  = true;


//				var vid = $('.section-b .screen-video').get(0);
//				var vid = document.getElementById('screen-video');
//				$('.section-b .screen-video').on('loadedmetadata', function () {
//					$('.section-b .screen-video').get(0).play();
//				});
//				vid.play();
// 
//				$('.section-b .screen-video').first().show();
//				$('.section-b .screen-video').get(0).play();
			}
		}
	});
} 


<!-- =============================================== -->
<!-- ========== Validator  ========== -->
<!-- =============================================== --> 
if ($('#login-form').length > 0) {     
  	$('#login-form')
  	.bootstrapValidator({
	  	submitButtons: '#btn-login',
		message: 'This value is not valid',
		feedbackIcons: {
			valid: 'fa fa-check',
			invalid: 'fa fa-times',
			validating: 'fa fa-spinner fa-spin'
		},
		fields: {
			email: {
				validators: {
					notEmpty: {
						message: 'The email address is required and can\'t be empty'
					},
					emailAddress: {
						message: 'The input is not a valid email address'
					}
				}
			},
 			comment: {
				validators: {
                    stringLength: {
                        max: 300,
                        message: 'The comment must be less than 300 characters long'
                    }
				}
			}
		}
    })
   .on('success.form.bv', function(e) {
	    e.preventDefault();

      // Get the form instance
//        var $form = $(e.target);

        // Get the BootstrapValidator instance
//        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
//        $.post($form.attr('action'), $form.serialize(), function(result) {
//            // ... Process the result ...
//        }, 'json');
            
		$('.alert').toggleClass('in');
		setTimeout(function () {
		    $('.alert').toggleClass('in');
		}, 3000)		
    }); 
}
<!-- =============================================== -->
<!-- ========== Player - slider  ========== -->
<!-- =============================================== --> 

if ($('input#slider').length > 0) {
	var mySlider = $("input#slider").slider({
		 max : 100,
		 min : 1,
		 tooltip : 'hide'
	});
}
	
<!-- =============================================== -->
<!-- ========== Pie - progress  ========== -->
<!-- =============================================== --> 

if ($('.pie_progress').length > 0) {
	$(".pie_progress").asPieProgress({
	    namespace: 'pie_progress',
		min: 0,
	    max: 100,
	    goal: 50,
	    step: 1,
	    speed: 10,  // speed of 1/100
	    delay: 300,
        barcolor: '#fa8c75',
        barsize: '3',
        trackcolor: '#f2f2f2',
        fillcolor: 'none',

	    label: function(n) {
	        var percentage = this.getPercentage(n);
	        return percentage;
	    },
//	    onStart: function(){},
//	    onStop: function(){},
//	    onUpdate: function(){},
//	    onReset: function(){}
	
	});
    $('#button_start').on('click', function(){
        $('.pie_progress').asPieProgress('start');
    });
}
   
<!-- =============================================== -->
<!-- ========== Typeahead  ========== -->
<!-- =============================================== --> 
if ($('#search input').length > 0) {    
//	$.get('example_collection.json', function(data){
//		$("#name").typeahead({ source:data });
//	},'json');

	var data  = [
		{"name":"nirvana","type":"artist"},
		{"name":"dr.dre","type":"artist"},
		{"name":"Snoop Dogg","type":"artist"},
		{"name":"Ice Cube","type":"artist"},
		{"name":"The Notorious B.I.G.","type":"artist"},
		{"name":"2Pac","type":"artist"},
		{"name":"N.W.A","type":"artist"},
		{"name":"Eminem","type":"artist"},
		{"name":"The Game","type":"artist"},
		{"name":"D12","type":"artist"},
		{"name":"50 Cent","type":"artist"},
		{"name":"The Next Episode","type":"song"},
		{"name":"Still D.R.E.","type":"song"},
		{"name":"Forgot About Dre ","type":"song"},
		{"name":"What's The Difference","type":"song"},
		{"name":"Xxplosive","type":"song"},
		{"name":"The Watcher","type":"song"},
		{"name":"I need a Doctor","type":"song"},
		{"name":"Big Ego's","type":"song"},
		{"name":"Fuck You","type":"song"},
		{"name":"Let's Get High","type":"song"},
		{"name":"Kush - Main","type":"song"},
		{"name":"Let Me Ride","type":"song"},
		{"name":"hiphop","type":"genre"},
		{"name":"Get Rich Or Die Tryin'","type":"album"},
		{"name":"The Massacre","type":"album"},
		{"name":"Curtis","type":"album"},
		{"name":"Animal Ambition: An Untamed Desire To Win","type":"album"}
	];
	
	
	// constructs the suggestion engine
	var tracks = new Bloodhound({
//		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		 datumTokenizer: function(d) {
		    return Bloodhound.tokenizers.whitespace(d.name);
		 },
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: data
	});
	 
	// kicks off the loading/processing of `local` and `prefetch`
	tracks.initialize();
			
	$("#search input").typeahead({
			highlight: true,
			minLength: 1 
		}, {
		name: 'tracks',
		displayKey: 'name',
		source: tracks.ttAdapter(),
		templates: {
			empty: [].join('\n'),
			suggestion: Handlebars.compile('<p>{{name}}<span>{{type}}</span></p>')
		}
	}); 
}
      
});// Document ready