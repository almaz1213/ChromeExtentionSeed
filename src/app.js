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
