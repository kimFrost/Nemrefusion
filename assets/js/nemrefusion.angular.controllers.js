;(function(window, document, undefined) {
	var Nemrefusion = new namespace("Nemrefusion");

	//window.scrollTo(0, 1);

	// Sticky Controller
	Nemrefusion.Angular.controller('StickyCtrl', ['$scope', '$element', function($scope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.css = ($scope.css === undefined) ? {} : $scope.css;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.originalOffsetTop = (function(){
			var el = $element[0];
			var offsets = el.getBoundingClientRect();
			return offsets.top + window.scrollY;
		})();
		$scope.data.originalOffsetLeft = (function(){
			var el = $element[0];
			var offsets = el.getBoundingClientRect();
			return offsets.left + window.scrollX;
		})();
		$scope.data.stickyTopPos = (function() {
			var value = $element.attr('data-sticky-topoffset');
			value = parseInt(value);
			if (isNaN(value)) value = 0;
			return value;
		})();

		// CSS
		$scope.css.top = "";
		$scope.css.left = "";


		// States
		$scope.states.sticky = false;

		/* Scope Functions
		===========================*/
		$scope.updateStickyStatus = function() {
			var _data = {};
			_data.windowScrollTop = window.scrollY;
			_data.diff = $scope.data.originalOffsetTop - _data.windowScrollTop - $scope.data.stickyTopPos;
			if (_data.diff < 0) {
				//if (_data.windowScrollTop > $scope.data.originalOffsetTop) {
				$scope.states.sticky = true;
				$scope.css.top = $scope.data.stickyTopPos.toString() + "px";
				//$scope.css.left = $scope.data.originalOffsetLeft.toString() + "px";
			}
			else {
				$scope.states.sticky = false;
				$scope.css.top = "";
				//$scope.css.left = "";
			}
			_data = null;
		};

		Nemrefusion.log($element.attr('class'));
		Nemrefusion.log($scope.data.originalOffsetTop);
		Nemrefusion.log($scope.data.stickyTopPos);

		/* Bindings
		===========================*/
		// Scroll
		angular.element(window).bind("scroll",function() {
			$scope.$apply(function(){
				$scope.updateStickyStatus();
			});
		});
		// Resize
		angular.element(window).bind("resize",function() {
			$scope.$apply(function() {
				$scope.data.originalOffsetTop = (function () {
					var el = $element[0];
					var offsets = el.getBoundingClientRect();
					return offsets.top + window.scrollY;
				})();
				$scope.updateStickyStatus();
			});
		});

		// Init functions
		$scope.updateStickyStatus();
	}]);





	// Foxhound Controller
	Nemrefusion.Angular.controller('FoxhoundCtrl', ['$scope', '$element', function($scope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data

		// States
		$scope.states.show = false;

		/* Scope Functions
		===========================*/
		$scope.toggleShow = function() {
			$scope.states.show = !$scope.states.show;
		};

		/* Bindings
		===========================*/

	}]);

























	// Splash Controller
	Nemrefusion.Angular.controller('DELETE_SplashCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.originalImgSrc = $element.attr('data-imgsrc');
		$scope.data.itemCss = {
			'background-image': 'url(' + $scope.data.originalImgSrc + ')'
		};

		// States

		/* Scope Functions
		===========================*/

		/* Bindings
		===========================*/
		$rootScope.$on('SplashSwitchImgSrc',function(event, data) {
			var src = "";
			if (data.src != undefined && data.src.length < 4) {
				src = $scope.data.originalImgSrc;
			}
			else {
				src = data.src;
			}
			$scope.data.itemCss = {
				'background-image': 'url('+ src +')'
			}
		});
	}]);


	// Pane Controller
	Nemrefusion.Angular.controller('DELETE_PaneCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.activepane = 1;

		// States

		/* Scope Functions
		===========================*/
		$scope.switchPane = function(id, imgSrc) {
			//Nemrefusion.log(id);
			if (id != undefined) {
				$scope.data.activepane = id;
			}
			if (imgSrc != undefined) {
				$rootScope.$broadcast('SplashSwitchImgSrc', {
					src: imgSrc
				});
			}
		};
		$scope.checkActive = function(id)  {
			if (id != undefined && id === $scope.data.activepane) {
				return true;
			}
			else {
				return false;
			}
		}
		/* Bindings
		 ===========================*/
	}]);


})(window, window.document);
