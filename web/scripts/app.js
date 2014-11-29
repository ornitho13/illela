var illelaApp = angular.module('illelaApp', [
	'ngRoute',
	'veloController'
]);

illelaApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/velo', {
			templateUrl: 'views/velo.html',
			controller: 'veloListDetail'
			
		});
	}
]);