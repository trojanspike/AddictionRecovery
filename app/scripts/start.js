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
            var Continue = function(){
                appService.setCache(cache);
                appService.setCrypt(crypt);
            };
            Continue();

            //var _EncryptionKey = window.localStorage.getItem('encryptionKey');
            //if( _EncryptionKey === null && crypt.isset() === false ){
            //    /* no password found in storage , and isn't set, one is required */
            //    navigator.notification.prompt('An encryption password is required', function(input){
            //        /* input.buttonIndex == 2 : OK */
            //        /* input.input1 == input-data */
            //    }, 'Security', ['Cancel', 'OK']);
            //}
            //if( _EncryptionKey === null && crypt.isset() === true ){
            //    /* no password found in storage , but isset */
            //    navigator.notification.prompt('Please ent your encryption password', function(input){
            //        /* input.buttonIndex == 2 : OK */
            //        /* input.input1 == input-data */
            //    }, 'Security', ['Cancel', 'OK']);
            //} else {
            //    /* Auto enter encryption pwd */
            //    // crypt.init(_EncryptionKey, success, fail);
            //}

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
