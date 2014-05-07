;(function(window, document, undefined) {
	var Nemrefusion = new namespace("Nemrefusion");

	// Sticky Controller
	Nemrefusion.Angular.controller('StickyCtrl', ['$scope', '$element', function($scope, $element) {
		$scope.data = ($scope.data === undefined) ? {} : $scope.data;
		$scope.states = ($scope.states === undefined) ? {} : $scope.states;
		$scope.options = ($scope.options === undefined) ? {} : $scope.options;
		// Options

		// Data
		$scope.data.originalOffsetTop = $element[0].offsetTop;

		// States
		$scope.states.sticky = false;

		/* Scope Functions
		===========================*/

		/* Bindings
		===========================*/
		angular.element(window).bind("scroll",function() {
			$scope.$apply(function(){
				var _data = {};

				_data.windowScrollTop = window.scrollY;

				//Nemrefusion.log("Scroll");
				//Nemrefusion.log(_data.windowScrollTop);
				//Nemrefusion.log($scope.data.originalOffsetTop);

				if (_data.windowScrollTop > $scope.data.originalOffsetTop) {
					$scope.states.sticky = true;
					Nemrefusion.log(true);
				}
				else {
					$scope.states.sticky = false;
					Nemrefusion.log(false);
				}

				/*
				 var partialElem = $scope.data.sticky.parent.elem,
				 windowTop = $(window).scrollTop(),
				 partialTop = partialElem.offset().top,
				 partialBottom = partialTop + partialElem.height();

				 if (windowTop > partialTop && windowTop < partialBottom) {
				 $element.css('top', windowTop - partialTop);
				 }
				 else if (windowTop < partialTop) {
				 $element.css('top', '');
				 }
				 else if (windowTop > partialBottom) {
				 $element.css('top', partialBottom - partialTop);
				 }
				*/
				_data = null;
			});
		});

	}]);



	// Splash Controller
	Nemrefusion.Angular.controller('SplashCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
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
	Nemrefusion.Angular.controller('PaneCtrl', ['$scope', '$rootScope', '$element', function($scope, $rootScope, $element) {
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
