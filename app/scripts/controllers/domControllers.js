'use strict';

window.angular.module('app.domControllers', [])
.controller('menuCtrl', ['$scope', 'towns', function($scope, towns){
        window.modal.show();
        towns.then(function(data){
            $scope.towns = data;
            window.modal.hide();
        });
}])
.controller('activeController', ['$route', '$scope', function($route, $scope){
    $scope.$route = $route;
}]);