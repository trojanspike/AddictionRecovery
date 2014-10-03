angular.module("app.routes", ['ngRoute', 'app.controllers']).config(["$routeProvider",function($routeProvider){ 

	$routeProvider
	.when('/', {

		controller : 'homeCtrl',
		templateUrl : 'templates/partials/home.html',
		resolve : {}

	}).when('/welcome', {

		controller : 'welcomeCtrl',
		templateUrl : 'templates/partials/welcome.html',
		resolve : {}

	})
	.when('/info', {

		controller : 'infoCtrl',
		templateUrl : 'templates/partials/info.html',
		resolve : {}

	}).when('/settings', {

		controller : 'settingsCtrl',
		templateUrl : 'templates/partials/settings.html',
		resolve : {}

	}).when('/location/:place', {

		controller : 'locationCtrl',
		templateUrl : 'templates/partials/locationPlace.html',
		resolve : {}

	}).when('/place/:code', {

		controller : 'placeCtrl',
		templateUrl : 'templates/partials/place.html',
		resolve : {}

	}).otherwise({redirectTo : '/'})

}]);
