(function(app){
	'use strict';
	app.controller('ApplicationCtrl', ['$scope', 'Wordcloud','usSpinnerService',
    function($scope, Wordcloud, usSpinnerService) {
    	$scope.username = "";
    	$scope.generateCloud = function(username){
    		delete $scope.test;
    		delete $scope.error;
    		usSpinnerService.spin('spinner-1');
    		Wordcloud(username).then(function(res){
    			if(res.length === 0){
    				$scope.error = {};
    				$scope.error.message = "User not found";
    			}
    			$scope.test = res;
    			usSpinnerService.stop('spinner-1');
    		});
    	}
    }]);

})(angular.module('app'));