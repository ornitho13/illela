/**
 * EasJs - Javascript library by Jerome DEBRAY http://www.debray-jerome.fr
 */
;document.createElement("article");
document.createElement("aside");
document.createElement("footer");
document.createElement("header");
document.createElement("nav");
document.createElement("section");
document.createElement("figure");
document.createElement("figcaption");
document.createElement("hgroup");
;var EasJs = {
	readyStatus : false,
	readyIncrement : 0,
	eventCallback : 'EasLoaded',
	eventCallbackSend : false,
    browsers : {
        ie : false,
        webkit : false,
        opera : false,
        firefox : false,
        version : false
    },
    isTouchDevice : false,
	alwaysCaching : true,
	_touchEventInitialize : [],
	headTag : null,
	init : function() {
		this.headTag = document.getElementsByTagName('head')[0];
		//add class for IE
		var touchDevice = ' no-touch', div, version = 'ie ', isIe9;
		if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
			touchDevice = ' touch';
			this.isTouchDevice = true;
		}
		if (typeof window.head === 'undefined') {
			if (document.all ) {
				this.browsers.ie = true;
				if (!document.querySelector) { // IE6 et IE 7
					if (window.XMLHttpRequest) {
						this.browsers.version = 7;
						version += 'ie-7 no-box-sizing';
					} else {
						this.browsers.version = 6;
						version += 'ie-6 no-box-sizing';
					}
				} else {
					if (!document.addEventListener) { //IE8
						this.browsers.version = 8;
						version += 'ie-8';
					} else { //IE 9 et 10
						if (window.atob) {
							version +='ie-10';
						} else {
							version +='ie-9';
						}
					}
				}
			} else {
				if (!!window.MSStream) {
					version += 'ie-11';
				} else {
					version = 'no-ie ';
				}
				if (!!window.opera) {
					this.browsers.opera = true;
					version += 'opera';
				} else if (typeof document.mozCancelFullScreen !== "undefined") {
					this.browsers.firefox = true;
					version += 'firefox';
				} else if ((!!window.chrome)){
					this.browsers.webkit = true;
					version += 'webkit';
				}
			}
			
			document.getElementsByTagName('html')[0].className = version + touchDevice;
		}
	},
	loadCSS : function(styles, event){
		var elt = null, $this = this;
		if (event === 'load') {
			elt = window;
		} else {
			event = 'ready';
			elt = document;
		}
		if (event === 'ready') {
			this._loadCSS(styles);
		} else {
			this.addEvent(elt, event, function(){
				$this._loadCSS(styles);
			});
		}
		return this;
	},
	_loadCSS : function(styles) {
		var styleTag;
		if (styles.length >= 1) {
			styleTag = document.createElement('link');
			styleTag.href = styles[0];
			styleTag.rel = 'stylesheet';
			this.headTag.insertBefore(styleTag, this.headTag.getElementsByTagName('script')[0]);
			styles.splice(0,1);
			this.loadCSS(styles);
		}
	},
	loadJs : function (scripts, callback, event, eventCallback, alwaysCache) {
		alwaysCache = alwaysCache === undefined ? true : alwaysCache;
		var elt = null, $this = this;
		if (event === 'load') {
			elt = window;
		} else {
			event = 'ready';
			elt = document;
			eventCallback = 'load';
		}

		this.eventCallback = eventCallBack = (eventCallback === undefined ? 'EasLoaded' : eventCallback);
		if (event === 'ready') {
			$this.readyStatus = true;
			$this._loadJs(scripts, callback, alwaysCache, eventCallback);
		} else {
			this.addEvent(elt, event, function(){
				$this._loadJs(scripts, callback, alwaysCache, eventCallback);
			});
		}
		
	},
	_loadJs : function(scripts, callback, alwaysCache, eventCallback) {
		var $this = this, scriptTag, asyncTouch;
		if (scripts.length >= 1) {
			scriptTag = document.createElement('script');
			if (typeof scripts[0].src != 'undefined') {
				scriptTag.src = scripts[0].src + (alwaysCache === true ? '' : '?_' + (new Date().getTime()));				
			} else {
				scriptTag.src = scripts[0] + (alwaysCache === true ? '' : '?_' + (new Date().getTime()));
			}
			if (typeof scripts[0].async != 'undefined' && scripts[0].async === true) {
				this.readyIncrement++;
				scriptTag.async = true;
			}
			scriptTag.type = 'text/javascript';
			this.headTag.appendChild(scriptTag);
			asyncTouch = scripts[0].async || false;
			if (scriptTag.attachEvent) {
				scriptTag.onreadystatechange = function(){
					if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
						if (asyncTouch === true) {
							$this.readyIncrement--;
						} else {
							scripts.splice(0,1);
							$this._loadJs(scripts, callback, alwaysCache, eventCallback);
						}
					}
				};
			} else {
				scriptTag.onload = function(){
					if (asyncTouch === true) {
						$this.readyIncrement--;
					} else {
						scripts.splice(0,1);
						$this._loadJs(scripts, callback, alwaysCache, eventCallback);
					}
				};
				
			}
			if (typeof scripts[0].async != 'undefined' && scripts[0].async === true) {
				scripts.splice(0,1);
				this._loadJs(scripts, callback, alwaysCache, eventCallback);
			}
		} else {
			function testScript() {
				if ($this.readyIncrement > 0) {
					setTimeout(function(){
						testScript();
					}, 9);
				} else {
					if (typeof callback != 'undefined') {
						callback();
					}
					if (typeof eventCallback != 'undefined') {
						$this.fireEvent(window, eventCallback);
						$this.eventCallbackSend = true;
					}
				}
			}
			testScript();
		}
	},
	events : [],
	addEvent : function(element, event, callback) {
		if (element !== null) {
			if(element.addEventListener){
				element.addEventListener(event,callback,false);
			}else if(element.attachEvent) {
				element.attachEvent('on'+event,callback);
				this.events[event] = this.events[event] || [];
				if(this.events[event]) this.events[event].push(callback);
			}else{
				element['on'+event]=callback;
			}
		}
	},
	fireEvent : function(element, eventName){
		var evt, listeners;
	    if(document.createEvent){
	    	evt = document.createEvent('HTMLEvents');
	    	evt.initEvent(eventName,true,true);
	    }else if(document.createEventObject){// IE < 9
	    	evt = document.createEventObject();
	    	evt.eventType = eventName;
	    }
	    evt.eventName = eventName;
	    if(element.dispatchEvent){
	    	element.dispatchEvent(evt);
	    }else if(element.fireEvent ) { 
	    	element.fireEvent('on'+evt.eventType,evt);
	    } else {
	    	if(this.events[eventName]){
				listeners = this.events[eventName],len = listeners.length;
				while(len--){ listeners[len](this);	}		
			}
	    }
	},
	data : function($elt, key, value){
		if (value === undefined) {
			if ($elt.jquery !== undefined) {
				return $($elt).attr('data-' + key);
			} else if (typeof $elt === 'string') {
				return $($elt).attr('data-' + key);
			} else {
				return $elt.dataset[key];
			}
		} else {
			if ($elt.jquery !== undefined) {
				$($elt).attr('data-' + key, value);
			} else if (typeof $elt === 'string') {
				$($elt).attr('data-' + key, value);
			} else {
				$elt.dataset[key] = value;
			}
			return this;
		}
	},
	inject : function(scripts, callback, eventCallback, alwaysCache) {
		alwaysCache  = alwaysCache === undefined ? true : alwaysCache;
		this._loadJs(scripts, callback, alwaysCache, eventCallback);
	},
	/**
	 * be careful about document.write script style, 
	 * it won't work at all !
	 **/
	insertScriptInDom : function(script, dom, callback) {
		var scriptTag = document.createElement('script');
		scriptTag.src = script;
		scriptTag.type = 'text/javascript';
		scriptTag.async = true;
		if (typeof callback != 'undefined') {
			scriptTag.onload = callback;
		}
		dom.appendChild(scriptTag);
	},
	lazyLoadImage : function(elt, event, scroll) {
		var $this = this;
		if (typeof event == 'undefined') {
			event = $this.eventCallback;
		}
		if (typeof scroll == 'undefined') {
			scroll = true;
		}
		this.addEvent(window, event, function(){
			if (typeof jQuery == 'undefined') {
				if (console.log) {
					console.log('EasJs.lazyloadImage : you need jQuery library to use this feature');
				} else {
					alert('EasJs.lazyloadImage : you need jQuery library to use this feature');
				}
				return false;
			}
			$(elt).each(function(){
				//get original src
				//get screen height
				var originalSrc = $(this).data('original'), img = $(this), 
					screenHeight = $(window).height(), 
					imgPosition = $(this).offset(), 
					loaded = false,
					htmlBodyTop;
				$(this).css('opacity', 0);
				
				if ((EasJs.browsers.ie && parseInt(EasJs.browsers.version, 10) <= 8) || scroll === false) {
					img.attr('src', originalSrc).animate({
						opacity : 1
					}, 'slow');
					loaded = true;
				} else {
					htmlBodyTop = $(document).scrollTop() + screenHeight;
					if (imgPosition.top <= htmlBodyTop) {
						//on charge la page 
						img.attr('src', originalSrc).animate({
							opacity : 1
						}, 'slow');
						loaded = true;
					}
					$(document).scroll(function(){
						if (loaded === false) {
							htmlBodyTop = $(this).scrollTop() + screenHeight;
							imgPosition = img.offset();
							if (imgPosition.top <= htmlBodyTop) {
								//on charge la page 
								img.attr('src', originalSrc).animate({
									opacity : 1
								}, 'slow');
								loaded = true;
							}
						}
					});
				}
			});
		});
		
		return this;
	},
	fullScreen : function($elt){
		if (document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen) {
			if (typeof $elt['cancelFullScreen'] !== 'undefined') {
				$elt.cancelFullScreen();	
			} else if (typeof $elt['webkitCancelFullScreen'] !== 'undefined') {
				$elt.webkitCancelFullScreen(); 
			} else if (typeof $elt['mozCancelFullScreen'] !== 'undefined') {
				$elt.mozCancelFullScreen();
			}
		} else {
			if (typeof $elt['requestFullScreen'] !== 'undefined') {
				$elt.requestFullScreen();	
			} else if (typeof $elt['webkitRequestFullScreen'] !== 'undefined') {
				$elt.webkitRequestFullScreen(); 
			} else if (typeof $elt['mozRequestFullScreen'] !== 'undefined') {
				$elt.mozRequestFullScreen();
			}
		}
	},
	scrollTo : function(initialPosition, $elt, duration, callback) {
		if (typeof jQuery == 'undefined') {
			if (console.log) {
				console.log('EasJs.scrollTo : you need jQuery library to use this feature');
			} else {
				alert('EasJs.scrollTo : you need jQuery library to use this feature');
			}
			return false;
		}
		var offset = {top : 0, left : 0};
		if (duration === undefined) {
			duration = 500;
		}
		if (initialPosition === undefined) {
			initialPosition = 0;
		}
		if ($elt !== undefined) {
			offset = $($elt).offset();
		}
		if ($('html, body').queue().length > 1) {
			$('html, body').queue(function(){
				$(this).dequeue();
			});
		}
		$('html, body').animate({
			scrollTop: offset.top - initialPosition 
		}, duration, function(){
			if (typeof callback === 'function') {
				callback();
			}
		});
			
		return false;
	},
	parseJSON : function(data, reviser) {
		data = $.trim(data);
		if ( window.JSON && window.JSON.parse ) {
	        return window.JSON.parse(data, reviser);
	    } else {
	    	//use existing cross browser JSON library
	    	throw new Error('JSON.parse no native support');
	    }
	},
	stringify : function(value, replacer, space){
		if ( window.JSON && window.JSON.stringify ) {
	        return window.JSON.stringify(value, replacer, space );
	    } else {
	    	//use existing cross browser JSON library
	    	throw new Error('JSON.stringify no native support');	
	    }
	},
	/**
	 * touch event available :
	 * - tap
	 * - doubleTap
	 * - swipeLeft
	 * - swipeRight
	 * - swipeUp
	 * - swipeDown
	 * - pinchIn
	 * - pinchOut
	 * @param event
	 * @param elt
	 * @param callback
	 */
	on : function(event, elt, callback) {
		if (typeof jQuery == 'undefined') {
			if (console.log) {
				console.log('EasJs.on : you need jQuery library to use Special touchEvent feature');
			} else {
				alert('EasJs.on : you need jQuery library to use Special touchEvent feature');
			}
			return false;
		}
		if (typeof this._touchEventInitialize[elt.selector] === "undefined") {
			this._touchEventInitialize[elt.selector] = true;
			this._initTouchEvent(elt);
		}
		elt.on(event, callback);
	},
	_initTouchEvent : function(elt){
		var moved = false,
		startX = 0,
		startY = 0,
		arrayCoord = new Array(),
		nbFingersEngaged = 0,
		tapTimeStart = null,
		tapTimeEnd = null,
		tapNumber = 1,
		uidTimerTap = null;
		//var uidTimerPress = null;
		elt.on('touchstart', function(event){
			//var $this = $(this);
			var touch, i;
			moved = false;
			event.preventDefault();
			event = event.originalEvent;
			startX = event.touches[0].pageX;
			startY = event.touches[0].pageY;
			nbFingersEngaged = event.targetTouches.length;
			if (nbFingersEngaged === 1) {
				if (uidTimerTap !== null) {
					clearTimeout(uidTimerTap);
					tapNumber++;
				}
				/*if (uidTimerPress === null) {
					uidTimerPress = setTimeout(function(){
						clearTimeout(uidTimerTap);
						tapNumber = 0;
						$this.trigger('press');
					}, 1000);
				}*/
				tapTimeStart = new Date();
				tapTimeStart = tapTimeStart.getTime();
			} else if (nbFingersEngaged >= 2){
				for (i = 0; i < event.targetTouches.length; i++) {
				    touch = event.targetTouches[i];
				    arrayCoord[i] = {pageX : touch.pageX, pageY : touch.pageY};
				}
			}
		});
		elt.on('touchmove', function(event){
			var touch, i;
			event.preventDefault();
			event = event.originalEvent;
			if (Math.abs(event.touches[0].clientX - startX) > 10 ||
		        Math.abs(event.touches[0].clientY - startY) > 10) {
		            moved = true;
		    }
			for (i = 0; i < event.targetTouches.length; i++) {
			    touch = event.targetTouches[i];
			    arrayCoord[i] = {pageX : touch.pageX, pageY : touch.pageY};
			}
		});
		elt.on('touchend', function(event){
			tapTimeEnd = new Date();
			tapTimeEnd = tapTimeEnd.getTime();
			event.preventDefault();
			event = event.originalEvent;
			/*if (uidTimerPress !== null) {
				clearTimeout(uidTimerPress);
				uidTimerPress = null;
			}*/
			if (tapTimeEnd - tapTimeStart < 120) {
				var $this = $(this);
				uidTimerTap = setTimeout(function(){
					if (tapNumber === 1) {
						tapNumber = 0;
						tapTimeStart = null;
						tapTimeEnd = null;
						$this.trigger('tap');
					} else {
						tapNumber = 0;
						tapTimeStart = null;
						tapTimeEnd = null;
						$this.trigger('doubleTap');
					}
				}, 150);
			} else {
				tapNumber = 0;
				tapTimeStart = null;
				tapTimeEnd = null;
			
				if (nbFingersEngaged === 1) {
					if (moved) {
						if (event.changedTouches[0].pageX - startX > 100 &&
							event.changedTouches[0].pageY - startY < 50) {
							$(this).trigger('swipeRight');
						} else if (event.changedTouches[0].pageX - startX < -100 &&
							event.changedTouches[0].pageY - startY < 50) {
							$(this).trigger('swipeLeft');
						} else if (event.changedTouches[0].pageX - startX < 50 &&
							event.changedTouches[0].pageY - startY > 100){
							$(this).trigger('swipeDown');
						} else if (event.changedTouches[0].pageX - startX < 50 &&
							event.changedTouches[0].pageY - startY < -100) {
							$(this).trigger('swipeUp');
						}
					}
					
					
				} else if (nbFingersEngaged === 2) {
					if (moved) {
						if (Math.abs(arrayCoord[0].pageX - arrayCoord[1].pageX) < 100 &&
							Math.abs(arrayCoord[0].pageY - arrayCoord[1].pageY) < 100) {
							$(this).trigger('pinchIn');
						} else if(Math.abs(arrayCoord[0].pageX - arrayCoord[1].pageX) > 100 &&
							Math.abs(arrayCoord[0].pageY - arrayCoord[1].pageY) > 100) {
							$(this).trigger('pinchOut');
						}
					}
				}
			}
		});
		elt.on('touchcancel', function(){
			event.preventDefault();
			moved = false;
			startX = 0;
			startY = 0;
			arrayCoord = new Array();
			nbFingersEngaged = 0;
			tapTimeStart = null;
			tapTimeEnd = null;
		});
	}, 
	test : function(testInstruction, successCallback, failedCallback) {
		if ((testInstruction)) {
			successCallback();
		} else {
			failedCallback();
		}
	},
	feature : function(feature, callback){
		this[feature] = callback();
	}
};
if (typeof window.EasJs === "undefined") {
	window.EasJs = EasJs;
}
EasJs.init();