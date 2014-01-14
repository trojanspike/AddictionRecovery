AA.factory('homeFactory', function($q, $location, $http, $timeout, appData){
    // use addpData userData.homeGeo for centre point to get surrounding nearest
    appData.get().then(function(data){
            var _placeSortObj = {}, i = 0, _nearest = [];
            if(data.userData.near.length !== 6){
                /***********/

                /**********/
            } else {
                $scope.nearest = data.userData.near;
            }
        });
});
