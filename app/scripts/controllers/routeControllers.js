'use strict';
var PlacePassedData = null;
window.angular.module('app.controllers',['app.domControllers'])
.controller('homeCtrl', ['previous','$scope',function(previous, $scope){

        $scope.prevs = previous.get();

}])
.controller('welcomeCtrl', ['appService', function(appService){
        /* Check if online -> network , else alert network
         connect needed -> exit on ok
         , else continue*/
        appService.ready(function(){
            window.modal.hide();
        });
}])
.controller('infoCtrl', ['appinfo','devinfo','$scope',function(appinfo, devinfo, $scope){
    $scope.data = {
        devName : devinfo.name,
        devEmail : devinfo.email,
        devSite : devinfo.url,
        appVersion : appinfo.version,
        appBuild : appinfo.buildDate
    };
}])
.controller('settingsCtrl', ['settings','$scope',function(settings, $scope){
        $scope.upDate = function(){
            navigator.notification.confirm('Are you sure you want to update?', function(input){
                if( input === 2 ){
                    /* Check network -> if network , then modal & run update */
                    var ConnType = navigator.network.connection.type;
                    if(ConnType !== "none" && ConnType !== "unknown"){
                        /* Do Update */
                        window.modal.show();
                        settings.update();
                    } else {
                        navigator.notification.alert('You don\'t seem to be connect to the internet', function(){},'No Network', 'OK');
                    }
                }
            }, 'Update', ['Cancel', 'OK']);
        };
        $scope.clear = function(){
            navigator.notification.confirm('Are you sure you want to clear everything?', function(input){
                if( input === 2 ){
                    /* show modal and clear all , then exi app */
                    window.modal.show();
                    settings.clearAll(function(){
                        navigator.app.exitApp();
                    });
                }
            }, 'Update', ['Cancel', 'OK']);
        };
        $scope.autoEnable = function(){
            navigator.notification.alert('Sorry , this feature isn\'t available yet', function(){},'Unavailable', 'OK');
        };
        $scope.changePwd = function(){
            navigator.notification.alert('Sorry , this feature isn\'t available yet', function(){},'Unavailable', 'OK');
        };
}])
.controller('locationCtrl', ['places','previous', '$scope',function(places, previous, $scope){
        $scope.data = places;
        previous.put( places.placeName );
        $scope.dataToPlace = function(data){
            PlacePassedData = data;
        };
}])
.controller('placeCtrl', ['$scope',function($scope){
        var _html = $(PlacePassedData.details),
        _details = _html.find('#detailpanel .resultstable'),
        days = {mon:'',tue:'',wed:'',thu:'',fri:'',sat:'',sun:''};

        _details.find('tr td').each(function(key, val){
            if($(val).text()){
                days[_details.find('tr th')[key].innerText.toLowerCase().substr(0,3)] = $(val).text();
            }
        });
    $scope.data = {
        days : days,
        place : PlacePassedData
    };
}]);
