(function ($) {

	$.fn.fauxSelect = function( options ){

		// via jquery plugin demo, extending default options
		// empty object keeps from overriding "defaults" object
		var opts = $.extend( {}, $.fn.fauxSelect.defaults, options );

		// this is where plugin implementation is placed.
		return this.each(function(){

			var $select = $(this),
                $option = $select.children(),
                numOptions = $option.length,
				$fauxHead;

			// wrap a containing element around each select box
            $select.wrap('<div class="fauxSelectHolder"/>');
            var $fauxSelectHolder = $select.parent();

            // appends empty ul for li - options
            $fauxSelectHolder.append('<ul class="fauxSelect"/>');
            var $fauxSelect = $fauxSelectHolder.find('.fauxSelect');
            $fauxSelect.css('z-index', numOptions);

			// prepend fauxDropper for clicking purposes
			$fauxSelectHolder.prepend('<div class="fauxDropper"/>');
            var $fauxDropper = $fauxSelectHolder.find('.fauxDropper');
            $fauxDropper.css('z-index', numOptions + 3);

			// adds arrow to be styled (if you need something more complex than simple before and after elements)
			if ( opts.arrow ) {
				$fauxSelectHolder.prepend('<div class="realArrow"/>');
				$fauxSelectHolder.find('.realArrow').css('z-index', numOptions + 2);
			}

			// appends a header if there is a placeholder
			if ( $select.attr('placeholder') !== undefined ) {
				$fauxDropper.after('<div class="fauxHead"/>');

                var placeholderText = $select.attr('placeholder');

                $fauxHead = $fauxSelectHolder.find('.fauxHead');

                $fauxHead.text(placeholderText).css('z-index', numOptions + 1);
			}

            // appends an li for each option in original select box with markup
            $option.each(function(){
                var optionText = $(this).html();
                $fauxSelect.append('<li class="fauxOption">'+optionText+'</li>');
            });
            var $fauxOption = $fauxSelect.find('.fauxOption');

            // css control options
            $fauxOption.each(function(index){
                $(this).css({
                    '-webkit-transition-duration': opts.transitionDuration + 's',
                    '-moz-transition-duration': opts.transitionDuration + 's',
                    '-o-transition-duration': opts.transitionDuration + 's',
                    'transition-duration': opts.transitionDuration + 's',
                    'z-index': (numOptions - index)
                });
            });

			$fauxDropper.click(function(){
				$fauxSelectHolder.addClass('open');

				var fauxSelectH = 0;

                if( $fauxHead !== undefined && $fauxHead.length > 0 /*&& cherry*/ ){
                    fauxSelectH += $fauxHead.innerHeight();
					setTimeout(function(){
						$fauxHead.css('z-index', numOptions + 2);
					}, (opts.transitionDuration * (numOptions)) * 200);
                }
                else{
                    fauxSelectH = 0;
                }

				$fauxOption.each(function(index){
					if ( opts.transitionDelay ) {
						$(this).css({
							'-webkit-transition-delay': index * opts.transitionDelay + 's',
							'-moz-transition-delay': index * opts.transitionDelay + 's',
							'-o-transition-delay': index * opts.transitionDelay + 's',
							'transition-delay': index * opts.transitionDelay + 's'
						});
					}
					$(this).css({
						'top': fauxSelectH
					});
					fauxSelectH += $(this).innerHeight();
				});
				$fauxDropper.css('z-index', -1);
			});

			$fauxOption.click(function(){
				$fauxSelectHolder.removeClass('open');

				var selectIndex = $(this).index();

				$fauxOption.each(function(index){
					$(this).css({
						'-webkit-transition-delay': '0s',
						'-moz-transition-delay': '0s',
						'-o-transition-delay': '0s',
						'transition-delay': '0s',
						'top': 0,
						'z-index': (numOptions - index)
					});
				});
				$(this).css('z-index', numOptions + 1);
				$fauxDropper.css('z-index', numOptions + 3);
				if( $fauxHead !== undefined && $fauxHead.length > 0 ){
                    $fauxHead.css('z-index', -1);
                }
				$option.not($option.eq(selectIndex)).removeProp('selected');
				$option.eq(selectIndex).prop('selected', 'selected');
			});
			if( $fauxHead !== undefined && $fauxHead.length > 0 ){
				$fauxHead.click(function(){
					if( $fauxSelectHolder.hasClass('open') ){
						$fauxSelectHolder.removeClass('open');
						$fauxOption.each(function(index){
							$(this).css({
								'-webkit-transition-delay': '0s',
								'-moz-transition-delay': '0s',
								'-o-transition-delay': '0s',
								'transition-delay': '0s',
								'top': 0,
								'z-index': index
							});
						});
						$(this).css('z-index', numOptions + 2);
						$fauxDropper.css('z-index', numOptions + 3);
						$option.removeProp('selected');
					}
				});
			}
			$(document).mouseup(function(e){
				if( $fauxSelectHolder.hasClass('open') ){
					if (!$fauxSelectHolder.is(e.target) && $fauxSelectHolder.has(e.target).length === 0){
				        $fauxSelectHolder.removeClass('open');
						$fauxOption.each(function(){
							$(this).css({
								'-webkit-transition-delay': '0s',
								'-moz-transition-delay': '0s',
								'-o-transition-delay': '0s',
								'transition-delay': '0s',
								'top': 0
							});
						});
						$fauxDropper.css('z-index', numOptions + 3);
				    }
				}
			});
			if( $fauxHead !== undefined && $fauxHead.length > 0 ){
				$fauxHead.click(function(){
					if( $fauxSelectHolder.hasClass('open') ){
				        $fauxSelectHolder.removeClass('open');
						$fauxOption.each(function(){
							$(this).css({
								'-webkit-transition-delay': '0s',
								'-moz-transition-delay': '0s',
								'-o-transition-delay': '0s',
								'transition-delay': '0s',
								'top': 0
							});
						});
						$(this).css('z-index', numOptions + 1);
						$fauxDropper.css('z-index', numOptions + 3);
					}
				});
			}
        });
	};

	// Plugin defaults - added as a property on fauxSelect function
	$.fn.fauxSelect.defaults = {
        transitionDelay: false,                     // add value (like 0.5) if you want each "option" to dropdown on a delay
        transitionDuration: 0.35,                   // change value to switch how long each "option" takes to drop
        arrow: false
	};

}(jQuery));
