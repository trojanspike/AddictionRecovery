/***
Small phonegap lib - methods
***/
var PG = {
    init:function(callback){
        document.addEventListener('deviceready', callback, false);
    },
    evt:function(evt, callback){
        document.addEventListener(evt, callback, false);
    },
    notify:navigator.notification,
    geo:function(type, cb){
         switch(type){
                case 'current':
                    navigator.geolocation.getCurrentPosition(cb, function(){
                        navigator.notification.alert('Error retrieving location!');
                        return;
                    });
                break;
                case 'watch':
                    return navigator.geolocation.watchPosition(cb, function(){
                        alert('Error retrieving location!');
                    });
                break;
                case 'clear':
                    if (typeof cb !== 'string'){window.alert('ERROR - geo[clear] cb to be string'); return;}
                    navigator.geolocation.clearWatch(cb);
                break;
            }
    },

}

/**************/
/*
Start angular routes
 */
var AA = angular.module('AAapp', []);

AA.directive('searchWidget', function(appData){
  
    return {
        restrict : 'A',
        replace:false,
        templateUrl:'app/directives/search.html',
        controller: ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
            appData.get('search').then(function(data){
                $scope.places = data;
                $('#search-load').remove();

                setTimeout( function(){new iScroll('search-scroller');} ,0);
            });
            $scope.locationClick = function(){
                $('#search-tab').toggleClass('active');
                $('#main-content').toggleClass('search-active');
            };
        }]
    }
});



AA.config(function($routeProvider){
    $routeProvider
        .when('/',
        {
            controller:'homeCtrl',
            templateUrl:'app/partials/home.html'
        })
        .when('/welcome',
        {
            animation: 'page-slide',
            controller:'welcomeCtrl',
            templateUrl:'app/partials/welcome.html'
        })
        .when('/info',
        {
            controller:'infoCtrl',
            templateUrl:'app/partials/info.html'
        })
        .when('/settings',
        {
            controller:'settingsCtrl',
            templateUrl:'app/partials/settings.html'
        })
        .when('/location/:place',
        {
            controller:'locationCtrl',
            templateUrl:'app/partials/locationPlace.html'
        })
        .when('/place/:code',
        {
            controller:'placeCtrl',
            templateUrl:'app/partials/place.html'
        })
        .otherwise({redirectTo:'/'});
});

/*
Start phoneGap api 
 */
PG.init(function(){
    PG.evt('menubutton', function(){
        $('#bottom-nav').toggleClass('in-active', 'active');
    });
    PG.evt('searchbutton', function(){
        $('#search-tab').toggleClass('in-active', 'active');
    });

    $('a[href="#/exit"]').click( function(event){
        /* navigator.notification.confirm('Are you sure you want to exit?',
        function(){
            // confirmed : yes
            // navigator.app.exitApp();
        }, "Exit"); */
        PG.notify.vibrate(1200);
        navigator.app.exitApp();
        event.isPropagationStopped();
        return false;
    });

});
