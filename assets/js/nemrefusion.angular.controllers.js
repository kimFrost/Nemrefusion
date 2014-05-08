;(function(window, document, undefined) {
	var Nemrefusion = new namespace("Nemrefusion");

	// Sticky Controller
	Nemrefusion.Angular.controller('StickyCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
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
		$scope.css.width = "inherit";

		// States
		$scope.states.sticky = false;

		/* Scope Functions
		===========================*/
		$scope.updateStickyStatus = function() {
			var _data = {};
			_data.windowScrollTop = window.scrollY;
			_data.diff = $scope.data.originalOffsetTop - _data.windowScrollTop - $scope.data.stickyTopPos;
			if (_data.diff <= 0) {
				//if (_data.windowScrollTop > $scope.data.originalOffsetTop) {
				$scope.states.sticky = true;
				$scope.css.top = $scope.data.stickyTopPos.toString() + "px";
				//$scope.css.left = $scope.data.originalOffsetLeft.toString() + "px";

				_data.logContent = "";
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
			_data = null;
		};

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
			// still an issue on portrait change.. Aside positions wrong place above header, because of scale
			/*
			$scope.$apply(function() {
				$scope.data.originalOffsetTop = (function () {
					var el = $element[0];
					var offsets = el.getBoundingClientRect();
					return offsets.top + window.scrollY;
				})();
				$scope.updateStickyStatus();
			});
			*/
		});
		window.onload = function() {
			setTimeout(function() {
			},50);
		};

		window.addEventListener('DOMContentLoaded', function () {
			$scope.$apply(function(){
				var _data = {};
				_data.windowScrollTop = window.scrollY;
				_data.diff = $scope.data.originalOffsetTop - _data.windowScrollTop - $scope.data.stickyTopPos;

				_data.logContent = "";
				_data.logContent += "<p>window.scrollTop: " + window.scrollTop + "</p>";
				_data.logContent += "<p>document.body.scrollTop: " + document.body.scrollTop + "</p>";
				_data.logContent += "<p>window.scrollY: " + _data.windowScrollTop + "</p>";
				_data.logContent += "<p>window.pageYOffset : " + window.pageYOffset  + "</p>";
				_data.logContent += "<p>data.originalOffsetTop: " + $scope.data.originalOffsetTop + "</p>";
				_data.logContent += "<p>data.stickyTopPos: " + $scope.data.stickyTopPos + "</p>";
				_data.logContent += "<p>Diff: " + _data.diff + "</p>";

				$rootScope.$broadcast('devLog', {
					log: "DomLoad",
					name: $scope.$id,
					content: _data.logContent
				});
			});
		}, false);



		// Init functions
		//$scope.updateStickyStatus();
	}]);





	// Foxhound Controller
	Nemrefusion.Angular.controller('FoxhoundCtrl', ['$scope', '$element', '$rootScope', function($scope, $element, $rootScope) {
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
