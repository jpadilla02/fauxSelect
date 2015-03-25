jQuery(document).ready(function($){

	// Tabber section
	// Example instance: $('.tabber').each(tabber);
	function tabberFun(){
		var tabber = $(this),
			tab = tabber.find('.tab'),
			toggleContentItem = tabber.find('.toggle-content-item');

		tab.eq(0).addClass('active');
		toggleContentItem.eq(0).addClass('active');

		tab.bind('click', function(){
			var tabIndex = $(this).index();

			$(this).addClass('active');
			tab.not(this).removeClass('active');
			toggleContentItem.removeClass('active');
			toggleContentItem.eq(tabIndex).addClass('active');
		});
	}

	// Sticky element (for an item that catches at a part of the window)
	// Example instance: 
	// $('.right-holder').each(function(){
	// 	stickyEl($(this), 35);
	// });
	// first values adds context to the function, second is if element
	// is placed lower in it's parent element

	function stickyEl(context, sittingOffset){
		var origin = sittingOffset || 0,
			s = context,
			sParent = s.parent(),
			sParentTopOffset = sParent.offset().top,
			sParentBotOffset = sParentTopOffset + sParent.height();

		$(window).on('scroll', function(){
			var sTop = $(window).scrollTop(),
				winH = $(window).height();

			if( (sTop > sParentTopOffset) && (sTop < sParentBotOffset - winH) ){
				s.css({
					'top': origin + sTop
				});
			}
			else if(sTop <= sParentTopOffset){
				s.css({
					'top': origin
				})
			}
		});
	}

	// Character limiter (for example, limiting text on a blog preview)
	// Example instance:
	// $('.blog-preview p').each(function(){
	// 	charLimit($(this), 150);
	// });
	function charLimit(context, numChar){
		context.html(context.text().substr(0, numChar)+'...');
	}

	// Image/content split
	// normImg takes the form of a boolean
	// true if you need a non-background image vertically centered
	// false if you do not
	// Example instance:
	// $('.section').each(function(){
	// 	formatSection($(this), false);
	// });
	function formatSection(context, normImg){
		var textH = context.find('.text').innerHeight();

		context.css('height', textH);

		if( normImg ){
			$(window).on('load resize', function(){
				var imgHolder = context.find('.img'),
					imgHolderH = imgHolder.height(),
					image = imgHolder.find('img'),
					imageH = image.height();

				image.css({
					'position': 'relative',
					'top': (imgHolderH - imageH)/2
				});
			});	
		}
	}
});