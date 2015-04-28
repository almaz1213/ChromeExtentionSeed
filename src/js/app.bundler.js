(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
require('./module/');
var hydra = angular.module(
	'hydra', ['module']
);
hydra.config([
	function () {
		console.log('app config');
	}
]);
hydra.run([
	'$rootScope',
	'service.user',
	function ($rootScope,svrUser) {
		console.log('run');
		svrUser.test();
	}
]);

},{"./module/":2}],2:[function(require,module,exports){
require('./user/');
angular.module(
	'module',['module.user']
);

},{"./user/":4}],3:[function(require,module,exports){
module.exports = [
	'$scope',
	'service.user',
	function($scope, userSvr) {
		$scope.foo = function() {
			userSvr.test();
		};
	}
];

},{}],4:[function(require,module,exports){
angular.module(
	'module.user',[]
).controller(
	'controller.user.info',require('./controller/info')
).factory(
	'service.user',require('./service')
);

},{"./controller/info":3,"./service":5}],5:[function(require,module,exports){
module.exports = [
	'$http',
	function($http) {
		var service = {
			test: function() {
				console.log('this is user service');
			}
		};
		return service;
	}
];

},{}]},{},[1])


//# sourceMappingURL=app.bundler.js.map