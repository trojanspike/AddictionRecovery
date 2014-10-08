'use strict';
window.angular.module('app.data', ['app.constants'])
.service('appService', ['$http','$q', 'apiInfo',function($http, $q, apiInfo){
    var _Cache, _Crypt, _Meetings, _Settings, self = this;

    this.Settings = _Settings;
    this.Meetings = _Meetings;
    /* Construct ran in #/welcome */
    this.ready = function(callback){
        (function CheckerCache(){
            if( typeof _Cache === 'undefined' ) {
                setTimeout(CheckerCache, 500);
            } else {
                /* Lets set up settings  */
                self.Settings = _Cache.container('settings');
                /* Lets check for meetings */
                if( _Cache.list().indexOf('meetings') < 0 ){
                    self.Meetings = _Cache.container('meetings');
                    $http({
                        method : 'GET',
                        url : apiInfo.url
                    }).then(function(obj){
                        self.Meetings.put( JSON.stringify(obj.data) ).save(callback);
                    });
                } else {
                    self.Meetings = _Cache.container('meetings');
                    callback();
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
}]);