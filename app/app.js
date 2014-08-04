(function(angular){
	'use strict';
	var services = angular.module('appServices', []);
	services.baseUrl = "http://ws.audioscrobbler.com/2.0/";
	services.apiKey = "a444b13809a6337aa242912d4a5b9286";
	services.apiSecret = "9da339504ed7390c1d31f1266aa85c9f";

	var app = angular.module('app', [
		'appServices',
		'angularSpinner'
	]);

})(angular);