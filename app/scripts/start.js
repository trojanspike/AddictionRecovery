angular.module('aaFinder',['app.routes','onsen']).run(["$location",function($location){
	$location.path('/welcome');
}]);
