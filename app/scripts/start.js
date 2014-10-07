'use strict';
window.AA = window.AA || {};
var ons = window.ons;
window.angular.module('aaFinder',['app.routes','onsen', 'SI.cordova']).run(['$location',
function($location){

ons.ready(function(){
	// model.show();
	/* Dev webview first - then mobile logic , saving data etc */
	$location.path('/place/code');
	// model.hide();
});

/*
document.addEventListener('deviceready' , function(){
	cordovaCache('uk.co.sites-ignite.aafinder-'+device.uuid, function(cache, crypt){
		window.AA.cache = cache;
		$location.path('/welcome');
		model.hide();
	});
}, false);
*/



}]);
