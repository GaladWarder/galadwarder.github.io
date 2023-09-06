/*
Kool Swap v0.2.2
by Joscha Schmidt - http://www.itsjoe.de

For more information, visit:
http://itsjoe.de/kool-swap/

Licensed under the Creative Commons Attribution 2.5 License - http://creativecommons.org/licenses/by/2.5/
- free for use in both personal and commercial projects
- attribution requires leaving author name, author link, and the license info intact
	
*/
(function( $ ){
	var ksGlobal = {
		defaults: {
				templateItem : ' ',
				loadBox : '',
				swapTriggerBox : '',
				swapTrigger : 'a.ajax',
				loadErrorMessage : '',
				loadErrorBacklinkText : '',
				bouncingBoxes : '',
				topToBottom : false, 
				leftToRight : false,
				inEasing : 'easeInQuint',
				outEasing : 'easeInQuint',
				inDuration : 700,
				outDuration : 500,
				preloadImages : false,
				direction: '',
				positionType: 'absolute',
		},
		listenToPopState: function(settings, $swapTrigger) {
			$(window)
			.off('popstate')
			.on('popstate', function(e) { // Listen to popstate
				var $templateItemIn;
				switch (settings.direction) {
				    case 'left-to-right':
						$templateItemIn = 'ks-swap-box-in-l-pushstate';
						break;
				    case 'right-to-left':
						$templateItemIn = 'ks-swap-box-in-r-pushstate';
						break;
				    case 'top-to-bottom':
						$templateItemIn = 'ks-swap-box-in-t-pushstate';
						break;
				    case 'bottom-to-top':
						$templateItemIn = 'ks-swap-box-in-b-pushstate';
						break;
				    case '':
						$templateItemIn = 'ks-swap-box-in-pushstate';
						break;
			        default:
						alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
			        	return false;
			        	break;
				}
				ksPageSwap.swapHistoryPage(settings, $swapTrigger, $templateItemIn);
				e.stopPropagation();
			});
		}
	};
	
	var ksPageSwap = {
		defaults: function($this, options) {
			psSettings = $this.data('kool-swap-window');
			
			if(typeof(psSettings) == 'undefined') {
				psSettings = $.extend({}, ksGlobal.defaults, options);
				$this.data('kool-swap-window', psSettings);
			} else {
				psSettings = $.extend(psSettings, options);
			}

			return psSettings;
		},
		init: function(options) {
			var hasPushstate = (window.history && history.pushState);
			
			return this.each(function() {
				ksPageSwap.defaults($(this), options);
				
				var $templateItem = $(psSettings.templateItem), // Use the templateItem option if it is called without selector
					swapTriggerBox = psSettings.swapTriggerBox,
					swapTrigger = psSettings.swapTrigger,
					pageSwap = true;

				if (hasPushstate && $('html').not('[data-ks-initialised]') ) {
					$('html').attr('data-ks-initialised', 'true');
					ksGlobal.listenToPopState(psSettings, $(swapTriggerBox + ' ' + swapTrigger));
				}
				
				ksMethods.trigger(psSettings, hasPushstate, swapTriggerBox, swapTrigger, pageSwap);
			});
		}, 
		swapHistoryPage: function(psSettings, $swapTrigger, templateItemIn) {
			if($('html').is('[data-ks-history-pushed]')) { 
				var href = location.pathname;
				//var currentpage = locationPath.replace(/^.*[\\\/]/, '');
				ksMethods.ksLoadPage(psSettings, $swapTrigger, href, templateItemIn);
			}
		},
		destroy : function($this) {
			$(document).off('click', psSettings.swapTriggerBox + ' ' + psSettings.swapTrigger);
			return $(this).each(function() {
				var $this = $(this);
				$this.removeData('kool-swap-window');
			});
		},
	};
	
	var ksSelectorSwap = {
		defaults: function($this, options) {
			settings = $this.data('kool-swap');
			
			if(typeof(settings) == 'undefined') {
				settings = $.extend({}, ksGlobal.defaults, options);
				$this.data('kool-swap', settings);
			} else {
				settings = $.extend(settings, options);
			}
			return settings;
		},
		init: function(options) {
			return this.each(function() {
				ksSelectorSwap.defaults($(this), options);
				
				settings.templateItem = $(this); // use the given selector
				
				var swapTriggerBox = settings.swapTriggerBox,
					swapTrigger = settings.swapTrigger,
					pageSwap = false;
				
				ksMethods.trigger(settings, true, swapTriggerBox, swapTrigger, pageSwap);
			});
		},		
		destroy : function($this) {
			$(document).off('click', settings.swapTriggerBox + ' ' + settings.swapTrigger);
			return $(this).each(function() {
				var $this = $(this);
				$this.removeData('kool-swap');
			});
		},

	};
	
	var ksMethods = {
		trigger: function(settings, hasPushstate, swapTriggerBox, swapTrigger, pageSwap) {
			if (hasPushstate) {
				function is_touch_device() { // check if the plugin's running on a touch device
					var el = document.createElement('div');
					el.setAttribute('ongesturestart', 'return;');
					return typeof el.ongesturestart === "function";
				};
				
				
				if (is_touch_device()) {
					$(document)
					// for the 404 back link
					.on('touchstart', '.ajaxPageSwitchBacklink', function() {
						window.history.back();
					})
					.off('touchstart', swapTriggerBox + ' ' + swapTrigger)
					.on('touchstart', swapTriggerBox + ' ' + swapTrigger, function(e) {
						e.preventDefault();
						var $swapTrigger = $(this);
						
						ksMethods.ksDefinetemplateItemIn(settings, $swapTrigger, hasPushstate, pageSwap);
					});
				} else {
					$(document)
					// for the 404 back link
					.on('click', '.ajaxPageSwitchBacklink', function() {
						window.history.back();
					})
					.off('click', swapTriggerBox + ' ' + swapTrigger)
					.on('click', swapTriggerBox + ' ' + swapTrigger, function(e) {
						e.preventDefault();
						var $swapTrigger = $(this);

						ksMethods.ksDefinetemplateItemIn(settings, $swapTrigger, hasPushstate, pageSwap);
					});
				}
			}
		},
		ksDefinetemplateItemIn: function(settings, $swapTrigger, hasPushstate, pageSwap) {
			switch (settings.direction) {
			    case 'left-to-right':
			    case 'right-to-left':
			    case 'top-to-bottom':
			    case 'bottom-to-top':
			    case '':
					$templateItemIn = 'ks-swap-box-in';
					if (!$('.ks-swap-box-in').length) {
						var item = $(this);
						ksMethods.ksCollectLoadPageInfo(settings, $swapTrigger, hasPushstate, $templateItemIn, pageSwap);
					} else {
						return false;
					}
					break;
		        default:
					alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
		        	return false;
		        	break;
			}
		},
		ksCollectLoadPageInfo: function(settings, $swapTrigger, hasPushstate, $templateItemIn, pageSwap) {
			var url = $swapTrigger.attr('href');

			var $templateItemIn;
			switch (settings.direction) {
			    case 'left-to-right':
					$templateItemIn = 'ks-swap-box-in-l';
					break;
			    case 'right-to-left':
					$templateItemIn = 'ks-swap-box-in-r';
					break;
			    case 'top-to-bottom':
					$templateItemIn = 'ks-swap-box-in-t';
					break;
			    case 'bottom-to-top':
					$templateItemIn = 'ks-swap-box-in-b';
					break;
			    case '':
					$templateItemIn = 'ks-swap-box-in';
					break;
		        default:
					alert('Kool Swap Error: \n The defined direction ' + settings.direction + ' does not exist.');
		        	return false;
		        	break;
			}
			
			// This generates a canvas from the current page to freeze the contents as they are. It may be used later.
			// Include http://html2canvas.hertzen.com/build/html2canvas.js to test it.
			//	html2canvas($('#' + templateItemId), {
			//		onrendered: function(canvas) {
			//			$('#' + templateItemId).find('*').remove().end().append(canvas);
			//		}
			//	});
			
			ksMethods.ksLoadPage(settings, $swapTrigger, url, $templateItemIn, pageSwap);
			
			if (pageSwap) {
				history.pushState({'url':url}, null, url); // Update the url
				$('html').attr('data-ks-history-pushed', 'true');
			}
		},
		ksLoadPage: function(settings, $swapTrigger, href, templateItemIn, pageSwap) {
			var $templateItem = $(settings.templateItem); // redefine $templateItem variable
			if (href != '') {
				ksMethods.ksAddtemplateItemIn(settings, templateItemIn);
				$.ajax({
					type: 'GET',
					url: href,
					data: {},
					beforeSend: function() {
						ksMethods.ksCreateLoadBox();
					},
					error : function(data, xhrStatusText, xhrStatus) {
						hidemenu();
						$templateItem.html('<p class= "back-link"><span>' + settings.loadErrorMessage + '</span><a class="ajaxPageSwitchBacklink">' + settings.loadErrorBacklinkText + '</a></p>');
					},
					success: function(data) {
	contanimshow();
 
 									 

						if (settings.bouncingBoxes) {
							ksMethods.ksFadeSiblings(settings, $swapTrigger, data, templateItemIn, pageSwap);

						} else {
							ksMethods.ksPositionAndPrepare(settings, $swapTrigger, data, templateItemIn, pageSwap);
						}
					},
					dataType: 'html',
				});
			} else {
				alert('There is no target defined! Please check the references (i.e. normally href) of the swapTriggers.');
			}
		},
		ksAddtemplateItemIn: function(settings, templateItemIn) {
			var $templateItem = $(settings.templateItem), // redefine $templateItem variable
				templateItemClass = $templateItem.attr('class'),
				templateItemTagName = $templateItem.prop("tagName");
				
			$(document).find('.ks-swap-box-in').remove();

			if (settings.movetemplateItemClasses) {
				$templateItem.after('<' + templateItemTagName.toLowerCase() + ' class="ks-swap-box-in ' + (typeof templateItemClass != 'undefined' ? templateItemClass : '') + '" id="' + templateItemIn + '"></' + templateItemTagName.toLowerCase() + '>'); // create the temp container
			} else {
				$templateItem.after('<' + templateItemTagName.toLowerCase() + ' class="ks-swap-box-in" id="' + templateItemIn + '"></' + templateItemTagName.toLowerCase() + '>'); // create the temp container
			}
			
			$templateItem.siblings('.ks-swap-box-in')
			.hide();

		},
		ksFadeSiblings: function(settings, $swapTrigger, data, templateItemIn, pageSwap) {
			$(document)
			.find(settings.bouncingBoxes)
			.animate({opacity: 0}, 50, function() {
				ksMethods.ksPositionAndPrepare(settings, $swapTrigger, data, templateItemIn);
			});
		},
		ksPositionAndPrepare: function(settings, $swapTrigger, data, templateItemIn, pageSwap) {
			var $templateItem = $(settings.templateItem), // redefine $templateItem variable
				templateItemId = $templateItem.attr('id'),
				mainOffset = $templateItem.position(),
				mainWidth = $templateItem.width(),
				mainMarginLeft = $templateItem.css('margin-left'),
				mainMarginRight = $templateItem.css('margin-left'),
				templateItemLeftAbsolute = mainOffset.left + parseFloat(mainMarginLeft);
				templateItemRightAbsolute = mainOffset.left + parseFloat(mainMarginLeft) + mainWidth - parseFloat(mainMarginRight),
				$templateItemIn = $('#' + templateItemIn),
				loadSelector = $swapTrigger.attr('data-ks-load-selector');
		
			if (pageSwap) {
				var	htmlId = data.match(/<\/*html\s+.*id="([^"].*)".*>/), // exclude html classes
					bodyId = data.match(/<\/*body\s+.*id="([^"].*)".*>/), // exclude body classes
					htmlClass = data.match(/<\/*html\s+.*class="([^"].*)".*>/), // exclude html classes
					bodyClass = data.match(/<\/*body\s+.*class="([^"].*)".*>/), // exclude body classes
					pageTitle = data.match(/<\/*title>(.*)<\/title>/); // exclude page title
			}
			
			$templateItem
			.addClass('ks-swap-box-out')
			.css({
				position: 'absolute',
				top: mainOffset.top,
				left: templateItemLeftAbsolute,
				marginLeft: 0,
				width: mainWidth,
			});
			
			if (templateItemInContents = $(data).filter('#' + templateItemId).html() != undefined) { // Check if we have to use .filter or .find to get the data
				if (settings.loadBox) {
					var templateItemInContainer = $(data).filter(settings.loadBox);
				} else if (loadSelector) {
					var templateItemInContainer = $(data).filter(loadSelector);
				} else {
					var templateItemInContainer = $(data).filter('#' + templateItemId);
				}
				templateItemInContents = templateItemInContainer.html();
				var templateItemInClasses = templateItemInContainer.attr('class');
			} else {
				if (settings.loadBox) {
					var templateItemInContainer = $(data).find(settings.loadBox);
				} else if (loadSelector) {
					var templateItemInContainer = $(data).find(loadSelector);
				} else {
					var templateItemInContainer = $(data).find('#' + templateItemId);
				}
				templateItemInContents = templateItemInContainer.html();						
				var templateItemInClasses = templateItemInContainer.attr('class');
			}
			
			$templateItemIn
			.addClass(templateItemInClasses) // add the templateItemIn classes
			.css({
				position: settings.positionType,
				marginLeft: 0,  // Set the margin to 0 because the templateItem was positioned in place
				top: mainOffset.top,
				left: templateItemLeftAbsolute,
			})
			.html(templateItemInContents); // Attach the contents to the target temp container
			
			var templateItemInImages = $templateItemIn.find('img'); // Check if there are images in the swapIn box 
			var count = 0;
			if (templateItemInImages.length && settings.preloadImages == true) {
				templateItemInImages.on('load', function() {
					count++;
			        if (count == templateItemInImages.length){
						$(document).trigger('ksLoadCallback'); // Trigger the ksLoad callback event
			        	ksMethods.ksSwapContent(settings, templateItemIn, $swapTrigger, mainOffset, templateItemLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap);
			        }
				});
			} else {
				$(document).trigger('ksLoadCallback'); // Trigger the ksLoad callback event
				ksMethods.ksSwapContent(settings, templateItemIn, $swapTrigger, mainOffset, templateItemLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap);
			}
		},
		// Swap the content
		ksSwapContent: function(settings, templateItemIn, $swapTrigger, mainOffset, templateItemLeftAbsolute, mainWidth, htmlId, bodyId, htmlClass, bodyClass, pageTitle, pageSwap) {
			var $templateItem = $(settings.templateItem), // redefine $templateItem variable
				templateItemId = $templateItem.attr('id'),
				$templateItemIn = $('#' + templateItemIn),
				templateItemInHeight = $templateItemIn.outerHeight(),
				templateItemInWidth = $templateItemIn.outerWidth(),
				templateItemHeight = $templateItem.outerHeight(),
				viewportHeight = $(window).outerHeight(),
				viewportWidth = $(window).outerWidth(),
				hash = $swapTrigger.prop('hash');

			clearTimeout(loadTimer);
			ksMethods.ksRemoveLoadBox();
			
			if (settings.direction) {
				$templateItemIn.css({width: mainWidth});
				
				var templateItemOutAnimProperties = {}, templateItemInAnimProperties = {};
				// Define animation value
				var templateItemOutAnimValue;
				switch (templateItemIn) {
					case 'ks-swap-box-in-b-pushstate':
				    case 'ks-swap-box-in-t':
						$templateItemIn.css('top', -templateItemInHeight * 2);
				    	templateItemOutAnimValue = viewportHeight * 3;
				    	break;
				    case 'ks-swap-box-in-t-pushstate':
				    case 'ks-swap-box-in-b':
						$templateItemIn.css('top', templateItemHeight * 1.5);
				    	templateItemOutAnimValue = -templateItemHeight * 1.5;
				    	break;
				    case 'ks-swap-box-in-r-pushstate':
				    case 'ks-swap-box-in-l':
						$templateItemIn.css('left', -viewportWidth);
				    	templateItemOutAnimValue = viewportWidth;
				    	break;
				    case 'ks-swap-box-in-l-pushstate':
				    case 'ks-swap-box-in-r':
						$templateItemIn.css('left', viewportWidth);
				    	templateItemOutAnimValue = -viewportWidth;
				    	break;
			        default:
						alert('Kool Swap Error: \n The templateItemIn class is in an undefined format: ' + templateItemIn + '.');
			        	return false;
			        	break;
				}
				
				switch (settings.direction) {
				    case 'left-to-right':
				    case 'right-to-left':
						var finalInDuration = settings.inDuration, 
							finalOutDuration = settings.outDuration;
						
						templateItemOutAnimProperties = {left: templateItemOutAnimValue};
						templateItemInAnimProperties = {left: templateItemLeftAbsolute};
						
						$templateItemIn.css('top', mainOffset.top);
						$('body') // Prevent horizontal scrollbars on animation
						.css({
							overflowX: 'hidden',
							overflowY: 'scroll',
						});
			        	break;
				    case 'top-to-bottom':
				    case 'bottom-to-top':
 
				    	
				    	var additionValue = (templateItemHeight * settings.inDuration / 1000);
				    	var finalVal = additionValue / 100;
						var finalInDuration = settings.inDuration + finalVal;
						var	finalOutDuration = settings.outDuration;
						
						templateItemInAnimProperties = {top: mainOffset.top};
						templateItemOutAnimProperties = {top: templateItemOutAnimValue};
						
						$('body').css('overflow-y', 'scroll'); // Prevent vertical scrollbars on animation
			        	break;
				}
				
				$templateItem
				.stop()
				.show()
				.animate(
					templateItemOutAnimProperties, finalOutDuration, settings.outEasing, function() {
	
						$(this).remove();
						if (pageSwap) {
					
								
		 		
							ksMethods.ksSwitchClasses(htmlId, bodyId, htmlClass, bodyClass, pageTitle);
						}
					});
 
				$templateItemIn
				.stop()
				.show()
				.animate(
					templateItemInAnimProperties, finalInDuration, settings.inEasing, function() {
						$(this)
						.css({display: '', left: '', marginLeft: '', position: '', top: '', width: '',}) // Reset all setted styles
						.attr('id', templateItemId) // Give the templateItem id back to the final animated templateItemIn
						.removeClass('ks-swap-box-in');					
						ksMethods.animationCallback(hash);
						ksMethods.ksCheckForSiblings(settings);
 
					});
 
			} else {
												 					hidemenu();
								$('.loader').fadeIn(10);
				$('.loader span').animate({width:'100%'} ,{queue:false,duration:700,easing:"swing"});	
				 $('footer').animate({ opacity:1}, 500);

					hideShare();
					hideprojectlist();
					
						$("html, body").animate({scrollTop: 0},{queue:false,duration:150,easing:"easeInOutQuad"});
 
				contanimhide();
 					var magnificPopup = $.magnificPopup.instance; 
					magnificPopup.close(); 
				$templateItem.delay(900)
				.animate({opacity: 0}, settings.outDuration, function() {
					$(this).remove(); // remove the $templateItem container
					if (pageSwap) {
						ksMethods.ksSwitchClasses(htmlId, bodyId, htmlClass, bodyClass, pageTitle);
					}
					$templateItemIn
					.css({display: '', left: '', marginLeft: '', opacity: 0, position: '', top: '', width: '',}) // Reset all setted styles
					.animate({opacity: 1}, settings.inDuration, function() {
						ksMethods.animationCallback(hash);
						ksMethods.ksCheckForSiblings(settings);
						$('.loader').fadeOut(10,function(){
								$('.loader span').animate({width:'0'},10);

							});
									
							contanimshow();
												
					})						
					.attr('id', templateItemId).removeClass('ks-swap-box-in');
				});
			}
		},
		animationCallback: function(hash) {
			if (hash) {
 
			}
		},
		ksCheckForSiblings: function(settings) {
			if (settings.bouncingBoxes) {
				$(document)
				.find(settings.bouncingBoxes)
					.animate({opacity: 1}, 1400, function() {
						ksMethods.templateCallback();
					});
			} else {
				ksMethods.templateCallback();
			}
		},
		ksSwitchClasses : function(htmlId, bodyId, htmlClass, bodyClass, pageTitle) {
			$('html, body').attr({ // remove ids and classes from html and body
				'class': '',
				'id' : '',
			}); 
			(htmlId ? $('html').attr('id', htmlId[1]) : ''); // Add IDs from the target page 
			(bodyId ? $('body').attr('id', bodyId[1]) : ''); // Add IDs from the target page 
			(htmlClass ? $('html').addClass(htmlClass[1]) : ''); // Add classes from the target page 
			(bodyClass ? $('body').addClass(bodyClass[1]) : ''); // Add classes from the target page 
			(pageTitle ? $('title').text(pageTitle[1]) : '');
		},
		ksCreateLoadBox: function() {
			if (!$('#ks-loading-box').length) {
				loadTimer = setTimeout(function() { // Show the loading box if the loadings of contents takes longer than 200ms
					$('html').append('<div id="ks-loading-box"><div class="ks-loading"></div></div>');
					$('#ks-loading-box').fadeIn('fast');
				}, 10);
			} else {
				ksMethods.ksRemoveLoadBox();
				ksMethods.ksCreateLoadBox();
			}
		},
		ksRemoveLoadBox: function() {
			$('#ks-loading-box').fadeOut('1000').remove();
		},
		templateCallback: function() {
			$('body').css({
//				overflowY: 'auto',
				overflowX: 'auto',				
			}); // Prevent scrollbars on animation
			$(document).trigger('templateCallback'); // Trigger the swap callback event
		},
	};
	
	$.templateCore = function(method) {
		if (ksPageSwap[method]) {
			return ksPageSwap[method].apply($(window), Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return ksPageSwap.init.apply($(window), arguments, false);
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.templateCore' );
		}    
	};
	
	$.fn.templateCore = function(method) {
		if (ksSelectorSwap[method]) {
			return ksSelectorSwap[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return ksSelectorSwap.init.apply(this, arguments);
		} else {
			$.error( 'Method ' + method + ' does not exist on jQuery.templateCore' );
		}    
	};
})( jQuery );

