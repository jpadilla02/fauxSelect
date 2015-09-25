(function ($) {

    /* global console */

	$.fn.fauxSelect = function( options ){
    	var opts = $.extend( {}, $.fn.fauxSelect.defaults, options );

    	return this.each(function(){

            var fauxOb = {
                s: $(this),
                o: $(this).children(),
                numOps: $(this).children().length,
                fOps: [],

                setUp: function(){
                    // fauxElement
                    this.s.wrap('<div class="fauxEl"/>');
                    this.fauxEl = this.s.parent();
                    // fauxSelect
                    this.fauxEl.append('<ul class="fauxSelect"/>');
                    this.fauxSelect = this.fauxEl.find('.fauxSelect');
                    // fauxHolder
                    this.fauxSelect.wrap('<div class="fauxHolder"/>');
                    this.fauxHolder = this.fauxEl.find('.fauxHolder');
                    // fauxOptions
                    this.o.each(function(index){
                        var oText = $(this).html();
                        fauxOb.fauxSelect.append('<li class="fauxOption">'+oText+'</li>');
                        fauxOb.fOps[index] = fauxOb.fauxSelect.find('.fauxOption').eq(index);
                    });
                    $.each(this.fOps, function(index){
                        this.css('z-index', fauxOb.numOps - index);
                        if ( opts.transitionDuration !== 0 ) {
							this.css({
			                    '-webkit-transition-duration': opts.transitionDuration + 's',
			                    '-moz-transition-duration': opts.transitionDuration + 's',
			                    '-ms-transition-duration': opts.transitionDuration + 's',
			                    '-o-transition-duration': opts.transitionDuration + 's',
			                    'transition-duration': opts.transitionDuration + 's'
			                });
						}
                    });
                    // fauxDropper
                    this.fauxEl.prepend('<div class="fauxDropper"/>');
                    this.fauxDropper = this.fauxEl.find('.fauxDropper');
                    // fauxArrow
                    if ( opts.arrow ) {
                        this.fauxEl.prepend('<div class="fauxArrow"/>');
                        this.fauxArrow = this.fauxEl.find('.fauxArrow');
                    }
                    // fauxHead
                    if ( opts.placeHolder ) {
                        this.fauxDropper.after('<div class="fauxHead"/>');
                        this.fauxHead = this.fauxEl.find('.fauxHead');

                        var placeholder;
                        if ( opts.placeHolder === 'label' ) {
                            var selectID = this.s.attr('id');
							placeholder = $('label[for="'+ selectID +'"]').html();
							$('label[for="'+ selectID +'"]').hide();
                        }
                        else if ( opts.placeHolder === 'placeholder' ) {
                            placeholder = this.select.attr('placeholder');
                        }
                        else{
                            console.log('Please select either placeHolder  to either "label" or "placeholder"');
                        }
                        this.fauxHead.text(placeholder);
                    }
                },

                expand: function(){
                    this.fauxEl.addClass('open');
                    var t = 0;
					if ( opts.placeHolder ) {
						t += fauxOb.fauxHead.outerHeight(true);
					}
                    $.each(this.fOps, function(index){
                        if ( opts.transitionDelay ) {
                            this.css({
                                '-webkit-transition-delay': index * opts.transitionDelay + 's',
								'-moz-transition-delay': index * opts.transitionDelay + 's',
								'-ms-transition-delay': index * opts.transitionDelay + 's',
								'-o-transition-delay': index * opts.transitionDelay + 's',
								'transition-delay': index * opts.transitionDelay + 's'
                            });
                        }
                        this.css('top', t);
                        t += this.outerHeight();
                    });
                    if ( opts.maxHeight ) {
                        this.fauxSelect.css('height', t);
                        if ( opts.maxHeight < t ) {
                            this.fauxHolder.css({
                                'height': opts.maxHeight,
                                'overflow': 'scroll'
                            });
                        }
                    }
                    if ( opts.bottomSpacer ) {
                        var spacer = 0;
                        var ex = parseInt(this.fauxEl.css('margin-bottom'));
                        if ( opts.maxHeight ) {
                            if ( opts.maxHeight < t ) {
                                spacer = opts.maxHeight;
                            }
                            else{
                                spacer = t;
                            }
                        }
                        else{
                            spacer = t;
                        }
                        this.fauxEl.css('margin-bottom', spacer - ex);
                    }
                },

                closeEls: function(){
                    $.each(this.fOps, function(){
						if ( opts.transitionDelay ) {
							this.css({
								'-webkit-transition-delay': '0s',
								'-moz-transition-delay': '0s',
								'-ms-transition-delay': '0s',
								'-o-transition-delay': '0s',
								'transition-delay': '0s'
							});
						}
                    });
                    if ( opts.maxHeight ) {
                        this.fauxSelect.removeAttr('style');
                        setTimeout(function(){
                            fauxOb.fauxHolder.removeAttr('style');
                        }, opts.transitionDuration * 1000);
                    }
                    if ( opts.bottomSpacer ) {
                        this.fauxEl.removeAttr('style');
                    }
                },

                choose: function(selectIndex){
                    this.fauxEl.removeClass('open').addClass('selected');
                    this.o.eq(selectIndex).prop('selected', 'selected').siblings().removeProp('selected');
                    $.each(this.fOps, function(index){
                        if ( selectIndex === index ) {
							this.css('z-index', fauxOb.numOps + 1);
						}
						else{
							this.css('z-index', fauxOb.numOps - index);
						}
                        this.css('top', 0);
                    });
                    this.closeEls();
                },

                close: function(reset){
                    if ( this.fauxEl.hasClass('open') ) {
                        if ( reset ) {
                            this.fauxEl.removeClass('selected');
							this.o.each(function(){
								$(this).removeProp('selected');
							});
                        }
						this.fauxEl.removeClass('open');
                        $.each(this.fOps, function(index){
							this.css('top', 0);
							if ( reset ) {
								this.css({
									'z-index': fauxOb.numOps - index
								});
							}
						});
                        this.closeEls();
                    }
                }
            };

            fauxOb.setUp();
            fauxOb.fauxDropper.click(function(){
                fauxOb.expand();
            });
			fauxOb.fauxSelect.children().click(function(){
				var selectIndex = $(this).index();
				fauxOb.choose(selectIndex);
			});
			$(document).mouseup(function(e){
				if (!fauxOb.fauxEl.is(e.target) && fauxOb.fauxEl.has(e.target).length === 0){
					fauxOb.close(false);
			    }
			});
			if ( opts.placeHolder ) {
				fauxOb.fauxHead.click(function(){
					fauxOb.close(true);
				});
			}
			if ( opts.arrow ) {
				fauxOb.fauxArrow.click(function(){
					fauxOb.close(false);
				});
			}
        });
	};

	// Plugin defaults - added as a property on fauxSelect function
	$.fn.fauxSelect.defaults = {
		placeHolder: false,							// will add a "header", select either 'label' or 'placeholder' if not false
        transitionDelay: false,                     // add value (like 0.5) if you want each "option" to dropdown on a delay
        transitionDuration: 0,						// change value to switch how long each "option" takes to drop ie 0.35
        arrow: false,								// adds an "arrow" element for styling purposes mostly
		maxHeight: false,							// add a max-height to fauxSelect (potentially for super long lists)
		bottomSpacer: false							// if set to "true", fauxSelect will "push" elements down to account for its height
	};

}(jQuery));
