'use strict';
var PlacePassedData = null;
window.angular.module('app.controllers',['app.domControllers'])
.controller('homeCtrl', [function(){
	
	console.log('@home/');

}])
.controller('welcomeCtrl', ['appService', function(appService){
        /* Check if online -> network , else alert network
         connect needed -> exit on ok
         , else continue*/
        appService.ready(function(){
            window.modal.hide();
        });
}])
.controller('infoCtrl', [function(){

	console.log('@infoCtrl/');	

}])
.controller('settingsCtrl', [function(){

	console.log('@settingsCtrl/');	

}])
.controller('locationCtrl', ['places', '$scope',function(places, $scope){
        $scope.data = places;
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
        console.log( PlacePassedData );
    $scope.data = {
        days : days,
        place : PlacePassedData
    };
}]);
