var transportController = angular.module('transportController', []);

transportController.controller('veloListDetail', ['$scope', '$http',
	function ($scope, $http) {
		$scope.displayState = ' hidden';
		$http.get('http://127.0.0.1/illela/web/velo').success(function(response){
			$scope.stations = response.opendata.answer.data.station;
		});
		$(document.getElementById('bike-station')).on('change', function(){
			$http.get('http://127.0.0.1/illela/web/velo/' + this.value).success(function(response){
				$scope.result = response.opendata.answer.data.station;
				$scope.result.status = parseInt($scope.result.state, 10) === 1 ? 'check' : 'close';
				$scope.displayState = '';
				// add metro station if available
				$http.get('http://127.0.0.1/illela/web/metro/proximity?lat=' + $scope.result.latitude + '&long=' + $scope.result.longitude).success(function(data) {
					$scope.metros = data.opendata.answer.data.station;
				});
			});
			
		});
	}
]);
transportController.controller('metroNextDepartures', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('http://127.0.0.1/illela/web/metro/' + $routeParams.id).success(function(response){
		var result = response.opendata.answer.data.station;
		$scope.station = {};
		$scope.station.name = result.name;
		$http.get('http://127.0.0.1/illela/web/metro/nextdepartures/' + $routeParams.id).success(function(response){
			var result = response.opendata.answer.data.station;
			result.nextTrain1Platform1 = /\d{4}\-\d{2}\-\d{2}T(\d{2}:\d{2}:\d{2})\+\d{2}:\d{2}/.exec(result.nextTrain1Platform1)[1];
			result.nextTrain1Platform2 = /\d{4}\-\d{2}\-\d{2}T(\d{2}:\d{2}:\d{2})\+\d{2}:\d{2}/.exec(result.nextTrain1Platform2)[1];
			result.nextTrain2Platform1 = /\d{4}\-\d{2}\-\d{2}T(\d{2}:\d{2}:\d{2})\+\d{2}:\d{2}/.exec(result.nextTrain2Platform1)[1];
			result.nextTrain2Platform2 = /\d{4}\-\d{2}\-\d{2}T(\d{2}:\d{2}:\d{2})\+\d{2}:\d{2}/.exec(result.nextTrain2Platform2)[1];

			$scope.station.depart = result;
		});
	});
}]);

transportController.controller('metroListDetail', ['$scope', '$http',
	function ($scope, $http) {
		$scope.displayState = ' hidden';
		$http.get('http://127.0.0.1/illela/web/metro').success(function(response){
			$scope.stations = response.opendata.answer.data.station;
		});
		$(document.getElementById('bike-station')).on('change', function(){
			$http.get('http://127.0.0.1/illela/web/metro/' + this.value).success(function(response){
				$scope.result = response.opendata.answer.data.station;
				$scope.result.status = parseInt($scope.result.state, 10) === 1 ? 'check' : 'close';
				$scope.displayState = '';
				// add metro station if available
				$http.get('http://127.0.0.1/illela/web/metro/proximity?lat=' + $scope.result.latitude + '&long=' + $scope.result.longitude).success(function(data) {
					$scope.metros = data.opendata.answer.data.station;
				});
			});
				
		});
	}
]);
