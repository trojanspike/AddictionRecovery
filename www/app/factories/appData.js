AA.factory('appData', function($q, $location, $http, $timeout){
	var _dataUrl = 'http://www.alcoholicsanonymous.ie/', _defer = $q.defer(),
	_data;
	/*
	@ construct - check data is in local
	 */
	(function(){
        $location.path('/welcome');
		// if no window.AA ->
		if(typeof window.AAdata === 'null' || typeof window.AAdata === 'undefined'){
			$('#loader #modal-feedback').html('<p>Gathering AA meeting data.<br />Please wait <span id="data-count">...</span></p>');
			$http({
				method:'GET',
				url:_dataUrl+'markers.do?county=any&day=any'
			}).then(function(data, status, headers, config){
				var $xml = $($.parseXML( data.data )), _data = [];
				$xml.find('marker').each(function(){
					_data.push({
						name:$(this).attr('name'),
						town:$(this).attr('town'),
						location:{lat:$(this).attr('lat') , long:$(this).attr('lng')},
						desc:$(this).attr('description'),
						code:$(this).attr('code')
					});
				});

			window.AAdata ={markers:_data, details:{}};
			// if getItem() -> null : do # else - attach to AAdata
				
				if(window.localStorage.getItem('AA-app') === null){
					PG.geo('current', function(pos){
						window.AAdata.userData={homeGeo:{lat:pos.coords.latitude , long:pos.coords.longitude}, prev:[], near:[]};
						window.localStorage.setItem('AA-app', JSON.stringify({userData:{homeGeo:{lat:pos.coords.latitude , long:pos.coords.longitude}, prev:[], near:[]}}));
						_defer.resolve(window.AAdata);
						$('#loader-modal').fadeOut(300);
					});
				} else {
					window.AAdata.userData=(function(){
						var _obj = $.parseJSON(window.localStorage.getItem('AA-app'));
						return _obj.userData;
					})();

					_defer.resolve(window.AAdata);
					$('#loader-modal').fadeOut(300);
                    $location.path('/');
				}
			});
		} else {
            window.AAdata.userData=$.parseJSON(window.localStorage.getItem('AA-app'));
            _defer.resolve(window.AAdata);
            $('#loader-modal').fadeOut(300);
		}
	})();

	return {
		/***********************/
		get:function(pram){
			var _seacrhQ = $q.defer(), _placeQ= $q.defer(), _seacrh = [], _location = [],
			place = {days:{mon:'',tue:'',wed:'',thu:'',fri:'',sat:'',sun:''}};
			/* default - empty : returns all data from localStorage */
			if(typeof pram !== 'string'){return _defer.promise;}
			/* place names for seacrh */
			if(pram === 'search'){
				return _defer.promise.then(function(data){
					$.each(data.markers, function(key, val){
						if($.inArray(val.town.toLowerCase(), _seacrh) < 0){_seacrh.push(val.town.toLowerCase());}
					});
				_seacrhQ.resolve(_seacrh);
				return _seacrhQ.promise;
				});
			}
			/* ## location:code ## */
			if(pram.match(/location:*/)){
				return _defer.promise.then(function(data){
					$.each(data.markers, function(key, val){
					if(val.town.toLowerCase() === pram.replace(/location:([a-z])/, '$1')){
						_location.push({code:val.code, name:val.name});
					}
				});
				_seacrhQ.resolve({count:_location.length, places:_location});
				return _seacrhQ.promise;
				});
			}

			/* #### place : code #### */
			if(pram.match(/place:*/)){
				/* Check is online before ajax call :  */
				/* check if the details are in local - else get it and update local */
			return _defer.promise.then(function(_data){
				if(typeof _data.details[pram.replace(/place:([a-zA-Z0-3])/, '$1')] === 'undefined'){
					$('#loader #modal-feedback').html('<p id="modal-notice">Retrieving data # '+pram.replace(/place:([a-zA-Z0-3])/, '$1')+'</p><p class="">Plesae wait</p>');
					$('#loader-modal').fadeIn(300);
					$http({
						method:'GET',
						url:_dataUrl+'detail.do?id='+pram.replace(/place:([a-zA-Z0-3])/, '$1')
					}).then(function(data, status, headers, config){
						var _details = $(data.data).find('#detailpanel .resultstable');
						_details.find('tr td').each(function(key, val){
							if($(val).text()){
								place.days[_details.find('tr th')[key].innerText.toLowerCase().substr(0,3)] = $(val).text();
							}
						});
						/* put onto window object */
						_data.details[pram.replace(/place:([a-zA-Z0-3])/, '$1')] = {days:place.days};

						$.each(_data.markers, function(key, val){
								if(val.code === pram.replace(/place:([a-zA-Z0-3])/, '$1')){
									/* prev image data : base64 - next stage */
									_data.details[pram.replace(/place:([a-zA-Z0-3])/, '$1')].map = 'http://maps.googleapis.com/maps/api/staticmap?center='+val.location.lat+','+val.location.long+'&zoom=17&size=600x300&markers=color:red%7C'+val.location.lat+','+val.location.long+'&maptype=hybrid&sensor=false';
									window.AAdata = _data;
									$('#loader-modal').fadeOut(300);
									_placeQ.resolve(_data.details[pram.replace(/place:([a-zA-Z0-3])/, '$1')]);
								}
							});
					});
					return _placeQ.promise;
				} else {
					/* these details are in window object - */
					_placeQ.resolve(_data.details[pram.replace(/place:([a-zA-Z0-3])/, '$1')]);
					return _placeQ.promise;
				}
				});	
			}
		}
	}

});
