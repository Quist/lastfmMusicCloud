(function(services){
	'use strict';

	var favArtistsUrl = services.baseUrl + "?method=library.getartists&api_key=" + 
		services.apiKey + "&user=quist17&format=json";
	
	var tagUrl = services.baseUrl + "?method=artist.gettoptags&artist=cher&api_key=" +
	 services.apiKey + "&format=json"

	services.factory('FavoriteArtists', ['$http', '$q',
	    function($http, $q){
	    	return function(username){

		        return getFavoriteArtists($http, username).then(function(res){
		        	if(!res.data.artists){
		        		return;
		        	}

		        	var promises = res.data.artists.artist.map(function(artist){
		        		var deferred = $q.defer();
		        		getTags($http, artist.name).success(function(res){
		        			deferred.resolve(res);
		        		});
		        		return deferred.promise;
		        	});
		        	return $q.all(promises);
	        	});
	    	}
	    }]);

	services.factory('Wordcloud', ['FavoriteArtists',
		function(FavoriteArtists){
			return function(username){
				return FavoriteArtists(username).then(function(res){
					if(!res){
						return [];
					}
					var list = [];
					for(var i = 0; i < res.length; i++){
						for(var j = 0; j < res[i].toptags.tag.length; j++){
							insert(list, res[i].toptags.tag[j]);
						}
					}
					return list;
				});
			}
		}]);


	function insert(list, tag){
		if(tag.count < 2){
			return;
		}
		for(var i = 0; i < list.length; i++){
			if(list[i][0] === tag.name){
				list[i][1] += parseInt(tag.count, 10);
				return;
			}
		}

		list.push([tag.name, parseInt(tag.count, 10)]);
	}

	function getFavoriteArtists($http, username){
		return $http({
	        	method: 'GET',
	        	url:services.baseUrl,
	        	params : {
	        		method : "library.getartists",
	        		api_key : services.apiKey,
	        		user : username,
	        		format: "json"
	        	}
	    });
	}

	function getTags ($http, artistName) {
		return $http({
	        	method: 'GET',
	        	url:services.baseUrl,
	        	params : {
	        		method : "artist.gettoptags",
	        		api_key : services.apiKey,
	        		artist : artistName,
	        		format: "json"
	        	}
	    });

	}

})(angular.module('appServices'));