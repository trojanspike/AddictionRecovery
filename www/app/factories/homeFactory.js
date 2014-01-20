AA.factory('homeFactory', function(appData, logicHelper){
    var _home = function(){
        this.userGeo = {};
        this.markers = null;
        this.userNear = [];
    };
    _home.prototype.getNear = function(callback){
        if(this.userNear.length !== 6){
            $('#loader #modal-feedback').html('<p>Computing data.<br />Please wait</p>');
            $('#loader-modal').fadeIn(300);
            // let do some computing
            var DIST = {
                    apartData : {},
                    apartDataRef : [],
                    inOrder : []
                }, i = 0, to, dist, _whileX = 0,
                from = new google.maps.LatLng(parseFloat(this.userGeo.lat), parseFloat(this.userGeo.long));
            /************************************/
            for(i; i < this.markers.length; i++){
                (function(marker){
                    to = new google.maps.LatLng(marker.location.lat, marker.location.long);
                    dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
                    DIST.apartData[dist]=marker;
                    DIST.apartDataRef.push(dist);
                })(this.markers[i]);
            }

                DIST.inOrder = logicHelper.bubbleSort(DIST.apartDataRef);

            while(this.userNear.length !== 6){ // setting option maybe? Show number of locations closest
                this.userNear.push(DIST.apartData[DIST.inOrder[_whileX]]);
                _whileX ++;
            }
            window.AAdata.userData.near = this.userNear;
            window.localStorage.setItem('AA-app', JSON.stringify({userData:window.AAdata.userData}));
            callback(this.userNear);
            /***/
        } else {
            callback(this.userNear);
        }
    };


    return {
        nearestHomeGeo : function(homeGeo, markers, near, callback){
            var Home = new _home();
            Home.userGeo = homeGeo;
            Home.markers = markers;
            Home.userNear = near;
            Home.getNear(callback);
        }
        , setPrev : function(newPrev){
            var _save = function(){
                window.localStorage.setItem('AA-app', JSON.stringify({userData:window.AAdata.userData}));
            };
            if(window.AAdata.userData.prev.length === 6){
                // we have 6 already , lets remove the first one
                window.AAdata.userData.prev.shift();
                window.AAdata.userData.prev.push(newPrev);
                _save();
            } else {
                // ok , just add new
                window.AAdata.userData.prev.push(newPrev);
                _save();
            }
        }
    };
});
