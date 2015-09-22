(function ($) {

	// ************************************************************
	//					ADDITIONAL GOODIES:
	// 			1. Custom pages
	//			2. Custom animations
	// ************************************************************

	$.fn.fauxSelect = function( options ){

        /*global console*/

		// via jquery plugin demo, extending default options
		// empty object keeps from overriding "defaults" object
		var opts = $.extend( {}, $.fn.fauxSelect.defaults, options );

		// this is where plugin implementation is placed.
		return this.each(function(){

            var $select = $(this),
                // sW = $select.width(),
                // sH = $select.height(),
                $options = $select.children(),
                numOptions = $options.length;

            // wrap a containing element around each select box
            $select.wrap('<div class="fauxSelectHolder"/>');
            var $fauxSelectHolder = $select.parent();

            // appends empty ul for li - options
            $fauxSelectHolder.append('<ul class="fauxSelect"/>');
            var $fauxSelect = $fauxSelectHolder.find('.fauxSelect');
            $fauxSelect.css('z-index', numOptions);

            // if there is a placeholder on the select we can create a placeholding 'header'
            if ( $select.attr('placeholder') !== undefined && opts.placeholder ) {
                $fauxSelectHolder.prepend('<div class="fauxHead"/>');

                var $fauxPlaceholder = $select.attr('placeholder'),
                    $fauxHead = $fauxSelectHolder.find('.fauxHead');

                $fauxHead.text($fauxPlaceholder).css('z-index', numOptions + 1);
            }

            $fauxSelectHolder.prepend('<div class="fauxDrop"/>');

            var $fauxDrop = $fauxSelectHolder.find('.fauxDrop');

            $fauxDrop.css('z-index', numOptions + 2);

            // appends an li for each option in original select box with markup
            $options.each(function(){
                var optionText = $(this).html();
                $fauxSelect.append('<li class="fauxOption">'+optionText+'</li>');
            });
            var $fauxOptions = $fauxSelect.find('.fauxOption');

            // css control options
            $fauxOptions.each(function(index){
                $(this).css({
                    '-webkit-transition-duration': opts.transitionDuration + 's',
                    '-moz-transition-duration': opts.transitionDuration + 's',
                    '-o-transition-duration': opts.transitionDuration + 's',
                    'transition-duration': opts.transitionDuration + 's',
                    'z-index': (numOptions - index)
                });
            });

            $fauxSelectHolder.on('click', function(){
                var fauxSelectH = $(this).height();
                var spacer;

                $(this).toggleClass('open');

                if( $fauxHead !== undefined ){
                    spacer = 1;
                }
                else{
                    spacer = 0;
                }

                if ( $(this).hasClass('open') ) {
                    $fauxOptions.each(function(index){
                        if ( opts.transitionDelay ) {
                            $(this).css({
                                '-webkit-transition-delay': index * opts.transitionDelay + 's',
                                '-moz-transition-delay': index * opts.transitionDelay + 's',
                                '-o-transition-delay': index * opts.transitionDelay + 's',
                                'transition-delay': index * opts.transitionDelay + 's'
                            });
                        }
                        $(this).css({
                            'top': (index + spacer) * fauxSelectH
                        });
                    });
                    $fauxDrop.css('z-index', -1);
                }
                else{
                    $fauxOptions.each(function(){
                        if ( opts.transitionDelay ) {
                            $(this).css({
                                '-webkit-transition-delay': 0 + 's',
                                '-moz-transition-delay': 0 + 's',
                                '-o-transition-delay': 0 + 's',
                                'transition-delay': 0 + 's'
                            });
                        }
                        $(this).css({
                            'top': 0
                        });
                    });
                    $fauxDrop.css('z-index', numOptions + 2);
                }
            });
        });
	};

	// Plugin defaults - added as a property on fauxSelect function
	$.fn.fauxSelect.defaults = {
        placeholder: false,                         // if true, select needs a placeholder attribute
        transitionDelay: false,                     // add value (like 0.5) if you want each "option" to dropdown on a delay
        transitionDuration: 0.35,                   // change value to switch how long each "option" takes to drop
        test: false
	};

}(jQuery));
