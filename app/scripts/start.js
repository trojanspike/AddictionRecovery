'use strict';
var ons = window.ons;
var isDevice = true;
window.angular.module('aaFinder',['app.routes','onsen', 'SI.cordova', 'app.data', 'app.constants'])
.run(['$location','cordovaCache','appService', 'settings', 'appinfo', 'apiInfo', 'socket',
function($location, cordovaCache, appService, settings, appinfo, apiInfo, socket){

    $location.path('/welcome');
ons.ready(function(){
    window.modal.show();
    if( isDevice === false ){
        window.modal.hide();
    }
});

if(isDevice){
    document.addEventListener('deviceready' , function(){

        document.addEventListener("backbutton", function(e){
            navigator.app.backHistory();
        }, false);

        cordovaCache( apiInfo.cachePath+window.device.uuid , function(cache, crypt){
            var Continue = function(){
                appService.setCache(cache);
                appService.setCrypt(crypt);
            };
            Continue();
        });
    }, false);
}

}])
.directive('appExit' , [function(){
    return {
        restrict : 'E',
        template : '<a> Exit </a>',
        replace : true,
        link : function(scope, ele, attr){
            ele.on('click' , function(){
                navigator.notification.confirm('Are you sure you want to exit?', function(input){
                    if( input === 2 ){
                        navigator.app.exitApp();
                    }
                }, 'Exit', ['Cancel', 'OK']);
            });
        }
    };
}]);
