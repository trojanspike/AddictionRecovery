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
        } , 700);
    } else {
        myScroll = new iScroll('wrapper', { checkDOMChanges: true });
    }
}
/* home  ############################ */
AA.controller('homeCtrl', function($scope, appData){

    $('#main-bottom-nav').removeClass('hide');
    Scroller();
});
/* welcome  ############################ */
AA.controller('welcomeCtrl', function($scope){

    $('#main-bottom-nav').removeClass('hide');
    Scroller();
});
/* info */
AA.controller('infoCtrl', function($scope){
    Scroller();
});
/* settings ############################  */
AA.controller('settingsCtrl', function($scope){
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
    $('#main-bottom-nav').removeClass('hide');
    Scroller();
});
/* place specific  ############################ */
AA.controller('placeCtrl', function($scope, $routeParams, appData){
    appData.get('place'+$routeParams.code).then(function(data){
       $scope.details = data;
    }).then(function(){
        appData.get().then(function(data){
            $.each(data.markers, function(key, val){
                if(val.code === $routeParams.code.substr(1)){
                    $scope.marker = data.markers[key];
                }
            });
        });
    });
    $('#main-bottom-nav').removeClass('hide');
    Scroller();
});
