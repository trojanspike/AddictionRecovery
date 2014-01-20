function Scroller(){
    if($('#search-tab').hasClass('active')){
        $('#search-tab').toggleClass('active');
        $('#main-content').toggleClass('search-active');
    }
    var myScroll;
    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    if(typeof myScroll !== 'undefined'){
        myScroll.destroy();
        setTimeout(function(){
            myScroll = new iScroll('wrapper',{
                checkDOMChanges: true,
                hScrollbar : false,
                zoom : true
            });
        } , 0);
    } else {
        myScroll = new iScroll('wrapper', { checkDOMChanges: true });
    }
}
/* home  ############################ */
AA.controller('homeCtrl', function($scope,appData, homeFactory){
    appData.get().then(function(data){

        homeFactory.nearestHomeGeo(data.userData.homeGeo, data.markers, data.userData.near, function(nearest){
            $scope.nearest = nearest;
            $('#loader-modal').fadeOut(300);
            Scroller();
        });
        $scope.prevous = data.userData.prev;
    });
});
/* welcome  ############################ */
AA.controller('welcomeCtrl', function($scope){
    Scroller();
});
/* info */
AA.controller('infoCtrl', function($scope){
    $scope.version = '1.6.0';
    $scope.build = '22/01/2014';
    $scope.developer = 'Lee Mc Kay';
    $scope.website = 'www.sites-ignite.co.uk';
    Scroller();
});
/* settings ############################  */
AA.controller('settingsCtrl', function($scope){
    $scope.go = function(){}
    Scroller();
});
/* location  ############################ */
AA.controller('locationCtrl', function($scope, $routeParams, appData){
    $('#search-tab').toggleClass('in-active');
    $scope.loc = $routeParams.place;
    appData.get('location:'+$routeParams.place).then(function(data){
        $scope.count = data.count;
        $scope.locationPlaces = data.places;
    });
    Scroller();
});
/* place specific  ############################ */
AA.controller('placeCtrl', function($scope, $routeParams, appData, homeFactory){
    appData.get('place'+$routeParams.code).then(function(data){
       $scope.details = data;
    }).then(function(){
        appData.get().then(function(data){
            $.each(data.markers, function(key, val){
                if(val.code === $routeParams.code.substr(1)){
                    $scope.marker = data.markers[key];
                    homeFactory.setPrev(data.markers[key]);
                }
            });
        });
    });
    Scroller();
});
