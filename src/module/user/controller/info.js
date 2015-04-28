module.exports = [
	'$scope',
	'service.user',
	function($scope, userSvr) {
		$scope.foo = function() {
			userSvr.test();
		};
	}
];
