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
