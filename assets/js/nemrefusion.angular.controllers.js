;(function(window, document, undefined) {
	var Nemrefusion = new namespace("Nemrefusion");



	// Sticky Controller
	Nemrefusion.Angular.controller('StickyCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
		//$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.data = {};
		//$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.states = {};
		//$scope.css = ($scope.css === undefined) ? {} : $scope.css;
		$scope.css = {};
		$scope.childcss = {};
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.originalOffsetTop = (function(){
			var el = $element[0];
			var offsets = el.getBoundingClientRect();
			return offsets.top + (window.scrollY || window.pageYOffset);
		})();
		$scope.data.originalOffsetLeft = (function(){
			var el = $element[0];
			var offsets = el.getBoundingClientRect();
			return offsets.left + (window.scrollX || window.pageXOffset);
		})();
		$scope.data.stickyTopPos = (function() {
			var value = $element.attr('data-sticky-topoffset');
			value = parseInt(value);
			if (isNaN(value)) value = 0;
			return value;
		})();
		$scope.data.stickyFill = (function() {
			var value = $element.attr('data-sticky-fill');
			return Boolean(value);
		})();


		// CSS
		$scope.css.top = "";
		$scope.css.left = "";
		$scope.css.width = "inherit";
		$scope.css.height = "";
		$scope.childcss.height = "";

		/*
		if ($scope.data.stickyFill) {
			$scope.css.height = window.innerHeight - $element[0].getBoundingClientRect().top + "px";
			console.log(window.innerHeight);
			console.log($scope.css.height);
			console.log($element[0].getBoundingClientRect().top);
		}
		*/

		// States
		$scope.states.sticky = false;
		$scope.states.rendered = false;
		$scope.states.dataRead = false;
		$scope.states.showSearch = false;

		/* Scope Functions
		===========================*/
		$scope.updateStickyData = function() {
			$scope.states.rendered =  $scope.visible($element[0]);
			if ($scope.states.rendered && !$scope.states.dataRead) {
				$scope.data.originalOffsetTop = (function(){
					var el = $element[0];
					var offsets = el.getBoundingClientRect();
					return offsets.top + (window.scrollY || window.pageYOffset);
				})();
				$scope.data.originalOffsetLeft = (function(){
					var el = $element[0];
					var offsets = el.getBoundingClientRect();
					return offsets.left + (window.scrollX || window.pageXOffset);
				})();
				$scope.states.dataRead = true;

				var _data = {};

				_data.logContent = "";
				_data.logContent += "<p>visible: " + $scope.states.rendered + "</p>";
				_data.logContent += "<p>originalOffsetTop: " + $scope.data.originalOffsetTop + "</p>";
				_data.logContent += "<p>originalOffsetLeft: " + $scope.data.originalOffsetLeft + "</p>";
				//_data.logContent += "<p>window.scrollY: " + window.scrollY + "</p>";
				//_data.logContent += "<p>window.pageYOffset: " + window.pageYOffset + "</p>";
				//_data.logContent += "<p>getBoundingClientRect: " + $element[0].getBoundingClientRect().top + "</p>";

				$rootScope.$broadcast('devLog', {
					log: "Read",
					name: $scope.$id,
					content: _data.logContent
				});
			}
			else if ($scope.states.rendered && $scope.states.dataRead){
				if (!$scope.states.sticky) {
					$scope.data.originalOffsetTop = (function(){
						var el = $element[0];
						var offsets = el.getBoundingClientRect();
						return offsets.top + (window.scrollY || window.pageYOffset);
					})();
					$scope.data.originalOffsetLeft = (function(){
						var el = $element[0];
						var offsets = el.getBoundingClientRect();
						return offsets.left + (window.scrollX || window.pageXOffset);
					})();
				}
			}
		};
		$scope.updateStickyStatus = function() {
			$scope.updateStickyData();
			var _data = {};
			_data.windowScrollTop = (window.scrollY || window.pageYOffset);
			_data.diff = $scope.data.originalOffsetTop - _data.windowScrollTop - $scope.data.stickyTopPos;

			if (_data.diff <= 0 && $scope.states.rendered) {
				//if (_data.windowScrollTop > $scope.data.originalOffsetTop) {
				$scope.states.sticky = true;
				$scope.css.top = $scope.data.stickyTopPos.toString() + "px";
				//$scope.css.left = $scope.data.originalOffsetLeft.toString() + "px";

				_data.logContent = "";
				_data.logContent += "<p>:visible: " + $scope.states.rendered + "</p>";
				_data.logContent += "<p>windowScrollTop: " + _data.windowScrollTop + "</p>";
				_data.logContent += "<p>window.pageYOffset : " + window.pageYOffset  + "</p>";
				_data.logContent += "<p>data.originalOffsetTop: " + $scope.data.originalOffsetTop + "</p>";
				_data.logContent += "<p>data.stickyTopPos: " + $scope.data.stickyTopPos + "</p>";
				_data.logContent += "<p>Diff: " + _data.diff + "</p>";

				$rootScope.$broadcast('devLog', {
					log: true,
					name: $scope.$id,
					content: _data.logContent
				});
			}
			else {
				$scope.states.sticky = false;
				$scope.css.top = "";
				//$scope.css.left = "";

				_data.logContent = "";
				_data.logContent += "<p>visible: " + $scope.states.rendered + "</p>";
				_data.logContent += "<p>windowScrollTop: " + _data.windowScrollTop + "</p>";
				_data.logContent += "<p>window.pageYOffset : " + window.pageYOffset  + "</p>";
				_data.logContent += "<p>data.originalOffsetTop: " + $scope.data.originalOffsetTop + "</p>";
				_data.logContent += "<p>data.stickyTopPos: " + $scope.data.stickyTopPos + "</p>";
				_data.logContent += "<p>Diff: " + _data.diff + "</p>";

				$rootScope.$broadcast('devLog', {
					log: false,
					name: $scope.$id,
					content: _data.logContent
				});
			}
			if ($scope.data.stickyFill) {
				if ($element[0].getBoundingClientRect().top >= 0) {
					//$scope.css.height = window.innerHeight - $element[0].getBoundingClientRect().top + "px";
					$scope.childcss.height = window.innerHeight - $element[0].getBoundingClientRect().top + "px";
				}
			}
			_data = null;
		};
		$scope.visible = function(element) {
			if (element.offsetWidth > 0 && element.offsetHeight > 0) {
				return true;
			}
			else {
				return false;
			}
		};
		$scope.toggleMobileMenu = function(state) {
			state = (state === undefined) ? "toggle" : state;
			$rootScope.$broadcast('foxhound__toggleShow', {
				state: state
			});
		};
		$scope.toggleSearch = function(state) {
			state = (state === undefined) ? "toggle" : state;
			if (state === "toggle") {
				$scope.states.showSearch = !$scope.states.showSearch;
				$rootScope.$broadcast('overlay__toggleOverlay', {
					state: $scope.states.showSearch
				});
			}
			else {
				$scope.states.showSearch = state;
				$rootScope.$broadcast('overlay__toggleOverlay', {
					state: state
				});
			}
		};

		/* Bindings
		===========================*/
		// Scroll
		angular.element(window).bind("scroll",function() {
			//Nemrefusion.log("scroll");
			$scope.$apply(function(){
				$scope.updateStickyStatus();
			});
		});
		// Resize
		angular.element(window).bind("resize",function() {
			$scope.$apply(function() {
				$scope.updateStickyStatus();
			});
		});
		// Hide search event
		$rootScope.$on('stickyCtrlToggleSearch',function(event, data) {
			if (data != undefined && data.state != undefined) {
				$scope.toggleSearch(data.state);
			}
		});
		/*
		// Press ESC
		document.onkeydown = function(event) {
			event = event || window.event;
			if(event.which === 27) {
				$scope.$apply(function() {
					$scope.toggleSearch();
				});
			}
		};
		*/

		$scope.updateStickyStatus();
	}]);



	// Primmenu Controller
	Nemrefusion.Angular.controller('PrimmenuCtrl', ['$scope', '$element', '$rootScope', '$timeout', function($scope, $element, $rootScope, $timeout) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		$scope.css = ($scope.css === undefined) ? {} : $scope.css;

		// Options
		$scope.options.indicatorTimeReset = 500;

		// Data
		$scope.data.timerId = null;

		// States
		$scope.states.activemenu = "";
		$scope.states.showIndicator = false;

		// Indicator
		$scope.indicator = {
			options: {},
			data: {
				preSetPosition: null
			},
			states: {},
			css: {
				left: "0px"
			}
		};

		/*
		 -moz-transform: translate(0%, 0%);
		 -ms-transform: translate(0%, 0%);
		 -webkit-transform: translate(0%, 0%);
		 transform: translate(0%, 0%);
		 */

		/* Scope Functions
		===========================*/
		$scope.moveIndicator = function(left, preSetActive) {
			$timeout.cancel($scope.data.timerId);
			$scope.indicator.css.left = left.toString() + "px";
			if (!$scope.states.showIndicator) $scope.states.showIndicator = true;
			if (preSetActive === true) {
				$scope.indicator.data.preSetPosition = left;
			}
		};
		$scope.resetIndicator = function() {
			$scope.data.timerId = $timeout(function() {
				$scope.indicator.css.left = $scope.indicator.data.preSetPosition.toString()+"px";
			}, $scope.options.indicatorTimeReset);
		}
		$scope.lockIndicator = function() {
			//console.log("LOCK");
		};
		$scope.releaseIndicator = function() {
			//console.log("RELEASE");
		};


		/* Bindings
		===========================*/


	}]);


	// PrimmenuItem Controller
	Nemrefusion.Angular.controller('PrimmenuItemCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
		$scope.data = {};
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		$scope.css = ($scope.css === undefined) ? {} : $scope.css;
		// Options

		// Data
		$scope.data.leftPos = $element[0].getBoundingClientRect().left + ($element[0].getBoundingClientRect().width / 2) - $element[0].parentNode.getBoundingClientRect().left;
		$scope.data.preSetActive = $element.hasClass('primmenu__item--active');

		// States

		// Css



		/*
		 -moz-transform: translate(0%, 0%);
		 -ms-transform: translate(0%, 0%);
		 -webkit-transform: translate(0%, 0%);
		 transform: translate(0%, 0%);
		 */

		/* Scope Functions
		 ===========================*/

		/* Bindings
		 ===========================*/
		$element.bind('mouseenter', function()  {
			$scope.$apply(function() {
				$scope.data.leftPos = $element[0].getBoundingClientRect().left + ($element[0].getBoundingClientRect().width / 2) - $element[0].parentNode.getBoundingClientRect().left;
				$scope.moveIndicator($scope.data.leftPos);
			});
		});

		$element.bind('mouseleave', function()  {
			$scope.$apply(function() {
				$scope.resetIndicator();
			});
		});

		if ($scope.data.preSetActive) {
			$scope.moveIndicator($scope.data.leftPos, true);
		}

	}]);





	// Primmenu Controller
	Nemrefusion.Angular.controller('QnaCtrl', ['$scope', '$element', '$rootScope', '$timeout', function($scope, $element, $rootScope, $timeout) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		$scope.css = ($scope.css === undefined) ? {} : $scope.css;

		// Options

		// Data

		// States

		// Qna
		$scope.qna = {
			data: {
				activeId: null
			}
		};

		/* Scope Functions
		 ===========================*/
		$scope.checkActive = function(id) {
			if (id != undefined && id === $scope.qna.data.activeId) {
				return true;
			}
			else {
				return false;
			}
		};
		$scope.toggle = function(id) {
			if (id != undefined) {
				if (id === $scope.qna.data.activeId) {
					$scope.qna.data.activeId = null;
				}
				else {
					$scope.qna.data.activeId = id;
				}
			}
		}

		/* Bindings
		 ===========================*/

	}]);



	// Foxhound Controller
	Nemrefusion.Angular.controller('FoxhoundCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;

		// Foxhound
		$scope.foxhoundctrl = {
			options: {},
			data: {
				lastYPos: window.scrollY
			},
			states: {
				show: false
			},
			css: {}
		};

		// Options

		// Data

		// States

		/* Scope Functions
		===========================*/
		$scope.toggleShow = function(state) {
			state = (state === undefined) ? "toggle" : state;
			if (state === "toggle") {
				if ($scope.foxhoundctrl.states.show) {
					$scope.toggleShow('hide');
				}
				else {
					$scope.toggleShow('show');
				}
			}
			if (state === "hide") {
				$scope.foxhoundctrl.states.show = false;
				$scope.foxhoundctrl.data.lastYPos = (window.scrollY || window.pageYOffset);
			}
			if (state === "show") {
				$scope.foxhoundctrl.states.show = true;
			}
			$rootScope.$broadcast('scroll__toggleScroll', {
				state: state
			});
		};


		/* Bindings
		===========================*/
		// Scope Events
		$rootScope.$on('foxhound__toggleShow',function(event, data) {
			if (data != undefined && data.state != undefined) {
				$scope.toggleShow(data.state);
			}
		});
		// User Events
		$element.bind('scroll', function(event) {
			if (event.stopPropagation)    event.stopPropagation();
			if (event.cancelBubble!=null) event.cancelBubble = true;
			var child = $element.children();
			var scrollDistFromTop = $element[0].scrollTop;
			var scrollDistFromBottom = child[0].clientHeight - $element[0].scrollTop - $element[0].offsetHeight;

			if (scrollDistFromTop === 0 && scrollDistFromBottom === 0) {

			}
			else if (scrollDistFromTop === 0) {
				$element[0].scrollTop = 1;
			}
			else if (scrollDistFromBottom === 0) {
				$element[0].scrollTop = child[0].clientHeight - $element[0].offsetHeight - 1;
			}

			//console.log(child[0].clientHeight);
			//console.log($element[0].scrollTop);
			//console.log($element[0].clientHeight);
			//console.log($element[0].offsetHeight);
			//console.log(window.innerHeight);

			// Child height


			// Posisition scrollbar always at least 1px from bottom and 1px from top to prevent escape scroll on window container

			// 552 938 998

		});
		angular.element(window).bind('scroll', function(event) {
			if ($scope.foxhoundctrl.states.show) {
				window.scrollTo(0, $scope.foxhoundctrl.data.lastYPos);
			}
		});
	}]);



	// Scroll Controller (For disable scroll with overflow hidden)
	Nemrefusion.Angular.controller('ScrollCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {

		$scope.scrollctrl = {
			options: {},
			data: {
				lastYPos: window.scrollY
			},
			states: {
				disable: false
			},
			css: {}
		};


		/* Scope Functions
		 ===========================*/
		/*
		$scope.toggleScroll = function(state) {
			state = (state === undefined) ? "toggle" : state;

			if (state === "toggle") {
				if ($scope.css.overflow != "hidden") {
					$scope.css.overflow = "hidden";
					$scope.css.height = "100%";
				}
				else {
					$scope.css.overflow = null;
					$scope.css.height = null;
				}
			}
			if (state === "hide") {
				$scope.css.overflow = "hidden";
				$scope.css.height = "100%";
			}
			if (state === "show") {
				$scope.css.overflow = null;
				$scope.css.height = null;
			}
		};
		*/


		$scope.toggleScroll = function(state) {
			state = (state === undefined) ? "toggle" : state;
			if (state === "toggle") {
				if ($scope.scrollctrl.states.disable) {
					state = "show";
				}
				else {
					state = "hide";
				}
			}
			if (state === "hide") {
				$scope.scrollctrl.states.disable = true;
				$scope.scrollctrl.data.lastYPos = (window.scrollY || window.pageYOffset);
				$scope.scrollctrl.css.height = "100%";
				$scope.scrollctrl.css.overflow = "hidden";
				console.log($scope.scrollctrl);

			}
			if (state === "show") {
				$scope.scrollctrl.states.disable = false;
				$scope.scrollctrl.css.height = "";
				$scope.scrollctrl.css.overflow = "";
			}
		};

		/* Bindings
		 ===========================*/
		// Scope Events
		$rootScope.$on('scroll__toggleScroll',function(event, data) {
			if (data != undefined && data.state != undefined) {
				//$scope.toggleScroll(data.state);
			}
		});
		// User Events
		angular.element(window).bind('scroll', function(event) {
			/*
			console.log($scope.states.disable);
			if ($scope.states.disable) {
				event.preventDefault();
				window.scrollTo(0, $scope.data.lastYPos);
			}
			else {
				$scope.data.lastYPos = window.scrollY;
			}
			*/
		});

	}]);


	// Scroll Controller (For disable scroll with overflow hidden)
	Nemrefusion.Angular.controller('mobilemenuCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {

		$scope.mobilemenuctrl = {
			options: {},
			data: {
				activelist: []
			},
			states: {},
			css: {}
		};

		/* Scope Functions
		===========================*/
		$scope.toggleSubItems = function(id, state) {
			state = (state === undefined) ? "toggle" : state;
			if (id != undefined) {
				var found = false;
				for (var i=0;i<$scope.mobilemenuctrl.data.activelist.length; i++) {
					var itemid = $scope.mobilemenuctrl.data.activelist[i];
					if (itemid === id) {
						$scope.mobilemenuctrl.data.activelist.splice(i,1);
						found = true;
					}
				}
				if (!found) {
					$scope.mobilemenuctrl.data.activelist.push(id);
				}
			}
		};
		$scope.check = function(id) {
			if (id != undefined) {
				if ($scope.mobilemenuctrl.data.activelist.indexOf(id) != -1) {
					return true;
				}
				else {
					return false;
				}
			}
		};


		/* Bindings
		===========================*/
		// Scope Events

		// User Events

	}]);


	// Scroll Controller (For disable scroll with overflow hidden)
	Nemrefusion.Angular.controller('overlayCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
		$scope.data = {};
		$scope.states = {};
		$scope.css = {};
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data

		// States
		$scope.states.show = false;

		// CSS


		/* Scope Functions
		 ===========================*/
		$scope.toggleOverlay = function(state) {
			state = (state === undefined) ? "toggle" : state;
			if (state === "toggle") {
				$scope.states.show = !$scope.states.show;
			}
			else {
				$scope.states.show = state;
			}
		};

		/* Bindings
		 ===========================*/
		// Scope Events
		$rootScope.$on('overlay__toggleOverlay',function(event, data) {
			if (data != undefined && data.state != undefined) {
				$scope.toggleOverlay(data.state);
			}
		});
		// User Events
		$element.bind('click', function(){
			$rootScope.$broadcast('stickyCtrlToggleSearch', {
				state: false
			});
		});

	}]);



	// Dev Controller
	Nemrefusion.Angular.controller('devCtrl', ['$scope', '$element', '$rootScope', '$sce', function($scope, $element, $rootScope, $sce) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.logList = [];
		$scope.data.logContent = "";
		$scope.data.logActiveId = null;
		$scope.data.idCounter = 0;

		// States
		$scope.states.logShow = false;

		/* Scope Functions
		===========================*/
		$scope.showLog = function(id) {
			if (id != undefined) {
				var html = "<p>NOT FOUND</p>";
				for (var i=0;i<$scope.data.logList.length;i++) {
					var log = $scope.data.logList[i];
					if (log != undefined) {
						if (id === log.id) {
							html = log.content;
						}
					}
				}
				$scope.data.logActiveId = id;
				$scope.data.logContent = $scope.trustHtml(html);
				$scope.states.logShow = true;
			}
		};
		$scope.hideLog = function() {
			$scope.data.logActiveId = null;
			$scope.states.logShow = false;
		};
		$scope.trustHtml = function(html) {
			return $sce.trustAsHtml(html);
		};
		$scope.trustSrc = function(src) {
			return $sce.trustAsResourceUrl(src);
		};
		$scope.trimList = function(array) {
			var list = array;
			var newList = [];
			if (list != undefined && list.length > 10) {
				newList = list.slice(list.length-11, -1);
			}
			else {
				newList = array;
			}
			return newList;
		};

		/* Bindings
		===========================*/
		$rootScope.$on('devLog',function(event, data) {
			if (data != undefined) {
				$scope.data.logList = $scope.trimList($scope.data.logList);
				$scope.data.logList.unshift({
					content: $scope.data.idCounter.toString() + data.content,
					name: data.name,
					log: data.log,
					id: $scope.data.idCounter
				});
				$scope.data.idCounter++;
			}
		});

	}]);





})(window, window.document);
