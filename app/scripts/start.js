/**
document.addEventListener('deviceready' , function(){

	window.AA = window.AA || {};
	jQuery.cordovaCache('uk.co.sig.aafinder-'+window.device.uuid, function(cache, crypt){

		window.AA[window.device.uuid] = {
			cache : cache,
			crypt : crypt
		};

		var con = cache.container('data').put(JSON.stringify({app:'AAfinder', date:new Date()}));
		con.save();
		
	});

}, false);
**/
window.AA = window.AA || {};

angular.module('aaFinder',['app.routes','onsen', 'SI.cordova']).run(["$location", "cordovaCache","$rootScope",
function($location, cordovaCache, $rootScope){

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
