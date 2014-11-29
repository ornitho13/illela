var veloController = angular.module('veloController', []);

veloController.controller('veloListDetail', ['$scope', '$http',
	function ($scope, $http) {
		$scope.displayState = 'hidden';
		$http.get('http://127.0.0.1/illela/web/velo').success(function(response){
			$scope.stations = response.opendata.answer.data.station;
		});
		$(document.getElementById('bike-station')).on('change', function(){
			$http.get('http://127.0.0.1/illela/web/velo/' + this.value).success(function(response){
				$scope.result = response.opendata.answer.data.station;
				$scope.result.status = parseInt($scope.result.state, 10) === 1 ? 'check' : 'close';
				$scope.displayState = '';
			});
		});
	}
]);
