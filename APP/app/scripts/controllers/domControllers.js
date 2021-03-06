'use strict';

window.angular.module('app.domControllers', [])
.controller('menuCtrl', ['$scope', 'towns', function($scope, towns){
        window.modal.show();
        towns.then(function(data){
            $scope.towns = data.sort();
            window.modal.hide();
        });
        $scope.menuFilter = '';
        $scope.closeMenu = function(){
            $scope.menuFilter = '';
            cordova.plugins.SoftKeyboard.isShowing(function(){ 
                cordova.plugins.SoftKeyboard.hide(function(){}, function(){});
                menu.closeMenu();
            }, menu.closeMenu )
        };
}])
.controller('activeController', ['$route', '$scope', function($route, $scope){
    $scope.$route = $route;
}]);