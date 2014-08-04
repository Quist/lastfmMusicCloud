(function(app){
	app.directive('wordcloud', function(){
		return {
			restrict : 'E',
			template : '<canvas id="myCanvas" width="1000" height="500"></canvas>',
			scope: {
        		list: '=list'
      		},
			link : function(scope, elem, attrs){
				WordCloud(elem[0].firstChild, {list: scope.list});
			}
		}
	});

})(angular.module('app'));