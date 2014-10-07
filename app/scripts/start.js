'use strict';
var ons = window.ons;
var isDevice = true;
window.angular.module('aaFinder',['app.routes','onsen', 'SI.cordova', 'app.data']).run(['$location','cordovaCache','appService',
function($location, cordovaCache, appService){
    $location.path('/welcome');
ons.ready(function(){
    window.modal.show();
    if( isDevice === false ){
        window.modal.hide();
    }
});

if(isDevice){
    document.addEventListener('deviceready' , function(){
        cordovaCache('uk.co.sites-ignite.aafinder-'+window.device.uuid, function(cache, crypt){
            appService.setCache(cache);
            appService.setCrypt(crypt);
        });
    }, false);
}

}]);
