var illelaApp = angular.module('illelaApp', [
	'ngRoute',
	'transportController'
]);

illelaApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.when('/velo', {
			templateUrl: 'views/velo.html',
			controller: 'veloListDetail'
			
		}).when('/metro', {
			templateUrl: 'views/metro.html',
			controller: 'metroListDetail'
			
		}).when('/metro/nextdepartures/:id', {
			templateUrl: 'views/metroNextdepartures.html',
			controller: 'metroNextDepartures'
			
		});
	}
]);
