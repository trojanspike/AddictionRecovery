'use strict';
window.angular.module('app.data', ['app.constants'])
    .service('appService', ['$http','$q', 'apiInfo',function($http, $q, apiInfo){
        var _Cache, _Crypt, _Data;
        /* Construct ran in #/welcome */
        this.ready = function(callback){
            (function CheckerCache(){
                if( typeof _Cache === 'undefined' ) {
                    setTimeout(CheckerCache, 500);
                } else {
                    /* Lets check for data */
                    if( _Cache.list().indexOf('data') < 0 ){
                        _Data = _Cache.container('data');
                        $http({
                            method : 'GET',
                            url : apiInfo.url
                        }).then(function(obj){
                            _Data.put( JSON.stringify(obj.data) ).save();
                            callback();
                        });
                    } else {
                        _Data = _Cache.container('data');
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
    }]);