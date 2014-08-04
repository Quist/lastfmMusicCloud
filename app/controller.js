(function(app){
	'use strict';
	app.controller('ApplicationCtrl', ['$scope', 'FavoriteArtists','$timeout',
    function($scope, FavoriteArtists, timeout) {
    	$scope.username = "";
    	$scope.generateCloud = function(username){
    		FavoriteArtists(username).success(function(res){
    			console.log(res);
    		});
    	}
    }]);

})(angular.module('app'));