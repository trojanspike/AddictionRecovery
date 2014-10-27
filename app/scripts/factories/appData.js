'use strict';
window.angular.module('app.data', ['app.constants'])
.service('appService', ['$http','$q', 'apiInfo', '$location',function($http, $q, apiInfo, $location){
    var _Cache, _Crypt, self = this, firstLoad = false;

    this.Settings = null;
    this.Meetings = null;
    this.Previous = null;

    /* Construct ran in #/welcome */
    this.ready = function(callback){
        (function CheckerCache(){
            if( typeof _Cache === 'undefined' ) {
                setTimeout(CheckerCache, 500);
            } else {
                /* Lets set up settings  */
                self.Settings = _Cache.container('settings');
                if(self.Settings.get() === ''){
                    self.Settings.put( JSON.stringify({}) ).save();
                }
                self.Previous = _Cache.container('previous');
                /* Lets check for meetings */
                if( _Cache.list().indexOf('meetings') < 0 ){
                    var ConnType = navigator.network.connection.type;
                    if(ConnType === "none" || ConnType === "unknown"){
                        return navigator.notification.alert('You don\'t seem to be connect to the internet', function(){
                            return navigator.app.exitApp();
                        },'No Network', 'OK');
                    }
                    self.Meetings = _Cache.container('meetings');
                    $http({
                        method : 'GET',
                        url : apiInfo.url
                    }).then(function(obj){
                        self.Meetings.put( JSON.stringify(obj.data) ).save(callback);
                    });
                } else {
                    self.Meetings = _Cache.container('meetings');
                    if(!firstLoad){
                        firstLoad = true;
                        $location.path('/home');
                        callback();
                    } else {
                        callback();
                    }
                }
            }
        })();
    };
    this.setCache = function(c){
        _Cache = c;
    };
    this.setCrypt = function(c){
        _Crypt = c;
    };
    this.rmAll = function(cb){
        _Cache.rmAll(cb);
    };
}])
.factory('towns', ['appService', '$q', function(appService, $q){
    /* return available towns */
        var defer = $q.defer();
        appService.ready(function(){
            var towns = [], Data = JSON.parse( appService.Meetings.get() );
            for( var t in Data ){
                if( towns.indexOf(Data[t].town) < 0 ){
                    towns.push( Data[t].town );
                }
            }
            defer.resolve( towns );
        });
        return defer.promise;
}])
.factory('Lplaces', ['appService', function(appService){
    return function(townName){
        var PlacesAvail = [], Data = JSON.parse( appService.Meetings.get() );
        for( var t in Data ){
            if( Data[t].town.toLowerCase() === townName ){
                PlacesAvail.push( Data[t] );
            }
        }
        return PlacesAvail;
    };
}])
.factory('previous', ['appService', function(appService){
        var Prev;
        if(appService.Previous.get() === ''){
            Prev = [];
        } else {
            Prev = JSON.parse( appService.Previous.get() );
        }
        return {
            get : function(){
                return Prev;
            },
            put : function(town){
                if( Prev.indexOf(town) < 0 ){
                    if( Prev.length === 5){ /* TODO make user setting */
                        Prev.splice(0,1);
                    }
                    Prev.push(town);
                    appService.Previous.put( JSON.stringify( Prev )).save();
                }
            }
        };
}])
.factory('settings', ['appService', 'apiInfo', '$http', function(appService, apiInfo,$http){
    return {
        update : function(){
            var ConnType = navigator.network.connection.type;
            if(ConnType === "none" || ConnType === "unknown"){
                return navigator.notification.alert('You don\'t seem to be connect to the internet', function(){
                    return window.modal.hide();
                },'No Network', 'OK');
            }
            $http({
                method : 'GET',
                url : apiInfo.url
            }).then(function(obj){
                appService.Meetings.put( JSON.stringify(obj.data) ).save(function(){
                    window.modal.hide();
                });
            });
        },
        clearAll : function(callback){
            appService.rmAll(callback);
        }
    };
}]);
