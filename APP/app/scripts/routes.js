'use strict';
window.angular.module('app.routes', ['ngRoute', 'app.controllers']).config(['$routeProvider', function($routeProvider){

	$routeProvider
	.when('/', {

		controller : 'homeCtrl',
		templateUrl : 'templates/partials/home.html',
		resolve : {},
        activetab: '/'

	}).when('/welcome', {

		controller : 'welcomeCtrl',
		templateUrl : 'templates/partials/welcome.html',
        activetab: '/welcome'

	})
	.when('/info', {

		controller : 'infoCtrl',
		templateUrl : 'templates/partials/info.html',
		resolve : {},
        activetab: '/info'

	}).when('/settings', {

		controller : 'settingsCtrl',
		templateUrl : 'templates/partials/settings.html',
		resolve : {},
        activetab: '/settings'

	}).when('/location/:place', {

		controller : 'locationCtrl',
		templateUrl : 'templates/partials/locationPlace.html',
		resolve : {
            places : ['Lplaces','$route',function(Lplaces, $route){
                return {
                    placeName : $route.current.params.place,
                    places : Lplaces( $route.current.params.place )
                };
            }]
        }

	}).when('/place/:code', {

		controller : 'placeCtrl',
		templateUrl : 'templates/partials/place.html',
		resolve : {}

	}).otherwise({redirectTo : '/'});

}]);
